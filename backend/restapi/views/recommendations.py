from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from restapi.services import GptRecommendationService, MockRecommendationService, PersonalizationService  # noqa:E501
from ..serializers import CombinedInputSerializer
import os
from ..data_models import Movie


class RecommendationsAPIView(APIView):
    permission_classes = [AllowAny]

    def __init__(self):
        movie_recommendation_limit = 10

        if os.getenv("OPENAI_API_KEY") is not None:
            self.recommendation_service = GptRecommendationService(movie_recommendation_limit)
        else:
            self.recommendation_service = MockRecommendationService(movie_recommendation_limit)

    def post(self, request):

        self.personalization_service = PersonalizationService(user_id=request.user.id)

        # Use the combined serializer to validate the results
        serializer = CombinedInputSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            if 'personalize' in validated_data and validated_data["personalize"]:
                favorite_genres = self.personalization_service.get_favorite_genres()
            else:
                favorite_genres = []
            if 'phrases' in validated_data and 'tags' in validated_data:
                prompt = self.get_questionnaire_prompt(
                    validated_data["phrases"],
                    validated_data["tags"]
                )
            elif 'user_input' in validated_data:
                prompt = self.get_user_input_prompt(
                    validated_data["user_input"],
                    favorite_genres
                )
            else:
                return Response(
                    {"error": "Invalid input."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        film_recommendations = self.recommendation_service.get_recommendations(prompt)

        for film in film_recommendations:
            # If movie isn't already in the database, add it
            if not Movie.objects.filter(title=film["title"]).first():
                self.create_movie(film)

        film_recommendations = self.personalization_service.personalize_recommendations(
            film_recommendations
        )

        return Response({"recommendations": film_recommendations}, status=status.HTTP_200_OK)

    def get_questionnaire_prompt(self, phrases, tags):

        prompt = self.recommendation_service.form_questionnaire_prompt(phrases, tags)

        return prompt

    def get_user_input_prompt(self, user_input, favorite_genres):

        prompt = self.recommendation_service.form_user_input_prompt(user_input, favorite_genres)

        return prompt

    def create_movie(self, film):
        movie = Movie(
            title=film["title"],
            genres=film["genres"],
            year=film["year"],
            rating=film["rating"],
            duration=film["duration"],
            shortDescription=film["shortDescription"],
        )
        movie.save()

        return movie

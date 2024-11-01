from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from ..services import recommendation as RecommendationService
from ..models import Questionnaire
from django.http import JsonResponse


class QuestionnaireAPIView(APIView):
    permission_classes = [AllowAny]

    def __init__(self):
        self.questionnaire = Questionnaire()
        self.service = RecommendationService(self.questionnaire.questions)

    def get(self, request):
        return JsonResponse({"questions": self.questionnaire.questions}, status=status.HTTP_200_OK)

    def post(self, request):
        # Extract results from the request data
        results = request.data.get('results', [])

        # Validate the results
        if not isinstance(results, list): # check if results is a list
            for phrase in results.phrases:
                if not isinstance(phrase, str):  # check if all phrases are strings
                    return Response(
                        {"error": "Invalid phrase format"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                if not all(isinstance(tag, str) for tag in results.tags):  # check if all tags are strings
                    return Response(
                        {"error": "Invalid tag format"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

        film_recommendations = RecommendationService.get_recommendations(results.phrases, results.tags)  # noqa: E501

        print(film_recommendations)

        # Format the response
        response_data = {
            "results": results,
            "recommendations": film_recommendations
        }

        return Response(response_data, status=status.HTTP_200_OK)

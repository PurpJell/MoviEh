from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from restapi.services import GptRecommendationService, MockRecommendationService
from serializers import QuestionnaireResultSerializer
import os



class RecommendationsAPIView(APIView):
    permissionClasses = [AllowAny]

    def __init__(self):
        if os.getenv("ENV") == "prod":
            self.service = GptRecommendationService()
        else:
            self.service = MockRecommendationService()

    def post(self, request):
        # Extract results from the request data
        results = request.data.get('results', [])

        # Use the serializer to validate the results
        serializer = QuestionnaireResultSerializer(data=results)
        if not serializer.is_valid():
            return Response(
                {"error": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        phrases = serializer.validated_data['phrases']
        tags = serializer.validated_data['tags']

        film_recommendations = self.service.get_recommendations(phrases, tags)  # noqa: E501

        # Format the response
        response_data = {
            "recommendations": film_recommendations,
        }

        return Response(response_data, status=status.HTTP_200_OK)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from ..services import recommendation as GPTRecommendationService
from ..services import mock_recommendation as MockGPTRecommendationService
from ..serializers import QuestionnaireResultsSerializer
import os


class RecommendationsAPIView(APIView):
    permissionClasses = [AllowAny]

    def __init__(self):
        if os.getenv("ENV") == "dev":
            self.service = MockGPTRecommendationService()
        else:
            self.service = GPTRecommendationService()

    def post(self, request):
        # Extract results from the request data
        results = request.data.get('results', [])

        # Use the serializer to validate the results
        serializer = QuestionnaireResultsSerializer(data=results)
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

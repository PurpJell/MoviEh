from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from ..models import Questionnaire
from ..serializers import ResultsSerializer
from django.http import JsonResponse


class QuestionnaireAPIView(APIView):
    permission_classes = [AllowAny]

    def __init__(self):
        self.questionnaire = Questionnaire()

    def get(self, request):
        return JsonResponse(
            {"questions": self.questionnaire.questions},
            status=status.HTTP_200_OK
        )

    def post(self, request):
        # Extract results from the request data
        results = request.data.get('results', [])

        # Use the serializer to validate the results
        serializer = ResultsSerializer(data=results)
        if not serializer.is_valid():
            return Response(
                {"error": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        tags = serializer.validated_data['tags']

        # Format the response
        response_data = {
            "tags": tags,
        }

        return Response(response_data, status=status.HTTP_200_OK)

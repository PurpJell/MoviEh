from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from ..data_models import Questionnaire
from django.http import JsonResponse


class QuestionnaireAPIView(APIView):
    permission_classes = [AllowAny]

    def __init__(self):
        self.questionnaire = Questionnaire()

    def get(self, request):
        return JsonResponse(
            {"questions": self.questionnaire.to_dict()['questions']},
            status=status.HTTP_200_OK
        )

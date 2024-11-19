from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from ..data_models import Questionnaire, TagList
from django.http import JsonResponse


class QuestionnaireAPIView(APIView):
    permission_classes = [AllowAny]

    def __init__(self):
        self.questionnaire = Questionnaire()
        self.taglist = TagList()

    def get(self, request):
        return JsonResponse(
            {"questions": self.questionnaire.to_dict()['questions'], "tags": self.taglist.tags},
            status=status.HTTP_200_OK
        )

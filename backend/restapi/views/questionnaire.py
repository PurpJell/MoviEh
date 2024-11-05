from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
import json
from django.conf import settings
from django.http import JsonResponse


class QuestionnaireAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        path = settings.BASE_DIR / 'restapi' / 'data' / 'questions.json'
        with open(path, 'r') as file:
            questions = json.load(file)
        return JsonResponse(questions)

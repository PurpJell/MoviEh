from django.urls import path
from restapi.views import questionnaire


urlpatterns = [
    path(
        'questionnaire/',
        questionnaire.QuestionnaireAPIView.as_view(),
        name='questionnaire'
    ),
 ]

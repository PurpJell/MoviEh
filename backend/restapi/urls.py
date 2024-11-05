from django.urls import path
from restapi.views import questionnaire
from restapi.views import recommendations


urlpatterns = [
    path(
        'questionnaire/',
        questionnaire.QuestionnaireAPIView.as_view(),
        name='questionnaire'
    ),
    path(
        'recommendations/',
        recommendations.RecommendationsAPIView.as_view(),
        name='recommendations'
    ),
]

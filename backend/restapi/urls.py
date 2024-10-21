from django.urls import path
from restapi import views as api_views


urlpatterns = [
    path('questionnaire/', api_views.QuestionnaireAPIView.as_view(), name='questionnaire'),
 ]
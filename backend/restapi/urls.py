from django.urls import path
from restapi.views import questionnaire
from restapi.views import recommendations
from restapi.views import login
from restapi.views import register
from restapi.views import profile
from restapi.views import logout
from restapi.views import feedback
from restapi.views import liked_movies


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
    path(
        'register/',
        register.RegisterAPIView.as_view(),
        name='register'
    ),
    path(
        'login/',
        login.LoginAPIView.as_view(),
        name='login'
    ),
    path(
        'profile/',
        profile.ProfileAPIView.as_view(),
        name='profile'
    ),
    path(
        'logout/',
        logout.LogoutAPIView.as_view(),
        name='logout'
    ),
    path(
        'feedback/',
        feedback.FeedbackAPIView.as_view(),
        name='feedback'
    ),
    path(
        'liked_movies/',
        liked_movies.LikedMoviesAPIView.as_view(),
        name='liked_movies'
    )
]

from rest_framework import status
from django.http import JsonResponse
from ..data_models import Movie


class FeedbackService:

    def process_feedback(data, user):

        user_profile = user.userprofile

        if user_profile is None:
            return JsonResponse(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        movie_title = data['movie_title']
        feedback_polarity = data['feedback_polarity']

        movie = Movie.objects.filter(title=movie_title).first()

        if movie is None:
            return JsonResponse(
                {"error": "Movie not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if feedback_polarity is True:
            preference_change = 10
        else:
            preference_change = -10

        for genre in movie.genres:
            if genre not in user_profile.preferences:
                user_profile.preferences[genre] = preference_change
            else:
                user_profile.preferences[genre] += preference_change

        user_preferences = user_profile.preferences
        user_preference_sum = sum(abs(value) for value in user_preferences.values())

        if user_preference_sum > 400:
            for genre in user_preferences:
                user_preferences[genre] = user_preferences[genre]/user_preference_sum*400

        user_profile.save()
        if feedback_polarity == 1:
            if movie in user_profile.liked_movies.all():
                return JsonResponse(
                    {"message": "Preferences updated, movie already in liked movies."},
                    status=status.HTTP_200_OK
                )

            user_profile.liked_movies.add(movie)
            user_profile.save()

        return JsonResponse(
            {"message": "Feedback processed successfully."},
            status=status.HTTP_200_OK
        )

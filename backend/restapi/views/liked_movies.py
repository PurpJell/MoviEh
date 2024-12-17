from rest_framework.views import APIView
from rest_framework import status
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from ..serializers import MovieSerializer, UnlikeMovieSerializer
from ..data_models import Movie


class LikedMoviesAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user_profile = request.user.userprofile
        liked_movies = user_profile.liked_movies.all()

        movie_list = MovieSerializer(liked_movies, many=True).data

        for movie in movie_list:
            movie.pop('id')

        return JsonResponse(
            {"liked_movies": movie_list},
            status=status.HTTP_200_OK
        )

    def post(self, request):

        unlike_movie_serializer = UnlikeMovieSerializer(data=request.data)

        if not unlike_movie_serializer.is_valid():
            return JsonResponse(
                unlike_movie_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        user_profile = request.user.userprofile

        movie_title = unlike_movie_serializer.validated_data['movie_title']
        movie = Movie.objects.filter(title=movie_title).first()

        if movie is None:
            return JsonResponse(
                {"error": "Movie not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if movie not in user_profile.liked_movies.all():
            return JsonResponse(
                {"error": "The movie is not in the liked movies list."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user_profile.liked_movies.remove(movie)
        user_profile.save()

        return JsonResponse(
            {"message": "Movie removed from liked movies."},
            status=status.HTTP_200_OK
        )

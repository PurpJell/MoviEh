from restapi.data_models import UserProfile, PersonalizedMovie
from django.contrib.auth.models import User


class PersonalizationService():

    def __init__(self, user_id):
        self.user_id = user_id

        try:
            user=User.objects.get(id=self.user_id)
            # Fetch the user's profile
            self.user_profile = UserProfile.objects.get(
                user=user
                )
        except (UserProfile.DoesNotExist, User.DoesNotExist):
            self.user_profile = None
            
        if self.user_profile is None:
            self.normalized_preferences = {}
            return

        self.preferences = self.user_profile.preferences
        # print(self.preferences)
        self.normalized_preferences = {}

        preference_value_total = sum(abs(value) for value in self.preferences.values())

        for genre in self.preferences:
            self.normalized_preferences[genre] = self.preferences.get(genre, 0)/preference_value_total*100  # noqa: E501

    def get_favorite_genres(self):
        # Get the user's favorite genres
        if self.user_profile is not None:
            # Filter positive preferences
            positive_preferences = {genre: score for genre, score in self.user_profile.preferences.items() if score > 0}

            # Sort preferences by score in descending order
            sorted_preferences = sorted(positive_preferences.items(), key=lambda item: item[1], reverse=True)

            # Get the top 5 favorite genres
            favorite_genres = [genre for genre, score in sorted_preferences[:5]]
        else:
            favorite_genres = []

        return favorite_genres

    def personalize_recommendations(self, recommendations):

        # Personalize the recommendations based on the user's preferences
        personalized_recommendations = []


        for movie in recommendations:
            # Ensure that shortDescription is a string
            if isinstance(movie.get('shortDescription'), tuple):
                movie['shortDescription'] = movie['shortDescription'][0]

            personalized_movie = PersonalizedMovie(**movie)
            for genre in personalized_movie.genres:
                if genre in self.normalized_preferences:
                    personalized_movie.personalization_score += self.normalized_preferences[genre]
            personalized_recommendations.append(personalized_movie.dict())

        return personalized_recommendations

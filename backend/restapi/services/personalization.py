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

    def personalize_recommendations(self, recommendations):

        # Personalize the recommendations based on the user's preferences
        personalized_recommendations = []

        for movie in recommendations:
            personalized_movie = PersonalizedMovie(**movie)
            for genre in personalized_movie.genres:
                if genre in self.normalized_preferences:
                    personalized_movie.personalization_score += self.normalized_preferences[genre]
            personalized_recommendations.append(personalized_movie.dict())

        return personalized_recommendations

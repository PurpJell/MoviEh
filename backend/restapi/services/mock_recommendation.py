import time


class MockRecommendationService:
    def __init__(self, limit=10):
        self.limit = limit  # number of movies to return

        self.film_recommendations = [
            {
                "title": "The Godfather",
                "genres": ["Crime", "Drama"],
                "year": 1972,
                "rating": 9.2,
                "duration": 175,
                "shortDescription": (
                    "The aging patriarch of an organized crime dynasty transfers "
                    "control of his clandestine empire to his reluctant son."
                ),
            },
            {
                "title": "The Shawshank Redemption",
                "genres": ["Drama"],
                "year": 1994,
                "rating": 9.3,
                "duration": 142,
                "shortDescription": (
                    "Two imprisoned men bond over a number of years, "
                    "finding solace and eventual redemption through acts of common decency."
                ),
            },
            {
                "title": "Inception",
                "genres": ["Action", "Adventure", "Sci-Fi"],
                "year": 2010,
                "rating": 8.8,
                "duration": 148,
                "shortDescription": (
                    "A thief who steals corporate secrets through the use of dream-sharing "
                    "technology is given the inverse task of planting an idea into the mind "
                    "of a CEO."
                ),
            },
            {
                "title": "The Dark Knight",
                "genres": ["Action", "Crime", "Drama"],
                "year": 2008,
                "rating": 9.0,
                "duration": 152,
                "shortDescription": (
                  "When the menace known as the Joker emerges from his mysterious past, "
                  "he wreaks havoc and chaos on the people of Gotham. The Dark Knight "
                  "must accept one of the greatest psychological and physical tests of "
                  "his ability to fight injustice."
                ),
            },
            {
                "title": "Pulp Fiction",
                "genres": ["Crime", "Drama"],
                "year": 1994,
                "rating": 8.9,
                "duration": 154,
                "shortDescription": (
                    "The lives of two mob hitmen, a boxer, a gangster and his wife, and a "
                    "pair of diner bandits intertwine in four tales of violence and redemption.",
                ),
            },
            {
                "title": "Forrest Gump",
                "genres": ["Drama", "Romance"],
                "year": 1994,
                "rating": 8.8,
                "duration": 142,
                "shortDescription": (
                    "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate "
                    "scandal and other historical events unfold from the perspective of an "
                    "Alabama man with an IQ of 75, whose only desire is to be reunited with "
                    "his childhood sweetheart."
                )
            }
        ]

    def form_questionnaire_prompt(self, phrases, tags):
        prompt = "Fake prompt"

        time.sleep(7)  # simulate long processing time

        return prompt

    def form_user_input_prompt(self, user_input, favorite_genres):
        prompt = "Fake prompt"

        time.sleep(7)  # simulate long processing time

        return prompt

    def get_recommendations(self, prompt):
        return self.film_recommendations[:self.limit]

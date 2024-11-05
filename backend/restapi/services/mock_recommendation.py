class GptRecommendationService:

    def __init__(self):

        self.limit = 10  # number of movies to return

        self.film_recommendations = [
            {
                "title": "The Godfather",
                "genres": ["Crime", "Drama"],
                "year": 1972,
                "rating": 9.2,
                "duration": 175,
                "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",  # noqa: E501
            },
            {
                "title": "The Shawshank Redemption",
                "genres": ["Drama"],
                "year": 1994,
                "rating": 9.3,
                "duration": 142,
                "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",  # noqa: E501
            },
            {
                "title": "Inception",
                "genres": ["Action", "Adventure", "Sci-Fi"],
                "year": 2010,
                "rating": 8.8,
                "duration": 148,
                "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",  # noqa: E501
            },
            {
                "title": "The Dark Knight",
                "genres": ["Action", "Crime", "Drama"],
                "year": 2008,
                "rating": 9.0,
                "duration": 152,
                "description": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",  # noqa: E501
            },
            {
                "title": "Pulp Fiction",
                "genres": ["Crime", "Drama"],
                "year": 1994,
                "rating": 8.9,
                "duration": 154,
                "description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",  # noqa: E501
            },
            {
                "title": "Forrest Gump",
                "genres": ["Drama", "Romance"],
                "year": 1994,
                "rating": 8.8,
                "duration": 142,
                "description": "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",  # noqa: E501
            }
        ]

    def get_recommendations(self):

        return self.film_recommendations[:self.limit]

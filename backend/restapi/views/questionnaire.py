from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny


class QuestionnaireAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "version": "1.0",
            "questions": [
                {
                    "id": 0,
                    "question": "Which of these movies do you like the most?",
                    "options": [
                        {"id": 0, "text": "The Godfather"},
                        {"id": 1, "text": "The Shawshank Redemption"},
                        {"id": 2, "text": "The Dark Knight"},
                        {"id": 3, "text": "Pulp Fiction"},
                    ],
                },
                {
                    "id": 1,
                    "question": "Which actor is your favorite?",
                    "options": [
                        {"id": 0, "text": "Robert De Niro"},
                        {"id": 1, "text": "Tom Hanks"},
                        {"id": 2, "text": "Leonardo DiCaprio"},
                        {"id": 3, "text": "Morgan Freeman"},
                        {"id": 4, "text": "Samuel L. Jackson"},
                        {"id": 5, "text": "Brad Pitt"},
                    ],
                },
                {
                    "id": 2,
                    "question": "What genre do you prefer?",
                    "options": [
                        {"id": 0, "text": "Action"},
                        {"id": 1, "text": "Comedy"},
                        {"id": 2, "text": "Drama"},
                        {"id": 3, "text": "Horror"},
                    ],
                },
            ],
        }, status=status.HTTP_200_OK)

    def post(self, request):
        # Extract results from the request data
        version = request.data.get('version', None)
        results = request.data.get('results', [])

        # Validate the results (optional)
        if not isinstance(results, list):
            if not all(isinstance(result, int) for result in results):
                return Response(
                    {"error": "Invalid results format"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        film_recommendations = [
            {
                "id": 0,
                "title": "The Godfather",
                "genres": ["Crime", "Drama"],
                "year": 1972,
                "rating": 9.2,
                "duration": 175,
                "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",  # noqa: E501
            },
            {
                "id": 1,
                "title": "The Shawshank Redemption",
                "genres": ["Drama"],
                "year": 1994,
                "rating": 9.3,
                "duration": 142,
                "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",  # noqa: E501
            },
            {
                "id": 2,
                "title": "Inception",
                "genres": ["Action", "Adventure", "Sci-Fi"],
                "year": 2010,
                "rating": 8.8,
                "duration": 148,
                "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",  # noqa: E501
            },
            {
                "id": 3,
                "title": "The Dark Knight",
                "genres": ["Action", "Crime", "Drama"],
                "year": 2008,
                "rating": 9.0,
                "duration": 152,
                "description": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",  # noqa: E501
            },
            {
                "id": 4,
                "title": "Pulp Fiction",
                "genres": ["Crime", "Drama"],
                "year": 1994,
                "rating": 8.9,
                "duration": 154,
                "description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",  # noqa: E501
            }
        ]

        # Format the response
        response_data = {
            "version": version,
            "results": results,
            "recommendations": film_recommendations
        }

        return Response(response_data, status=status.HTTP_200_OK)

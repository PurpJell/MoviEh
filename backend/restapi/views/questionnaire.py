from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny


class QuestionnaireAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "version": "1.1",
            "questions": [
                {
                    "id": 0,
                    "question": "How would you describe your current emotional state?",  # noqa: E501
                    # "type": "radio", # should i add this field?
                    "options": [
                        {"id": 0, "text": "Happy and joyful"},
                        {"id": 1, "text": "Calm and relaxed"},
                        {"id": 2, "text": "Anxious and stressed"},
                        {"id": 3, "text": "Sad and melancholic"},
                        {"id": 4, "text": "Excited and energetic"},
                        {"id": 5, "text": "Bored or indifferent"},
                        {"id": 6, "text": "Mad or angry"},
                    ],
                },
                {
                    "id": 1,
                    "question": "Are you in the mood for something that matches your current mood or emotion, or contrasts it?",  # noqa: E501
                    # "type": "radio",
                    "options": [
                        {"id": 0, "text": "Matches my mood"},
                        {"id": 1, "text": "Contrasts with my mood"},
                    ],
                },
                {
                    "id": 2,
                    "question": "What type of feeling do you want the movie to evoke?",  # noqa: E501
                    # "type": "radio",
                    "options": [
                        {"id": 0, "text": "Happiness and laughter"},
                        {"id": 1, "text": "Thrills and excitement"},
                        {"id": 2, "text": "Comfort and warmth"},
                        {"id": 3, "text": "Inspiration and motivation"},
                        {"id": 4, "text": "Suspense and mystery"},
                        {"id": 5, "text": "Nostalgia and reflection"},
                    ],
                },
                {
                    "id": 3,
                    "question": "You prefer a movie that is: (choose one)",
                    # "type": "radio",
                    "options": [
                        {"id": 0, "text": "Lighthearted and fun"},
                        {"id": 1, "text": "Deep and thought-provoking"},
                        {"id": 2, "text": "Romantic and emotional"},
                        {"id": 3, "text": "Action-packed and fast-paced"},
                        {"id": 4, "text": "Dark and intense"},
                        {"id": 5, "text": "Calm and slow-paced"},
                        ],
                },
                {
                    "id": 4,
                    "question": "You are looking for a story that: (choose one)",  # noqa: E501
                    # "type": "radio",
                    "options": [
                        {"id": 0, "text": "Lifts mood and makes you laugh"},
                        {"id": 1, "text": "Challenges you to think and question"},  # noqa: E501
                        {"id": 2, "text": "Makes you feel cozy and at ease"},
                        {"id": 3, "text": "Gives you a rush of adrenaline"},
                        {"id": 4, "text": "Unfolds in a mysterious and unpredictable way"},  # noqa: E501
                        {"id": 5, "text": "Evokes a sense of wonder and awe"},
                    ],
                },
                {
                    "id": 5,
                    "question": "If you could choose one word to descibe what you want from the movie experience, what would it be?",  # noqa: E501
                    # "type": "checkbox",
                    "options": [
                        {"id": 0, "text": "Joy"},
                        {"id": 1, "text": "Adventure"},
                        {"id": 2, "text": "Peace"},
                        {"id": 3, "text": "Romance"},
                        {"id": 4, "text": "Fear"},
                        {"id": 5, "text": "Curiosity"},
                    ],
                },
                {
                    "id": 6,
                    "question": "You want a movie that: (choose one)",
                    # "type": "checkbox",
                    "options": [
                        {"id": 0, "text": "Focuses on character development and emotions"},  # noqa: E501
                        {"id": 1, "text": "Explores a captivating plot or mystery"},  # noqa: E501
                        {"id": 2, "text": "Takes you on an imaginative journey"},  # noqa: E501
                        {"id": 3, "text": "Is realistic and relatable"},
                        {"id": 4, "text": "Has unexpected twists and surprises"},  # noqa: E501
                        {"id": 5, "text": "Delivers action and excitement from start to finish"},  # noqa: E501
                    ],
                }
            ],
        }, status=status.HTTP_200_OK)

    def post(self, request):
        # Extract results from the request data
        version = request.data.get('version', None)
        results = request.data.get('results', [])

        text_answers = []
        tags = []

        # Validate the results (optional)
        if not isinstance(results, list):
            for result in results:
                if (result.id <= 2):  # for questions 0, 1, 2 (version 1.1)
                    if not isinstance(result, str):
                        return Response(
                            {"error": f"Invalid results format for question {result.id}"},  # noqa: E501
                            status=status.HTTP_400_BAD_REQUEST
                        )
                else:
                    if not isinstance(result, list):
                        if not all(isinstance(option, int) for option in result):  # noqa: E501
                            return Response(
                                {"error": f"Invalid results format for question {result.id}"},  # noqa: E501
                                status=status.HTTP_400_BAD_REQUEST  # noqa: E501
                            )

        for result in results:
            if (result.id <= 2):  # for questions 0, 1, 2 (version 1.1)
                text_answers.append(result)
            else:
                for option in result:
                    tags.append(option)

        tags = list(set(tags))  # remove duplicates

        # !!! send text_answers and tags to chatGPT to get film recommendations
        film_recommendations = self.get_recommendations(text_answers, tags)  # noqa: E501 TEMPORARY

        # Format the response
        response_data = {
            "version": version,
            "results": results,
            "text_answers": text_answers,
            "tags": tags,
            "recommendations": film_recommendations
        }

        return Response(response_data, status=status.HTTP_200_OK)

    def get_recommendations(text_answers, tags):

        limit = 10  # number of movies to return
        example = [
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
        ]

        prompt = f"I'm in the mood for a movie that is {text_answers[0]}, {text_answers[1]}, evokes {text_answers[2]} and fits as many of these tags, as possible: " + ", ".join(tags) + f". Return me nothing else but {limit} movies in this format: {example}"  # noqa: E501

        # !!! send the prompt to chatGPT to get film recommendations
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

        return film_recommendations

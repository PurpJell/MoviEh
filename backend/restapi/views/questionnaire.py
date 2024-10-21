from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class QuestionnaireAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

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
        if not isinstance(results, list) or not all(isinstance(result, int) for result in results):
            return Response({"error": "Invalid results format"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Format the response
        response_data = {
            "version": version,
            "results": results
        }
        
        return Response(response_data, status=status.HTTP_200_OK)

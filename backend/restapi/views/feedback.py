from rest_framework.views import APIView
from rest_framework import status
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from ..serializers import FeedbackSerializer
from ..services import FeedbackService


class FeedbackAPIView(APIView):
    permission_classes = [AllowAny]

    def __init__(self):
        self.feedback_serializer = FeedbackSerializer()
        self.feedback_service = FeedbackService()

    def post(self, request):
        feedback_serializer = FeedbackSerializer(data=request.data)

        if not feedback_serializer.is_valid():
            return JsonResponse(
                feedback_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        user = request.user

        if user is None:
            return JsonResponse(
                {"error": "User not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Save the feedback
        return FeedbackService.process_feedback(feedback_serializer.validated_data, user)

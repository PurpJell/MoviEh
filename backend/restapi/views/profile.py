from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from ..serializers import UserProfileSerializer
from ..data_models import UserProfile


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        user_profile = UserProfile.objects.get(user=user)

        if user_profile is None:
            return JsonResponse(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        return JsonResponse(
            {"preferences": user_profile.preferences},
            status=status.HTTP_200_OK
        )

    # Update the user's profile
    def post(self, request):
        user_profile = request.user.userprofile  # Get the user's profile

        # Access current preferences
        current_preferences = user_profile.preferences

        # Access new preferences from request data
        new_preferences = request.data.get('preferences', {})

        # Merge current preferences with new preferences
        merged_preferences = {**current_preferences, **new_preferences}

        # Update the request data with merged preferences
        request.data['preferences'] = merged_preferences

        # Instantiate the serializer
        user_profile_serializer = UserProfileSerializer(
            instance=user_profile,
            data=request.data,
            partial=True  # Allow partial updates
        )

        if not user_profile_serializer.is_valid():
            return JsonResponse(
                user_profile_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        user_profile_serializer.save()

        return JsonResponse(
            {"message": "Profile updated successfully."},
            status=status.HTTP_200_OK
        )

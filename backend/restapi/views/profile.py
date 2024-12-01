from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from ..serializers import UserProfileSerializer
from django.contrib.auth.models import User
from ..data_models import UserProfile


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        user_profile = UserProfile.objects.get(username=user.username)

        if user_profile is None:
            return JsonResponse(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        return JsonResponse(
            {"comedy": user_profile.comedy},
            status=status.HTTP_200_OK
        )

    # Update the user's profile
    def post(self, request):

        user_profile = request.user.userprofile  # Get the user's profile
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
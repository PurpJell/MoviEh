from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from ..serializers import UserProfileSerializer
from django.contrib.auth.models import User

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_profile_serializer = UserProfileSerializer(data=request.data)

        if not user_profile_serializer.is_valid():
            return JsonResponse(
                user_profile_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if username is already taken
        username = user_profile_serializer.validated_data['user']['username']
        if User.objects.filter(username=username).exists():
            return JsonResponse(
                {"error": "Username already taken."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Save the user and user profile
        user_profile_serializer.save()

        return JsonResponse(
            {"message": "User registered successfully."},
            status=status.HTTP_201_CREATED
        )
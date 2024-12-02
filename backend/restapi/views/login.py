from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from ..serializers import LoginSerializer
from django.contrib.auth import authenticate, login


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        login_serializer = LoginSerializer(data=request.data)

        if not login_serializer.is_valid():
            return JsonResponse(
                login_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        # Extract username and password from validated data
        username = login_serializer.validated_data['username']
        password = login_serializer.validated_data['password']

        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        if user is None:
            return JsonResponse(
                {"error": "The username or password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Log the user in
        login(request, user)

        return JsonResponse(
            {"message": "User logged in successfully.", "username": username},
            status=status.HTTP_200_OK
        )

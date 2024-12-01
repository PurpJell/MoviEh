from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from django.contrib.auth import logout
from rest_framework.authtoken.models import Token


class LogoutAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        # Log the user out
        logout(request)

        return JsonResponse(
            {"message": "User logged out successfully."},
            status=status.HTTP_200_OK
        )
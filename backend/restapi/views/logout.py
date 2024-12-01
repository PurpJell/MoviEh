from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse


class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Log the user out
        request.user.auth_token.delete()

        return JsonResponse(
            {"message": "User logged out successfully."},
            status=status.HTTP_200_OK
       )
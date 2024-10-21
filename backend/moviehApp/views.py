from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from moviehApp.serializers import UserSerializer
from django.http import HttpResponse

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def questionnaire(request):
    if request.method == 'GET':
        return HttpResponse("""{
  version: '1.0',
  questions: [
    {
      id: 0,
      question: 'Which of these movies do you like the most?',
      options: [
        { id: 0, text: 'The Godfather' },
        { id: 1, text: 'The Shawshank Redemption' },
        { id: 2, text: 'The Dark Knight', },
        { id: 3, text: 'Pulp Fiction' },
      ],
    },
    {
      id: 1,
      question: 'Which actor is your favorite?',
      options: [
        { id: 0, text: 'Robert De Niro' },
        { id: 1, text: 'Tom Hanks' },
        { id: 2, text: 'Leonardo DiCaprio' },
        { id: 3, text: 'Morgan Freeman' },
        { id: 4, text: 'Samuel L. Jackson' },
        { id: 5, text: 'Brad Pitt' },
      ],
    },
    {
      id: 2,
      question: 'What genre do you prefer?',
      options: [
        { id: 0, text: 'Action' },
        { id: 1, text: 'Comedy' },
        { id: 2, text: 'Drama' },
        { id: 3, text: 'Horror' },
      ]
    },
  ],
};""")

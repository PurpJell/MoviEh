import json
from typing import List
from django.conf import settings
from dataclasses import dataclass
from pydantic import BaseModel
from .serializers import QuestionnaireSerializer
from django.contrib.auth.models import User
from django.db import models


@dataclass
class Option:
    text: str
    result: List[str]


@dataclass
class Question:
    text: str
    type: str
    resultType: str
    options: List[Option]


@dataclass
class Questionnaire:
    questions: List[Question]

    def __init__(self):
        questions_path = settings.BASE_DIR / 'restapi' / 'data' / 'questions.json'
        with open(questions_path, 'r') as file:
            data = json.load(file)
            questionnaire = data['questions']  # Access the 'questions' key
            self.questions = [Question(**question) for question in questionnaire]

    def to_dict(self):
        serializer = QuestionnaireSerializer(self)
        return serializer.data


@dataclass
class QuestionnaireResult:
    phrases: List[str]
    tags: List[str]


@dataclass
class TagList:
    tags: List[str]

    def __init__(self):
        taglist_path = settings.BASE_DIR / 'restapi' / 'data' / 'taglist.json'
        with open(taglist_path, 'r') as file:
            data = json.load(file)
            self.tags = data['tags']


class Movie(BaseModel):
    title: str
    genres: List[str]
    year: int
    rating: float
    duration: int
    shortDescription: str


class Recommendation(BaseModel):
    movies: List[Movie]


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    comedy = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username
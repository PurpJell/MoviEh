from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
import json
from typing import List
from pydantic import BaseModel, Field
from dataclasses import dataclass


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
        from .serializers import QuestionnaireSerializer  # Local import avoids circular dependency
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


class PersonalizedMovie(Movie):
    personalization_score: float = Field(default=0.0)


class Recommendation(BaseModel):
    movies: List[Movie]


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    preferences = models.JSONField(default=dict)

    def __str__(self):
        return self.user.username

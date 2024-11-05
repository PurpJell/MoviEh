import json
from typing import List
from django.conf import settings
from dataclasses import dataclass
from pydantic import BaseModel
from .serializers import QuestionnaireSerializer


@dataclass
class Option:
    text: str
    result: List[str]


@dataclass
class Question:
    question: str
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


class Movie(BaseModel):
    title: str
    genres: List[str]
    year: int
    rating: float
    duration: int
    description: str


class Recommendation(BaseModel):
    movies: List[Movie]

import json
from typing import List
from django.conf import settings
from dataclasses import dataclass


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
        questions = settings.BASE_DIR / 'restapi' / 'data' / 'questions.json'
        with open(questions, 'r') as file:
            questionnaire = json.load(file)
            self.questions = [Question(**question) for question in questionnaire]  # noqa: E501

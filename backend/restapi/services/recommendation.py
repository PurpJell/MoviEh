from openai import OpenAI
import os
from ..models import Recommendations
from pydantic import ValidationError


class GptRecommendationService:

    def __init__(self):

        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        self.limit = 10  # number of movies to return

        self.response_format = {
            "type": "json_schema",
            "json_schema": {
                "name": "movie_recommendations",
                "schema": {
                    "type": "object",
                    "properties": {
                        "movies": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "title": {"type": "string"},
                                    "genres": {
                                        "type": "array",
                                        "items": {
                                            "genre": {"type": "string"}
                                        }
                                    },
                                    "year": {"type": "integer"},
                                    "rating": {"type": "number"},
                                    "duration": {"type": "integer"},
                                    "description": {"type": "string"}
                                },
                                "required": ["title", "genres", "year", "rating", "duration", "description"],  # noqa: E501
                                "additionalProperties": False
                            }
                        },
                    },
                    "required": ["movies"],
                    "additionalProperties": False
                },
                "strict": True
            }
        }

    def get_recommendations(self, phrases, tags):

        prompt = f"I'm in the mood for a movie that is {phrases[0]}, {phrases[1]}, evokes {phrases[2]} and fits as many of these tags, as possible: " + ", ".join(tags) + f". Return me {self.limit} movies."  # noqa: E501

        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=self.limit * 80,
            temperature=1.5,
            response_format=self.response_format
        )

        try:
            # Parse and validate the response content
            recommendations = Recommendations.parse_raw(response.choices[0].message.content)  # noqa: E501
            return recommendations
        except ValidationError as e:
            # Handle validation errors
            print(e.json())

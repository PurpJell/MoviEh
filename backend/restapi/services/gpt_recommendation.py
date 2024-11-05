from openai import OpenAI
import os
from ..data_models import Recommendation
from pydantic import ValidationError


class GptRecommendationService:

    def __init__(self):

        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        self.limit = 10  # number of movies to return

        self.response_format = Recommendation

    def get_recommendations(self, phrases, tags):

        prompt = (
            f"Recommend me a movie that is {phrases[0]}, {phrases[1]}, evokes {phrases[2]} "
            f"and fits as many of these tags, as possible: {', '.join(tags)}. "
            f"Return me {self.limit} movies."
        )
        response = self.client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=self.limit * 1000,
            temperature=1.5,
            response_format=self.response_format
        )

        try:
            # Parse and validate the response content
            recommendations = response.choices[0].message
            return recommendations
        except ValidationError as e:
            # Handle validation errors
            print(e.json())

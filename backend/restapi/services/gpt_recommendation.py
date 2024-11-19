from openai import OpenAI
import os
import json
from ..data_models import Recommendation
from pydantic import ValidationError


class GptRecommendationService:

    def __init__(self):

        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        self.limit = 10  # number of movies to return

        self.response_format = Recommendation

    def form_prompt(self, phrases, tags):

        prompt = (
            f"Recommend me a movie that is {phrases[0]}, {phrases[1]}, evokes {phrases[2]} "
            f"and fits as many of these tags, as possible: {', '.join(tags)}. "
            f"Return me {self.limit} movies."
        )

        return prompt

    def get_recommendations(self, prompt):

        response = self.client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0,
            response_format=self.response_format
        )

        try:
            # Parse and validate the response content
            first_response = response.choices[0].message

            content = first_response.content

            response_data = json.loads(content)

            # Extract the movies data
            movies = response_data.get('movies', [])
            return movies

        except (ValidationError, json.JSONDecodeError) as e:
            # Handle validation errors and JSON decode errors
            print(f"Error parsing recommendations: {e}")
            return []

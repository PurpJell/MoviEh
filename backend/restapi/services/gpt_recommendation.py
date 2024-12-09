from openai import OpenAI
import os
import json
from ..data_models import Recommendation
from pydantic import ValidationError
import re


class GptRecommendationService:

    def __init__(self, limit=10):

        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        self.limit = limit  # number of movies to return

        self.response_format = Recommendation

    def form_questionnaire_prompt(self, phrases, tags):

        prompt = (
            f"Recommend me a movie that is {phrases[0]}, {phrases[1]}, evokes {phrases[2]} "
            f"and fits as many of these tags, as possible: {', '.join(tags)}. "
            f"Return me {self.limit} movies."
        )

        return prompt

    def form_user_input_prompt(self, user_input, favorite_genres):

        user_input = user_input.strip()  # Remove leading and trailing spaces
        user_input = user_input.lower()  # Convert to lowercase
        user_input = re.sub(r'[^a-z0-9\.\(\)\s]', '', user_input)  # noqa: E501 Remove special characters except for . and ()
        user_input = re.sub(r'\s+', ' ', user_input)  # Replace multiple spaces with a single space

        # Check if the user input has at least 2 words
        if len(user_input.split()) < 2:
            user_input = "Random movies with decent ratings"  # Default prompt

        prompt = (
            f"Based on the user's input: `{user_input}`, recommend them movies that best match this description. "  # noqa: E501
            f"Ensure the recommendations align with the emotional tone, genre preferences, or any specific details provided. "  # noqa: E501
        )

        if favorite_genres:
            prompt += f"Genre preferences: {', '.join(favorite_genres)}. "

        prompt += f"Return me {self.limit} movies."

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

from openai import OpenAI
import os


def get_recommendations(phrases, tags):

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    limit = 10  # number of movies to return

    example = [
        {
            "id": 0,
            "title": "The Godfather",
            "genres": ["Crime", "Drama"],
            "year": 1972,
            "rating": 9.2,
            "duration": 175,
            "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",  # noqa: E501
        },
        {
            "id": 1,
            "title": "The Shawshank Redemption",
            "genres": ["Drama"],
            "year": 1994,
            "rating": 9.3,
            "duration": 142,
            "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",  # noqa: E501
        },
    ]

    prompt = f"I'm in the mood for a movie that is {phrases[0]}, {phrases[1]}, evokes {phrases[2]} and fits as many of these tags, as possible: " + ", ".join(tags) + f". Return me nothing else but {limit} movies in this format: {example}"  # noqa: E501

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ],
        max_tokens=limit * 80,
        temperature=1.5
    )

    recommendations = response.choices[0].message.content.strip()

    return recommendations

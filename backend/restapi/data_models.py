from typing import List
from pydantic import BaseModel

class Movie(BaseModel):
    title: str
    genres: List[str]
    year: int
    rating: float
    duration: int
    description: str


class Recommendation(BaseModel):
    movies: List[Movie]

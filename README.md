# MoviEh

MoviEh is a movie recommendation system that leverages OpenAI's GPT model to provide personalized movie recommendations based on user preferences and inputs.

Note that in order to fully take use of the system, an OpenAI API key is required.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

- Personalized movie recommendations based on user preferences.
- Integration with OpenAI's GPT model for generating recommendations.
- RESTful API for interacting with the recommendation system.
- Dockerized setup for easy deployment.

## Installation

### Prerequisites

- Docker
- Docker Compose
- OpenAI API Key (for full functionality)

### Steps

1. **Clone the repository:**

    ```sh
    git clone https://github.com/PurpJell/MoviEh.git
    cd MoviEh
    ```

2. **Change the API key** (Optional)**:**

    In `docker-compose.yml` change the backend section accordingly and insert your API key:

    ```yml
      backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: "postgresql://user:password@database:5432/movieh"
      ENV: prod
      OPENAI_API_KEY: <YOUR_API_KEY>
    networks:
      - app-network
    ports:
      - "8001:8000"
    depends_on:
      database:
        condition: service_healthy
    ```

3. **Build and start the Docker containers:**

    ```sh
    docker-compose up --build
    ```

4. The application should now be running. The backend will be accessible at `http://localhost:8001` and the frontend at `http://localhost:80`.

## Usage

In your browser, navigate to `http://localhost:80`. 

## License

This project is licensed under the MIT License. See the LICENSE file for details.

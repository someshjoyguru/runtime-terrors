# Gemini Express App

This project is an Express server that integrates with the Google Gemini API to generate content based on user prompts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd gemini-express-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

## Usage

To start the server, run the following command:
```
npm start
```

The server will be running on `http://localhost:3000`.

## API Endpoints

- **GET /**: Returns a welcome message.
  
  **Response:**
  ```json
  {
    "message": "Hello from DALL-E!"
  }
  ```

- **POST /**: Accepts a prompt and returns AI-generated content.

  **Request Body:**
  ```json
  {
    "prompt": "Your prompt here"
  }
  ```

  **Response:**
  ```json
  {
    "photo": "Generated content here"
  }
  ```

## Environment Variables

- `GEMINI_API_KEY`: Your API key for authenticating requests to the Google Gemini API.

## License

This project is licensed under the MIT License.
# MongoDB and NestJS Project

This project demonstrates the integration of MongoDB with NestJS using TypeScript. It provides a set of APIs for user management, post management and includes a chat feature for real-time communication.

## Features

- User Management APIs:
  - Register: Create a new user account.
  - Get Profile: Retrieve user profile information.
  - Update Profile: Modify user profile details.
  - Login: Authenticate and generate a session token(JWT Token).
  - Logout: Terminate the user session.

- Post Management APIs:
  - Create Post: Add a new post associated with a user.
  - Get User Posts: Retrieve posts created by a him.
  - Get All Posts: Fetch all posts in the system.
  - Delete Post: Remove a post by its unique identifier.

- Chat Feature:
  - Send Message: Allows users to send messages to each other.
  - Get User Chats: Retrieves chat history for a specific user.

## Prerequisites

- Node.js
- MongoDB
- TypeScript
- WebSocket

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/dineshchauhan7711/nest-demo
    ```

2. Navigate to the project directory:

    ```
    cd nest-demo
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Configure environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key_for_jwt
    PORT= 3000
    PROJECT_PATH = 'http://localhost:3000'
    ```

5. Start the server:

    ```
    npm run start:dev
    ```

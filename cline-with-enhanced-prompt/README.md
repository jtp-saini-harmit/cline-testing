# Ecommerce Application

This is a full-stack ecommerce application built with Next.js for the frontend and Express.js for the backend.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   cd frontend && npm install
   cd ../backend && npm install
   ```

## Running the application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```
   The backend server will run on http://localhost:3001

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

## Features

- Product listing
- Product details
- Shopping cart
- Wishlist
- User authentication

## Tech Stack

- Frontend: Next.js, React, Axios
- Backend: Express.js
- State Management: React Context
- Styling: CSS Modules

## Project Structure

- `/frontend`: Contains the Next.js frontend application
- `/backend`: Contains the Express.js backend application

## Environment Variables

- Frontend: Create a `.env.local` file in the `/frontend` directory with the following content:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:3001/api
  ```

## Note

This is a basic implementation and may need further enhancements for production use, such as:

- Implementing proper authentication and authorization
- Adding more robust error handling
- Implementing data validation
- Adding tests
- Optimizing for performance

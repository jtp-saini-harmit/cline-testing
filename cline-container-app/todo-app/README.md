# Modern Todo App

A modern Todo application built with React, Redux, and Material-UI featuring dark mode and user authentication.

## Features

- User Authentication
- CRUD operations on Todo items
- Dark Mode UI
- Responsive Design
- Local Storage for data persistence
- Containerized application

## Quick Start

### Using Docker (Recommended)

1. Make sure you have Docker and Docker Compose installed on your system
2. Clone this repository
3. Run the application:
```bash
docker-compose up
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Manual Setup

1. Clone this repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technical Stack

- React
- TypeScript
- Redux Toolkit
- Material-UI (MUI)
- Local Storage for data persistence
- Docker

## Usage

1. Sign in with any username and password
2. Add new todos using the input field at the top
3. Mark todos as complete by clicking the checkbox
4. Edit todos by clicking the edit icon
5. Delete todos by clicking the delete icon
6. Your todos are automatically saved to local storage

## Project Structure

```
todo-app/
├── src/
│   ├── components/      # React components
│   ├── store/          # Redux store and slices
│   ├── theme/          # MUI theme configuration
│   ├── App.tsx         # Main App component
│   └── index.tsx       # Entry point
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
└── README.md          # Project documentation

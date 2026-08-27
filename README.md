# React and Django Todo Project using chakra-ui

This project is an implementation of a Todo application using Django Rest Framework as the backend and React for the frontend. The React app (`todo-app`) is set up alongside Django applications to create a full-stack web application that manages todo lists.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete Todos.
- **Searching**: Searching based on todos title .
- **Filtering**: Filter todos based on priority, completeness and due date.
- **API Endpoints**
    - /api/todos/
- **Real-Time Updates**: Utilizes efficient communication between the frontend and backend to ensure state is synchronized across all clients.
- **Github Actions**: Testing workflows for both backend and front end are being handled.
- **Containerization**: Application is dockerized and docker-compose is being used for both django and react containers.
- **Deployment**: Application is deployed to AWS through github action workflow. 

## Demo

Here you can include a GIF or a set of screenshots demonstrating the application's functionality:
<img width="750" alt="image" src="./assets/todo-visual.png">


## Local Setup Guidelines

1. Clone the repository:
   ```bash
   git clone https://github.com/mdanishmaqsood/todo-app.git
   cd todo-app
   ```

2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies & run the app:
   ```bash
   docker-compose up --build
   ```

## Test Cases

Test cases for both django and react are added and ran before the build.

## Project Tracking

Linear projects tracked in this repo:
- Todo App

## Conclusion

This README provides all necessary information to get the project set up locally, run tests, and understand the API.

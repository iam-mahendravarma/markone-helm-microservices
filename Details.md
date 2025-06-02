# Task Management Application

A modern task management application built with React.js, FastAPI, and MongoDB.

## Features

- Create, read, update, and delete tasks
- Set task priorities and status
- Add due dates to tasks
- Beautiful Material-UI interface
- Real-time updates
- Responsive design

## Prerequisites

- Python 3.8+
- Node.js 14+
- MongoDB

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - Unix/MacOS:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the backend directory:
   ```
   MONGODB_URL=mongodb://localhost:27017
   ```

6. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## API Documentation

Once the backend server is running, you can access the API documentation at:
http://localhost:8000/docs

## Technologies Used

- Frontend:
  - React.js
  - Material-UI
  - Axios
  - React-Toastify
  - Date-fns

- Backend:
  - FastAPI
  - Motor (MongoDB async driver)
  - Pydantic
  - Python-dotenv

- Database:
  - MongoDB 
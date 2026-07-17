# User CRUD API

Simple backend API made for Task-01 of my internship. It handles basic CRUD (Create, Read, Update, Delete) operations for a users resource, built with Node.js and Express.

Users are stored in memory (no database), each with an id, name, email and age.

## How to run it

1. Install dependencies:
   npm install

2. Start the server:
   npm start

3. Server runs at http://localhost:3000

## Endpoints

POST /users - create a new user
GET /users - get all users
GET /users/:id - get one user
PUT /users/:id - update a user
DELETE /users/:id - delete a user

## Example

curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "John", "email": "john@example.com", "age": 25}'

## Notes

- Data resets every time the server restarts since it's stored in memory.
- Basic validation is included - name and email are required, email must be valid, age must be a positive number.
- Proper status codes are returned - 201 for created, 404 for not found, 400 for bad input.

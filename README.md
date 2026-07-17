# User CRUD API

A simple REST API built with **Node.js** and **Express** that performs CRUD
(Create, Read, Update, Delete) operations on a `users` resource.

- Storage: in-memory JavaScript object (acts as a hashmap) — no database needed.
- Each user has: `id` (UUID), `name`, `email`, `age`.
- Proper HTTP status codes: `200`, `201`, `204`, `400`, `404`.
- Basic input validation (email format, required fields, age must be a positive number).

## 1. Requirements

- [Node.js](https://nodejs.org/) installed (any recent version, 18+ is fine).
  Check with: `node -v`

## 2. Setup

```bash
npm install
```

## 3. Run the server

```bash
npm start
```

You should see:
```
User CRUD API running at http://localhost:3000
```

## 4. Endpoints

| Method | Endpoint      | Description          |
|--------|---------------|-----------------------|
| POST   | /users        | Create a new user     |
| GET    | /users        | Get all users         |
| GET    | /users/:id    | Get a single user     |
| PUT    | /users/:id    | Update a user         |
| DELETE | /users/:id    | Delete a user         |

## 5. Example requests (using curl)

**Create a user**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 25}'
```

**Get all users**
```bash
curl http://localhost:3000/users
```

**Get one user** (replace `<id>` with an id from the create response)
```bash
curl http://localhost:3000/users/<id>
```

**Update a user**
```bash
curl -X PUT http://localhost:3000/users/<id> \
  -H "Content-Type: application/json" \
  -d '{"age": 26}'
```

**Delete a user**
```bash
curl -X DELETE http://localhost:3000/users/<id>
```

You can also test all of this visually using [Postman](https://www.postman.com/downloads/)
instead of curl — just set the method, URL, and for POST/PUT add a JSON body.

## 6. Notes

- Data is stored in memory, so it resets whenever the server restarts. This
  is intentional per the task requirements (no database needed).
- Validation checks: `name` must be a non-empty string, `email` must look
  like a valid email address, `age` must be a positive whole number.

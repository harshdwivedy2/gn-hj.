// server.js
// A simple REST API for managing "users" with CRUD operations.
// Storage is in-memory (a JavaScript object acting as a hashmap) —
// data resets every time the server restarts. That's expected for this task.

const express = require('express');
const { v4: uuidv4, validate: isUuid } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Lets Express understand JSON request bodies (req.body)
app.use(express.json());

// ---- In-memory "database" ----
// Key = user id (UUID), Value = user object
const users = {};

// ---- Helper: validate an email with a simple regex ----
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---- Helper: validate the incoming user data ----
function validateUserInput(data, { partial = false } = {}) {
  const errors = [];
  const { name, email, age } = data;

  if (!partial || name !== undefined) {
    if (typeof name !== 'string' || name.trim().length === 0) {
      errors.push('name is required and must be a non-empty string');
    }
  }

  if (!partial || email !== undefined) {
    if (!isValidEmail(email)) {
      errors.push('email is required and must be a valid email address');
    }
  }

  if (!partial || age !== undefined) {
    if (typeof age !== 'number' || !Number.isInteger(age) || age <= 0) {
      errors.push('age is required and must be a positive integer');
    }
  }

  return errors;
}

// =====================================================
// CREATE — POST /users
// =====================================================
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;

  const errors = validateUserInput({ name, email, age });
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  const id = uuidv4();
  const newUser = { id, name, email, age };
  users[id] = newUser;

  return res.status(201).json(newUser);
});

// =====================================================
// READ ALL — GET /users
// =====================================================
app.get('/users', (req, res) => {
  return res.status(200).json(Object.values(users));
});

// =====================================================
// READ ONE — GET /users/:id
// =====================================================
app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ error: 'Invalid user id format' });
  }

  const user = users[id];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(200).json(user);
});

// =====================================================
// UPDATE — PUT /users/:id
// (Here we allow partial updates so the endpoint is more forgiving)
// =====================================================
app.put('/users/:id', (req, res) => {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ error: 'Invalid user id format' });
  }

  const user = users[id];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, email, age } = req.body;
  const errors = validateUserInput({ name, email, age }, { partial: true });
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (age !== undefined) user.age = age;

  return res.status(200).json(user);
});

// =====================================================
// DELETE — DELETE /users/:id
// =====================================================
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ error: 'Invalid user id format' });
  }

  const user = users[id];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  delete users[id];
  return res.status(204).send();
});

// ---- Fallback for unknown routes ----
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`User CRUD API running at http://localhost:${PORT}`);
});

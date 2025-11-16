const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

// Health Check
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT NOW()');
    res.status(200).json({ status: 'OK', db: 'Connected' });
  } catch (e) {
    res.status(500).json({ status: 'Error', db: 'Disconnected' });
  }
});

// List all loans
app.get('/api/loans', async (req, res) => {
  const result = await db.query('SELECT * FROM loans');
  res.json(result.rows);
});

// Get loan by ID
app.get('/api/loans/:id', async (req, res) => {
  const result = await db.query('SELECT * FROM loans WHERE id=$1', [req.params.id]);
  res.json(result.rows[0] || {});
});

// Create new loan
app.post('/api/loans', async (req, res) => {
  const { customer, amount } = req.body;
  const result = await db.query('INSERT INTO loans (customer, amount) VALUES ($1, $2) RETURNING *', [customer, amount]);
  res.status(201).json(result.rows[0]);
});

// Loan stats
app.get('/api/stats', async (req, res) => {
  const result = await db.query('SELECT COUNT(*) AS total_loans, SUM(amount) AS total_amount FROM loans');
  res.json(result.rows[0]);
});

app.listen(3000, () => {
  console.log(`Loan API running in ${process.env.NODE_ENV} mode on port 3000`);
});

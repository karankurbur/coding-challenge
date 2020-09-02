require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = 3001;
const Blockchain = require("./blockchain");
const TRANSACTION_TYPE = require("./utils/index");

const blockchain = new Blockchain();

// eslint-disable-next-line no-unused-vars
/**
 * Middleware for catching errors.
 */
app.use((error, req, res, next) => {
  res.json({ message: error.message });
});

/**
 * Creates JSON object defining a transaction
 * @param {*} type
 * @param {*} value
 * @param {*} newValue
 */
function createTransaction(type, value, newValue) {
  return {
    type,
    value,
    newValue,
  };
}

/**
 * Create a new task, only works with unique values
 * @param {*} value
 */
app.post("/", (req, res) => {
  const { value } = req.body;
  if (value === null || value === "") {
    res.status(400).send({ error: "Values can not be null" });
  } else {
    const transaction = createTransaction(TRANSACTION_TYPE.CREATE, value);
    blockchain.addTransaction(transaction);
  }

  res.send({ error: false });
});

/**
 * Update an existing task if it exists and the new value is unique.
 * @param {*} value
 * @param {*} newValue
 */
app.patch("/", (req, res) => {
  const { value, newValue } = req.body;
  if (value === null || newValue === null || value === "" || newValue === "") {
    res.status(400).send({ error: "Values can not be null" });
  } else {
    const transaction = createTransaction(
      TRANSACTION_TYPE.UPDATE,
      value,
      newValue
    );
    blockchain.addTransaction(transaction);
  }
  res.send({ error: false });
});

/**
 * Deletes a task if it exists
 * @param {*} value
 */
app.delete("/", (req, res) => {
  const { value } = req.body;
  if (value === null || value === "") {
    res.status(400).send({ error: "Values can not be null" });
  } else {
    const transaction = createTransaction(TRANSACTION_TYPE.DELETE, value);
    blockchain.addTransaction(transaction);
  }
  res.send({ error: false });
});

/**
 * Returns x amount of recent transactions
 * @param {integer} amount
 */
app.get("/transactions/:amount", (req, res) => {
  const { amount } = req.params;
  if (amount == null || amount <= 0) {
    res.status(400).send({ error: "Must get atleast one transaction" });
  } else {
    const transactions = blockchain.getRecentTransactions(amount);
    res.send({
      transactions,
    });
  }
});

/**
 * Returns the current state of the task list
 */
app.get("/state/", (req, res) => {
  res.send({
    state: blockchain.state,
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;

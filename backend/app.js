require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = process.env.PORT;
const Blockchain = require("./blockchain");
const TRANSACTION_TYPE = require("./utils/index");

const blockchain = new Blockchain();

for (let i = 0; i < 10; i++) {
  const transaction = createTransaction(TRANSACTION_TYPE.CREATE, i);
  blockchain.addTransaction(transaction);
}

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.json({ message: error.message });
});

function createTransaction(type, value, newValue) {
  return {
    type,
    value,
    newValue,
  };
}

app.post("/", (req, res) => {
  const { value } = req.body;
  if (value === null) {
    res.status(400).send({ error: "Values can not be null" });
  } else {
    const transaction = createTransaction(TRANSACTION_TYPE.CREATE, value);
    blockchain.addTransaction(transaction);
  }

  res.send({ error: false });
});

app.patch("/", (req, res) => {
  const { value, newValue } = req.body;
  if (value === null || newValue === null) {
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

app.delete("/", (req, res) => {
  const { value } = req.body;
  if (value === null) {
    res.status(400).send({ error: "Values can not be null" });
  } else {
    const transaction = createTransaction(TRANSACTION_TYPE.DELETE, value);
    blockchain.addTransaction(transaction);
  }
  res.send({ error: false });
});

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

app.get("/state/", (req, res) => {
  res.send({
    state: blockchain.state,
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;

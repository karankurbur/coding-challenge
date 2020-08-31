const TRANSACTION_TYPE = require("./utils/index");

class Blockchain {
  constructor() {
    this.state = [];
    this.transactions = [];
  }

  getRecentTransactions(amount) {
    const transactionLength = this.transactions.length;
    return this.transactions
      .slice(Math.max(0, transactionLength - amount), transactionLength)
      .reverse();
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
    const { type, value, newValue } = transaction;
    const index = this.state.indexOf(value);
    if (type === TRANSACTION_TYPE.UPDATE && index !== -1) {
      this.state.splice(index, 1, newValue);
    } else if (type === TRANSACTION_TYPE.CREATE && index === -1) {
      this.state.push(value);
    } else if (type === TRANSACTION_TYPE.DELETE && index !== -1) {
      this.state.splice(index, 1);
    }
  }
}

module.exports = Blockchain;

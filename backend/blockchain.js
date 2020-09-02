const TRANSACTION_TYPE = require("./utils/index");

class Blockchain {
  constructor() {
    this.state = [];
    this.transactions = [];
  }

  /**
   * Returns the X most recent transactions
   * @param {integer} amount
   */
  getRecentTransactions(amount) {
    const transactionLength = this.transactions.length;
    return this.transactions
      .slice(Math.max(0, transactionLength - amount), transactionLength)
      .reverse();
  }

  /**
   * Updates a task in the list if the transaction is valid.
   * @param {JSON} transaction
   */
  addTransaction(transaction) {
    const { type, value, newValue } = transaction;
    const index = this.state.indexOf(value);
    const newValueIndex = this.state.indexOf(newValue);
    if (
      type === TRANSACTION_TYPE.UPDATE &&
      index !== -1 &&
      newValueIndex === -1
    ) {
      this.state.splice(index, 1, newValue);
      this.transactions.push(transaction);
    } else if (type === TRANSACTION_TYPE.CREATE && index === -1) {
      this.state.push(value);
      this.transactions.push(transaction);
    } else if (type === TRANSACTION_TYPE.DELETE && index !== -1) {
      this.state.splice(index, 1);
      this.transactions.push(transaction);
    }
  }
}

module.exports = Blockchain;

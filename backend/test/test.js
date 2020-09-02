/* eslint-disable func-names */
/* eslint-disable node/no-unpublished-require */
// require("dotenv").config();

// console.log(process.env.PORT);
const chai = require("chai");
// const chaiHttp = require("chai-http");
// const app = require("../app");

const _ = require("underscore");

const { expect } = chai;
// chai.use(chaiHttp);
const TRANSACTION_TYPE = require("../utils/index");

const Blockchain = require("../blockchain");

describe("Blockchain Class", function () {
  // eslint-disable-next-line prefer-const
  let blockchain;
  beforeEach(function () {
    blockchain = new Blockchain();
  });

  it("Get empty transactions", function () {
    expect(blockchain.getRecentTransactions(5).length).to.equals(0);
  });

  it("Get all transactions", function () {
    const addItems = ["Test1", "Test2", "Test3"];
    _.forEach(addItems, (item) => {
      const transaction = {
        type: TRANSACTION_TYPE.CREATE,
        value: item,
      };

      blockchain.addTransaction(transaction);
    });
    expect(blockchain.getRecentTransactions(5).length).to.equals(3);
  });

  it("Get X recent transactions", function () {
    const addItems = ["Test1", "Test2", "Test3", "Test4", "Test5"];
    _.forEach(addItems, (item) => {
      const transaction = {
        type: TRANSACTION_TYPE.CREATE,
        value: item,
      };

      blockchain.addTransaction(transaction);
    });
    expect(blockchain.getRecentTransactions(3).length).to.equals(3);
  });

  it("Update State", function () {
    const addItems = ["Test1", "Test2"];
    _.forEach(addItems, (item) => {
      const transaction = {
        type: TRANSACTION_TYPE.CREATE,
        value: item,
      };

      blockchain.addTransaction(transaction);
    });

    const transaction = {
      type: TRANSACTION_TYPE.UPDATE,
      value: "Test2",
      newValue: "Test3",
    };

    blockchain.addTransaction(transaction);
    expect(blockchain.state.length).to.equals(2);
    expect(blockchain.state[1]).to.equals("Test3");
  });

  it("Update State that already exists", function () {
    const addItems = ["Test1", "Test2"];
    _.forEach(addItems, (item) => {
      const transaction = {
        type: TRANSACTION_TYPE.CREATE,
        value: item,
      };

      blockchain.addTransaction(transaction);
    });

    const transaction = {
      type: TRANSACTION_TYPE.UPDATE,
      value: "Test2",
      newValue: "Test1",
    };

    blockchain.addTransaction(transaction);
    expect(blockchain.state.length).to.equals(2);
    expect(blockchain.state[0]).to.equals("Test1");
    expect(blockchain.state[1]).to.equals("Test2");
  });

  it("Update State that doesn't exist", function () {
    const addItems = ["Test1", "Test2"];
    _.forEach(addItems, (item) => {
      const transaction = {
        type: TRANSACTION_TYPE.CREATE,
        value: item,
      };

      blockchain.addTransaction(transaction);
    });

    const updateTransaction = {
      type: TRANSACTION_TYPE.UPDATE,
      value: "Test10",
      newValue: "Test3",
    };
    blockchain.addTransaction(updateTransaction);
    expect(blockchain.state.length).to.equals(2);
    expect(blockchain.state[1]).to.equals("Test2");
    expect(blockchain.state[0]).to.equals("Test1");
  });

  it("Delete State", function () {
    const addItems = ["Test1", "Test2"];
    _.forEach(addItems, (item) => {
      const transaction = {
        type: TRANSACTION_TYPE.CREATE,
        value: item,
      };

      blockchain.addTransaction(transaction);
    });

    const updateTransaction = {
      type: TRANSACTION_TYPE.DELETE,
      value: "Test1",
    };
    blockchain.addTransaction(updateTransaction);
    expect(blockchain.state.length).to.equals(1);
    expect(blockchain.state[0]).to.equals("Test2");
  });

  it("Delete State that doesn't exist", function () {
    const addItems = ["Test1", "Test2"];
    _.forEach(addItems, (item) => {
      const transaction = {
        type: TRANSACTION_TYPE.CREATE,
        value: item,
      };

      blockchain.addTransaction(transaction);
    });

    const updateTransaction = {
      type: TRANSACTION_TYPE.DELETE,
      value: "Test4",
    };

    blockchain.addTransaction(updateTransaction);
    expect(blockchain.state.length).to.equals(2);
    expect(blockchain.state[0]).to.equals("Test1");
    expect(blockchain.state[1]).to.equals("Test2");
  });
});

import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import React from 'react';
import './App.css';
import Transaction from './components/Transaction';
import { doGet } from './utils/api';
import { endpoint, getTransactions, getState } from './utils/constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionCount: 5,
      transactionData: [],
      stateData: [],
    };
  }

  componentDidMount() {
    this.loadTransactionData();
  }

  handleChange = (event) => {
    this.setState({
      transactionCount: event.target.value,
    }, () => {
      this.loadTransactionData();
    });
  };

  async loadStateData() {
    const url = endpoint + getState;
    const data = await doGet(url);
    this.setState({
      stateData: data.state,
    });
  }

  async loadTransactionData() {
    const { transactionCount } = this.state;
    const url = endpoint + getTransactions + transactionCount;

    const data = await doGet(url);
    this.setState({
      transactionData: data.transactions,
    });
  }

  render() {
    const { transactionCount, transactionData } = this.state;
    return (

      <Grid>
        <Transaction type="UPDATE" value="APPLE SAUCE" />
        <Select
          native
          value={transactionCount}
          onChange={this.handleChange}
        >
          <option aria-label="None" value="" />
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </Select>

        {transactionData.map((tx, index) => (
          <Transaction
            type={tx.type}
            value={tx.value}
            newValue={tx.newValue}
          />
        ))}

      </Grid>
    );
  }
}

export default App;

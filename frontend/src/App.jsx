/* eslint-disable react/sort-comp */
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import React from 'react';
import './App.css';
import Input from './components/Input';
import State from './components/State';
import Transaction from './components/Transaction';
import { doGet, sendRequest } from './utils/api';
import { endpoint, getState, getTransactions } from './utils/constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionCount: 5,
      transactionData: [],
      stateData: [],
      newTask: '',
    };
  }

  /**
   * Loads state and transctions from server on page load.
   */
  componentDidMount() {
    this.load();
  }

  /**
   * Loads state and transctions from server.
   */
  load = () => {
    this.loadTransactionData();
    this.loadStateData();
  }

  /**
   * Change handler for transaction amount drop down.
   * @param {*} event
   */
  handleChange = (event) => {
    this.setState({
      transactionCount: event.target.value,
    }, () => {
      this.loadTransactionData();
    });
  };

  /**
   * Saves state information from server
   */
   loadStateData = async () => {
     const url = endpoint + getState;
     const data = await doGet(url);
     this.setState({
       stateData: data.state,
     });
   }

    loadTransactionData = async () => {
      const { transactionCount } = this.state;
      const url = endpoint + getTransactions + transactionCount;

      const data = await doGet(url);
      this.setState({
        transactionData: data.transactions,
      });
    }

    /**
     * Saves new task to state.
     * @param {*} event
     */
   createTaskOnChange = (event) => {
     this.setState({
       newTask: event.target.value,
     });
   }

   /**
    * Sends post request to create new state
    */
   createTask = async () => {
     const { newTask } = this.state;

     const data = {
       value: newTask,
     };
     await sendRequest(endpoint, data, 'POST');
     this.setState({
       newTask: '',
     });

     this.load();
   }

   /**
    * Renders page
    */
   render() {
     const {
       newTask, transactionCount, transactionData, stateData,
     } = this.state;
     return (

       <Grid>
         <Grid>
           <Input value={newTask} onChange={this.createTaskOnChange} />
           <Button onClick={this.createTask}>
             Create Task
           </Button>

         </Grid>
         <Grid
           container
           direction="row"
         >
           <Grid
             item
           >
             {stateData.map((state, index) => (
               <State value={state} reload={this.load} />
             ))}
           </Grid>

           <Grid
             item
           >
             {' Load Recent Transactions '}

             <Select
               native
               value={transactionCount}
               onChange={this.handleChange}
             >
               <option aria-label="None" value="Load Recent Transactions" />
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

         </Grid>

       </Grid>
     );
   }
}

export default App;

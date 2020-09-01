/* eslint-disable react/sort-comp */
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import React from 'react';
import './App.css';
import Transaction from './components/Transaction';
import Input from './components/Input';
import State from './components/State';
import { doGet, sendRequest } from './utils/api';
import { endpoint, getTransactions, getState } from './utils/constants';

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

  componentDidMount() {
    this.load();
  }

  load = () => {
    this.loadTransactionData();
    this.loadStateData();
  }

  handleChange = (event) => {
    this.setState({
      transactionCount: event.target.value,
    }, () => {
      this.loadTransactionData();
    });
  };

   loadStateData = async () => {
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

   createTaskOnChange = (event) => {
     this.setState({
       newTask: event.target.value,
     });
   }

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

   render() {
     const {
       newTask, transactionCount, transactionData, stateData,
     } = this.state;
     return (

       <Grid>
         <Input value={newTask} onChange={this.createTaskOnChange} />
         <Button onClick={this.createTask}>
           Create Task
         </Button>
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

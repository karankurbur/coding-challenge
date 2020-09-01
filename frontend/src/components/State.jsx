import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Button, Modal, Container,
} from '@material-ui/core';
import Input from './Input';
import { sendRequest } from '../utils/api';
import { endpoint } from '../utils/constants';

class StateComponent extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      open: false,
      newValue: value,
    };
  }

  onClick = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  edit = (event) => {
    this.setState({
      newValue: event.target.value,
    });
  }

  saveEdit = async () => {
    const { value, reload } = this.props;
    const { newValue } = this.state;

    const data = {
      value,
      newValue,
    };

    await sendRequest(endpoint, data, 'PATCH');
    this.setState({
      open: false,
    });
    reload();
  }

  delete = async () => {
    const { value, reload } = this.props;
    const data = {
      value,
    };

    await sendRequest(endpoint, data, 'DELETE');
    this.setState({
      open: false,
    });
    reload();
  }

  render() {
    const { value } = this.props;
    const { newValue } = this.state;

    const { open } = this.state;
    return (
      <Grid
        style={{
          border: '10px',
          borderColor: 'black',
          padding: '10px',
        }}

        container
        direction="row"
        justify="start"
        alignItems="center"
      >
        Task:
        {' '}
        {value}
        <Button onClick={this.onClick}>
          Edit
        </Button>
        <Button onClick={this.delete}>
          Delete
        </Button>

        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Container style={{
            backgroundColor: 'white',
            width: 350,
            marginTop: '40%',
            marginBottom: '40%',
          }}
          >
            <Input value={newValue} onChange={this.edit} />
            <Button onClick={this.saveEdit}> Edit </Button>
          </Container>
        </Modal>

      </Grid>
    );
  }
}

StateComponent.propTypes = {
  value: PropTypes.string.isRequired,
  reload: PropTypes.func.isRequired,
};

export default StateComponent;

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import React from 'react';
import { sendRequest } from '../utils/api';
import { endpoint } from '../utils/constants';
import Input from './Input';

class StateComponent extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      open: false,
      newValue: value,
    };
  }

  /**
   * Opens edit modal.
   */
  onClick = () => {
    this.setState({
      open: true,
    });
  };

  /**
   * Handles modal close.
   */
  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  /**
   * Handles edit new value.
   * @param {*} event
   */
  edit = (event) => {
    this.setState({
      newValue: event.target.value,
    });
  }

  /**
   * Sends change task request to server.
   */
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

  /**
   * Sends delete task request to server.
   */
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

  /**
   * Renders page
   */
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
        justify="center"
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

/* eslint-disable react/prop-types */
import React, { button } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import InputComponent from '../components/Input';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleClick = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    // this.props.history.push('/page2');
    const { value } = this.state;
    console.log(value);
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { buttonText, handleClick } = this.props;
    const { value } = this.state;
    return (
      <Container>
        <InputComponent onChange={this.onChange} value={value} />
        <Button variant="contained" type="button" onClick={this.handleClick}>
          Go to another page
        </Button>

      </Container>
    );
  }
}

Home.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default withRouter(Home);

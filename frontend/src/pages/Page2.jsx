import React, { button } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state1: true,

    };
  }

  render() {
    const { buttonText, handleClick } = this.props;
    return (
      <Button variant="contained" type="button" onClick={handleClick}>
        PAGE 2
      </Button>
    );
  }
}

Home.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Home;

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

class ButtonComponent extends React.PureComponent {
  render() {
    const { buttonText, handleClick } = this.props;
    return (
      <Button variant="contained" type="button" onClick={handleClick}>
        {buttonText}
      </Button>
    );
  }
}

ButtonComponent.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ButtonComponent;

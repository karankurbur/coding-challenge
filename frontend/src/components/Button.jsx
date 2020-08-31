import React, { button } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

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

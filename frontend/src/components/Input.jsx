import React, { button } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class InputComponent extends React.PureComponent {
  render() {
    const { value, onChange } = this.props;
    return (
      <TextField
        id="standard-basic"
        label="Standard"
        onChange={onChange}
        value={value}
      />
    );
  }
}

InputComponent.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputComponent;

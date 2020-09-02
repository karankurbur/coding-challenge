import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';

class InputComponent extends React.PureComponent {
  render() {
    const { value, onChange } = this.props;
    return (
      <TextField
        id="standard-basic"
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

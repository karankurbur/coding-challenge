import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

class TransactionComponent extends React.PureComponent {
  render() {
    const { type, value, newValue } = this.props;
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
        Transaction Type:
        {' '}
        {type}
        <br />
        Value:
        {' '}
        {value}
        <br />
        {
            newValue != null ? 'New Value:' : null
        }
        {
            newValue != null ? ` ${newValue}` : null
        }

      </Grid>
    );
  }
}

TransactionComponent.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  newValue: PropTypes.string,
};

export default TransactionComponent;

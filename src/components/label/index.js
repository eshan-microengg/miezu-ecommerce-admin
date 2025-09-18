import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types';

const Label = (props) => {
  const { label, isRequired } = props;

  return (
    <div>
      <Form.Label htmlFor="basic-url">
        {label} {isRequired && <span style={{ color: 'red' }}> *</span>}
      </Form.Label>
    </div>
  );
}

Label.propTypes = {
    label: PropTypes.string,
    isRequired: PropTypes.bool
}

export default Label;
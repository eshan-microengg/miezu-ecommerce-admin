import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const DropdownSelect = (props) => {
    const { options, onChange, name , isInvalid } = props;

    return (
        <div>
                    <Form.Select aria-label="Default select example" name={name} onChange={onChange} isInvalid={isInvalid}>
                        <option disabled>Select an option</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.VALUE}>
                                {option.LABEL}
                            </option>
                        ))}
                    </Form.Select>
        </div>
    )
}


DropdownSelect.propTypes = {
    name: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default DropdownSelect;
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const Input = (props) => {

  const { label, placeholder, type , textarea , disabled , name , value, onChange , isInvalid , style } = props;
  
  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control id="basic-url"
        style={style}
          aria-describedby="basic-addon3"
          name={name}
          value={value}
          as={textarea}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          isInvalid={isInvalid}
           />
      </InputGroup>
    </div>
  );
}
Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  textarea: PropTypes.string,
  disabled: PropTypes.bool,
}
Input.defaultProps = {
  disabled: false,
};

export default Input;
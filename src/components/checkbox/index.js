import Form from 'react-bootstrap/Form';

const Checkbox = (props) => {
    const { label, value, onChange, isInvalid, checked } = props;
    return (
        <>
            <Form.Check 
                type="checkbox"
                id={value}
                checked={checked}
                label={label}
                value={value}
                onChange={onChange}
                isInvalid={isInvalid}
            />
        </>
    );
}

export default Checkbox;
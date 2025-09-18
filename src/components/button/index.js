import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Button1 = (props) => {
    const { buttonValue, onClick , type } = props;
    const [isHovered, setIsHovered] = useState(false); 

    return (
        <>
            <Button
                variant="primary"
                type={type}
                style={{
                    backgroundColor: isHovered ? "rgb(0,118,190)" : "rgb(2,97,177)" , marginRight:"20px"
                }}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}  
                onMouseLeave={() => setIsHovered(false)} 
            >
                {buttonValue}
            </Button>
        </>
    );
}

Button1.propTypes = {
    buttonValue: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button1;
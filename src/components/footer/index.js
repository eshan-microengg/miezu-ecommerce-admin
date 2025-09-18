import React from 'react';
import './style.scss'
import PropTypes from 'prop-types'

const Footer = (props) => {
    const { buttonTitle1, buttonTitle2, onClick, onSubmit } = props
    return (
        <div className='buttons'>
            <button type="button" className="submitButton" onClick={onClick}>{buttonTitle1}</button>
            <button type="submit" className="submitButton" onClick={onSubmit}>{buttonTitle2}</button>
        </div>

    );
}

Footer.propTypes = {
    buttonTitle1: PropTypes.string,
    buttonTitle2: PropTypes.string,
    onClick: PropTypes.func,

    onSubmit: PropTypes.func
}

export default Footer;
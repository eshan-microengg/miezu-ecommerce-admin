import React, { useState } from 'react'
import Button1 from '../../components/button'
import Input from '../../components/input'
import './style.scss'
import { useNavigate } from 'react-router'
import { BASE_URL, LOGIN_PAGE } from '../../const'
import Label from '../../components/label'
import { toast } from 'react-toastify'
import axios from 'axios'
import ToastNotification, { showToast } from '../../components/toastify'

const LoginPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });
    const [loginFormErrors, setLoginFormErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value,
        });
        setLoginFormErrors({
            ...loginFormErrors,
            [event.target.name]: null,
        });
    };

    const handleValidation = () => {
        const regText = /[A-Za-z]/;
        const { email, password } = loginForm;
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Please Enter Email';
        } else if (email && !regText.test(email)) {
            newErrors.email = 'Email should be text';
        } else if (email && email.length > 50) {
            newErrors.email = 'Email should be below 50 Characters';
        }

        if (!password) {
            newErrors.password = 'Please Enter Password';
        } else if (password && password.length > 50) {
            newErrors.password = 'Password should be below 50 Characters';
        }

        return newErrors;
    };


    const handleSubmit = async () => {
        const handleValidationObject = handleValidation();

        if (Object.keys(handleValidationObject).length > 0) {
            setLoginFormErrors(handleValidationObject);
        } else {
            setLoader(true);

            try {
                const response = await axios.post(
                    `${BASE_URL}/user/login`,
                    {
                        email: loginForm.email,
                        password: loginForm.password,
                        user_type: "admin"
                    }
                );

                if (response.status === 200) {
                    const { token, data } = response.data;

                    sessionStorage.setItem('adminToken', token);
                    sessionStorage.setItem('data', JSON.stringify(data));
                    showToast(`Login Successful`, 'success');
                    setTimeout(() => {
                        navigate('/homepage')
                    }, 1000);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    showToast('Invalid Email or Password', 'error');
                } else {
                    showToast('An Error Occurred. Please Try Again.', 'error');
                }
            } finally {
                setLoader(false);
            }
        }
    };
    return (
        <div className="main-container">
            <div className="blue-sections">
                <div className="text-centre">
                    <h1 className="header1">{LOGIN_PAGE.HEADING}</h1>
                    <p className="subheader">{LOGIN_PAGE.SUB_HEADING}</p>
                </div>
            </div>
            <div className="whiteSection">
                <div className="formContainer">
                    <h2 className="title"><img src={LOGIN_PAGE.BRAND_IMAGE} height="30px" /></h2>
                    <div style={{ marginBottom: "30px" }}>
                        <Label label={LOGIN_PAGE.LOGIN_FORM.USERNAME.LABEL} />
                        <Input
                            name="email"
                            value={loginForm.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            type="email" />
                        <div className='text-danger'>{loginFormErrors.email}</div>
                    </div>
                    <div style={{ marginBottom: "40px" }}>
                        <Label label={LOGIN_PAGE.LOGIN_FORM.PASSWORD.LABEL} />
                        <Input
                            name="password"
                            value={loginForm.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            type="password" />
                        <div className='text-danger'>{loginFormErrors.password}</div>
                    </div>
                    <Button1
                        buttonValue={LOGIN_PAGE.LOGIN_FORM.BUTTON.NAME} onClick={handleSubmit} />
                </div>
            </div>
            <ToastNotification />
        </div>

    )
}

export default LoginPage

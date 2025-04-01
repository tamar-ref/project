import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Links from "../Links";
import './PersonalArea.css'

export default function SignIn({ setUser }) {
    const [showAlert, setShowAlert] = useState(false);
    const alertRef = useRef(null);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const [role, setRole] = useState(0);
    const manager = 1
    const someUser = 0

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await axios.get(`${Links.users}/`);
            if (!users.data || users.data.length === 0) {
                setRole(manager);
            }
            else {
                setRole(someUser);
            }
        };
        fetchUsers();
    }, [manager, someUser, Links.users]);

    const validateForm = async () => {
        const errors = {};
        if (name.length < 2) {
            errors.name = "השם צריך להיות לפחות 2 תוויים";
        } else if (name === 'אנונימי') {
            errors.name = 'שם לא תקין';
        }
        try {
            const response = await axios.get(`${Links.users}/${userName}`);
            if (response.data) {
                errors.userName = 'שם משתמש תפוס';
            }
        } catch (error) {
            if (error.response && error.response.status !== 404) {
                console.error("שגיאה בבדיקת שם משתמש:", error);
            }
        }
        if (userName.length < 2) {
            errors.userName = "שם המשתמש צריך להיות לפחות 2 תוויים";
        }
        if (password.length < 4) {
            errors.password = "הסיסמה צריכה להיות לפחות 4 תוויים";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleButtonClick = async () => {
        if (!(await validateForm())) {
            return;
        }

        setShowAlert(true);

        const userData = { userName, name, password, role };

        try {
            let url = Links.users;
            let result = await axios.post(url, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            setError(err);
        }
        setUser(userData)
    };

    const handleCloseAlert = () => {
        if (alertRef.current) {
            alertRef.current.style.transition = 'top 0.3s ease-out';
            alertRef.current.style.top = '-100px';
            setTimeout(() => {
                setShowAlert(false);
            }, 300);
            navigate('/');
        }
    };

    useEffect(() => {
        if (showAlert && alertRef.current) {
            requestAnimationFrame(() => {
                alertRef.current.style.transition = 'top 0.3s ease-out';
                alertRef.current.style.top = '16px';
            });
        }
    }, [showAlert]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                className="signin-box"
            >
                <TextField
                    id="outlined-basic"
                    label="שם"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(validationErrors.name)}
                    helperText={validationErrors.name}
                />
                <TextField
                    id="outlined-basic"
                    label="שם משתמש"
                    variant="outlined"
                    onChange={(e) => setUserName(e.target.value)}
                    error={Boolean(validationErrors.userName)}
                    helperText={validationErrors.userName}
                />
                <TextField
                    id="outlined-basic"
                    label="סיסמא"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(validationErrors.password)}
                    helperText={validationErrors.password}
                />
            </Box>
            <Button className="signin-button" variant="contained" disableElevation onClick={handleButtonClick}>
                הרשמה
            </Button>
            {showAlert && (
                <Alert
                    ref={alertRef}
                    severity="success"
                    className="alert-slide-in"
                    action={
                        <Button color="inherit" size="small" onClick={handleCloseAlert}>
                            אישור
                        </Button>
                    }
                >
                    <Typography component="div" dangerouslySetInnerHTML={{
                        __html: `הרשמה בוצעה בהצלחה<br /><b>שם:</b> ${name}<br /><b>שם משתמש</b>: ${userName}<br /><b>סיסמה:</b> ${password}<br />`
                    }} />
                </Alert>
            )}
        </>
    );
}
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

export default function UpdateDetails({ user, setUser}) {
    const [showAlert, setShowAlert] = useState(false);
    const alertRef = useRef(null);
    const [newName, setName] = useState(user.name ? user.name : user.result.name);
    const [newUserName, setUserName] = useState(user.userName ? user.userName : user.result.userName);
    const [newPassword, setPassword] = useState(user.password ? user.password : user.result.password);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = async () => {
        const errors = {};
        if (newName.length < 2) {
            errors.name = "השם צריך להיות לפחות 2 תוויים";
        } else if (newName === 'אנונימי') {
            errors.name = 'שם לא תקין';
        }
        try {
            const response = await axios.get(`${Links.users}/${newUserName}`);
            if (response.data && newUserName !== (user.userName ? user.userName : user.result.userName)) {
                errors.userName = 'שם משתמש תפוס';
            }
        } catch (error) {
            if (error.response && error.response.status !== 404) {
                console.error("שגיאה בבדיקת שם משתמש:", error);
            }
        }
        if (newUserName.length < 2) {
            errors.userName = "שם המשתמש צריך להיות לפחות 2 תוויים";
        }
        if (newPassword.length < 4) {
            errors.password = "הסיסמה צריכה להיות לפחות 4 תוויים";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleButtonClick = async () => {
        if (!(await validateForm())) {
            return;
        }
        try {
            const userData = {
                name: newName,
                userName: newUserName,
                password: newPassword,
            };

            let url = `${Links.users}/${user.userName ? user.userName : user.result.userName}`;  // שימוש בקישור מתוך האובייקט Links
            const response = await axios.put(url, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setShowAlert(true);
        } catch (error) {
            console.error("שגיאה בעדכון משתמש:", error);
        }
    };

    const handleCloseAlert = () => {
        if (alertRef.current) {
            alertRef.current.style.transition = 'top 0.3s ease-out';
            alertRef.current.style.top = '-100px';
            setTimeout(() => {
                setShowAlert(false);
            }, 300);
            setTimeout(() => {
                navigate('/');
            }, 300);
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
                    placeholder={user.name ? user.name : user.result.name}
                    error={Boolean(validationErrors.name)}
                    helperText={validationErrors.name}
                />
                <TextField
                    id="outlined-basic"
                    label="שם משתמש"
                    variant="outlined"
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={user.userName ? user.userName : user.result.userName}
                    error={Boolean(validationErrors.userName)}
                    helperText={validationErrors.userName}
                />
                <TextField
                    id="outlined-basic"
                    label="סיסמא"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={user.password ? user.password : user.result.password}
                    error={Boolean(validationErrors.password)}
                    helperText={validationErrors.password}
                />
            </Box>
            <Button className="signin-button" variant="contained" disableElevation onClick={handleButtonClick}>
                עדכון
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
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: `עדכון פרטים בוצע בהצלחה<br /><b>שם:</b> ${newName}<br /><b>שם משתמש</b>: ${newUserName}<br /><b>סיסמה:</b> ${newPassword}<br />` }} />
                </Alert>
            )}
        </>
    );
}
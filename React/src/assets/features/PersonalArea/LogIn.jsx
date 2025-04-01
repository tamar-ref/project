import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Links from "../Links";
import './PersonalArea.css';

export default function LogIn({ setUser }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        try {
            const response = await axios.get(`${Links.users}/${userName}`);
            const userData = response.data;

            if (!userData) {
                setValidationErrors({ userName: 'שם משתמש לא קיים' });
                return;
            }

            if (userData.password !== password) {
                setValidationErrors({ password: 'סיסמא לא נכונה' });
                return;
            }
            setResult(userData);
            setUser({ result: userData });
            navigate('/');
        } catch (error) {
            console.error("שגיאה בגישה לשרת:", error);
            setValidationErrors({ userName: 'שם משתמש לא קיים' });
        }
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
                    type="password"
                />
            </Box>
            <Button className="signin-button" variant="contained" disableElevation onClick={handleButtonClick}>
                התחברות
            </Button>
        </>
    );
}

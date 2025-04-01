import React, { useState, useEffect, useRef, use } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import './Onclick.css';

export default function Onclick({ user, onClose, setUser }) {
    const divRef = useRef(null);
    const [showAlert, setShowAlert] = useState(false);
    const alertRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (showAlert && alertRef.current && !alertRef.current.contains(event.target)) {
                handleCloseAlert();
            } else if (!showAlert && divRef.current && !divRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [divRef, onClose, showAlert]);

    useEffect(() => {
        if (showAlert && alertRef.current) {
            requestAnimationFrame(() => {
                alertRef.current.style.transition = 'top 0.3s ease-out';
                alertRef.current.style.top = '16px';
            });
        }
    }, [showAlert]);

    const goToLogIn = () => {
        navigate('/logIn');
    }
    const goToSignIn = () => {
        navigate('/signIn');
    }
    const goToMyRecipes = () => {
        navigate('/myRecipes');
    };
    const goToUpdateDetails = () => {
        navigate('/updateDetails');
    }

    const handleButtonClick = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        if (alertRef.current) {
            alertRef.current.style.transition = 'top 0.3s ease-out';
            alertRef.current.style.top = '-100px';
            setTimeout(() => {
                setShowAlert(false);
                onClose();
            }, 300);
        }
    };

    const handleLogOut = () => {
        const loggedOutUser = { userName: '', name: 'אנונימי', password: '' };
        setUser(loggedOutUser);
        localStorage.setItem('user', JSON.stringify(loggedOutUser));
        navigate('/');
    };

    const handleConfirmLogOut = () => {
        handleCloseAlert();
        handleLogOut();
    }

    if (user.name === 'אנונימי' || user.name == '') {
        return (
            <div className="click" id="click2" ref={divRef}>
                <p></p>
                <button onClick={goToLogIn} className="slideButton">התחברות</button><br /><br />
                <button onClick={goToSignIn} className="slideButton">הרשמה</button>
            </div>
        );
    }

    return (
        <>
            <div className="click" ref={divRef}>
                <p><b>{user.name ? user.name : user.result.name}</b></p>
                <p>{user.userName ? user.userName : user.result.userName}</p>
                <button onClick={goToMyRecipes} className="slideButton">המתכונים שלי</button><br /><br />
                <button onClick={goToUpdateDetails} className="slideButton">עדכון פרטים אישיים</button><br /><br />
                <button onClick={handleButtonClick} className="slideButton">התנתקות</button><br /><br />
            </div>
            {showAlert && (
                <Alert
                    ref={alertRef}
                    severity="warning"
                    className="alert-slide-in"
                    action={
                        < Button color="inherit" size="small" onClick={handleConfirmLogOut}>
                            אישור
                        </Button>
                    }
                >
                    האם אתה בטוח שאתה רוצה להתנתק מחשבונך?
                </Alert >
            )}
        </>
    );
}

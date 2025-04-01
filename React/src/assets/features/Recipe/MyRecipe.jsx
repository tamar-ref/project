import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import './Recipe.css'
import Links from "../Links";
import Profile from "../Profile/Profile";
import { useNavigate } from "react-router-dom";

export default function MyRecipe({ user, setUser, recipe }) {
    const [showAlert, setShowAlert] = useState(false);
    const alertRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (showAlert && alertRef.current) {
            requestAnimationFrame(() => {
                alertRef.current.style.transition = 'top 0.3s ease-out';
                alertRef.current.style.top = '16px';
            });
        }
    }, [showAlert]);

    const handleButtonClick = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = async () => {
        const response = await axios.get(Links.recipes);
        const recipes = response.data;
        const recipeFromLocalStorage = JSON.parse(localStorage.getItem('recipe'))
        await axios.delete(`${Links.recipes}/${recipeFromLocalStorage.id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (alertRef.current) {
            alertRef.current.style.transition = 'top 0.3s ease-out';
            alertRef.current.style.top = '-100px';
            setTimeout(() => {
                setShowAlert(false);
            }, 300);
        }
    };

    const deleteThis = () => {
        handleCloseAlert();
        setTimeout(() => {
            navigate('/myRecipes');
        }, 300);
    }

    return (
        <>
            <Profile user={user} setUser={setUser} />
            <div className="icons">
                <DeleteIcon
                    onClick={handleButtonClick}
                    style={{
                        color: 'rgba(0, 0, 0, 0.658)',
                        fontSize: '40px',
                        margin: '20px'
                    }}
                />
                <CreateIcon
                    onClick={() => navigate('./updateRecipe')}
                    style={{
                        color: 'rgba(0, 0, 0, 0.658)',
                        fontSize: '40px',
                        margin: '20px'
                    }}
                />
            </div>
            <div id="recipe">
                <h2 id="header">{recipe.name}</h2>
                <p id="userName">הועלה על ידי {recipe.userName}</p>
                <div>
                    {recipe.category}
                    {recipe.recipeType}
                    {recipe.methods}
                </div>
                <div>
                    <h3 className="title">מצרכים</h3>
                    <hr />
                    {/*< div id="recipes">
                        {arrIngredients.map((i) => {
                            if (!i || !i.name || i.userName != user.result.userName) {
                                return null;
                            }
                            return (
                                <div key={i.id} className="recipe" onClick={() => goToRecipe(i)}>
                                    <div className="recipe-content">
                                        <img id="img" src={i.image || ''} alt={i.name} />
                                        <div className="recipe-info">
                                            <div>{i.name}</div>
                                            <div id="user">הועלה על ידי {i.userName}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>*/}
                </div>
                <div>
                    <h3 className="title">אופן הכנה</h3>
                    <hr />
                    {recipe.description}
                </div>
            </div >
            {showAlert && (
                <Alert
                    ref={alertRef}
                    severity="warning"
                    className="alert-slide-in"
                    action={
                        < Button color="inherit" size="small" onClick={deleteThis}>
                            אישור
                        </Button>
                    }
                >
                    האם אתה בטוח שאתה רוצה למחוק את המתכון?
                </Alert >
            )}
        </>
    )
}
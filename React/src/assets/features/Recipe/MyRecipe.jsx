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
    const [arrIngredients, setArrIngredients] = useState([]);

    const goToServer = async () => {
        const result = await axios.get(Links.recipesIngredients);
        setArrIngredients(result.data);
    };

    useEffect(() => {
        goToServer();
    }, [recipe]);

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
            <h1>{recipe.name}</h1>
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
                    onClick={() => navigate('/updateRecipe')}
                    style={{
                        color: 'rgba(0, 0, 0, 0.658)',
                        fontSize: '40px',
                        margin: '20px'
                    }}
                />
            </div>
            <div id="recipe">
                <p id="userName">הועלה על ידי {recipe.userName}</p>
                <div id="recipeDetails">
                    <div className="recipeDetail">
                        <strong>קטגוריה:</strong> {recipe.category === 0 ? "עיקריות" :
                            recipe.category === 1 ? "תוספות" :
                                recipe.category === 2 ? "קינוחים" :
                                    recipe.category === 3 ? "סלטים" :
                                        recipe.category === 4 ? "מרקים" :
                                            recipe.category === 5 ? "משקאות" :
                                                "אחר"}
                    </div>
                    <div className="recipeDetail">
                        <strong>סוג מתכון:</strong> {recipe.recipeType === 0 ? "בשרי" : recipe.recipeType === 1 ? "חלבי" : "פרווה"}
                        <div>{recipe.methods}</div>
                    </div>
                </div>
                <div>
                    <h3 className="title">מצרכים</h3>
                    <hr />
                    <ul>
                        {arrIngredients.map((ingredient, index) => (
                            ingredient.recipeId === recipe.id && (
                                <li key={index} id="c">
                                    {ingredient.amount && `  ${ingredient.amount}`} {ingredient.ingredientName}
                                </li>
                            )
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="title">אופן הכנה</h3>
                    <hr />
                    <pre>{recipe.description}</pre>
                </div>
            </div>
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
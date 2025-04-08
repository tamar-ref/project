import React, { useState, useEffect } from "react";
import axios from "axios";
import './Recipe.css';
import Links from "../Links";
import Profile from "../Profile/Profile";

export default function Recipe({ user, setUser, recipe }) {
    const [arrIngredients, setArrIngredients] = useState([]);

    const goToServer = async () => {
        const result = await axios.get(Links.recipesIngredients);
        setArrIngredients(result.data);
    };

    useEffect(() => {
        goToServer();
    }, [recipe]);

    return (
        <div id="divRecipe">
            <Profile user={user} setUser={setUser} />
            <h1>{recipe.name}</h1>
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
                    </div>
                    <div>{recipe.methods}</div><br />
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
                </div><br />
                <div>
                    <h3 className="title">אופן הכנה</h3>
                    <hr />
                    <pre>{recipe.description}</pre>
                </div>
            </div>
        </div>
    );
}

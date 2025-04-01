import React, { useState, useEffect } from "react";
import axios from "axios";
import './Recipe.css';
import Links from "../Links";
import Profile from "../Profile/Profile";

export default function Recipe({ user, setUser, recipe }) {
    const [arrIngredients, setArrIngredients] = useState([]);

    const goToServer = async () => {
        let result = await axios.get(Links.recipesIngredients);
        setArrIngredients(result.data);
    };

    useEffect(() => {
        goToServer();
    }, []);

    return (
        <>
            <Profile user={user} setUser={setUser} />
            <div id="recipe">
                <h1 id="header">{recipe.name}</h1>
                <p id="userName">הועלה על ידי {recipe.userName}</p>
                <div id="methods">
                    {recipe.category}
                    {recipe.recipeType}
                    {recipe.methods}
                </div>
                <div>
                    <h3 className="title">מצרכים</h3>
                    <hr />
                    <ul>
                        {arrIngredients.map((ingredient, index) => (
                            <li key={index} id="c">{ingredient.name}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="title">אופן הכנה</h3>
                    <hr />
                    {recipe.description}
                </div>
            </div>
        </>
    );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Profile from "../Profile/Profile";
import Links from "../Links";
import './Recipes.css';

export default function MyRecipes({ user, setUser, setRecipe }) {
    const [recipes, setRecipes] = useState([]); // כל המתכונים (גם אחרי סינון)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // ערך החיפוש של המתכון
    const navigate = useNavigate();

    const goToServer = async () => {
        try {
            let result = await axios.get(Links.recipes);
            setRecipes(result.data); // עדכון המתכונים אחרי טעינה
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const goToRecipe = (recipe) => {
        setRecipe(recipe);
        navigate('/myrecipe');
    };

    const goToFilter = () => {
        navigate('/filter')
    }

    const goToAddRecipe = () => {
        navigate('/instructions')
    }

    const goToRecipes = () => {
        navigate('/')
    }

    const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) // סינון בזמן אמת
    );

    useEffect(() => {
        goToServer();
    }, []);

    if (loading) {
        return <CircularProgress size="3rem" sx={{ color: 'mediumpurple' }} />;
    }

    if (error) {
        return <div id="error">Error: {error.message}</div>;
    }

    return (
        <>
            <Profile user={user} setUser={setUser} />
            <div id="help">
                <Button className="filter-button" variant="contained" disableElevation onClick={goToRecipes}>
                    לכל המתכונים
                </Button>
                <Button className="filter-button" variant="contained" disableElevation onClick={goToFilter}>
                    סינון
                </Button>
                <Button className="filter-button" variant="contained" disableElevation onClick={goToAddRecipe}>
                    הוסף מתכון
                </Button>
                <TextField
                    id="outlined-basic"
                    label="חפש מתכון"
                    variant="outlined"
                    className="searching"
                    value={searchQuery} // שומר את הערך בתיבת הקלט
                    onChange={handleSearchQueryChange} // מחפש לפי מה שמוזן
                />
            </div>

            <div id="recipes">
                {filteredRecipes.length === 0 && <div id="no-results">לא נמצאו תוצאות</div>}
                {filteredRecipes.map((i) => {
                    if (!i || !i.name || i.userName != user.result?.userName) {
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
            </div>
        </>
    );
}

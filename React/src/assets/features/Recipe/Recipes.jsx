import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Profile from "../Profile/Profile";
import Links from '../Links'
import './Recipes.css';

export default function Recipes({ user, setUser, setRecipe }) {
    const [arrRecipes, setArrRecipes] = useState([]); // כל המתכונים
    const [filteredRecipes, setFilteredRecipes] = useState([]); // מתכונים אחרי סינון
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // ערך החיפוש של המתכון
    const [searchUserQuery, setSearchUserQuery] = useState(""); // ערך החיפוש של המשתמש
    const navigate = useNavigate();

    const goToServer = async () => {
        try {
            let result = await axios.get(Links.recipes);
            setArrRecipes(result.data);
            setFilteredRecipes(result.data); // בהתחלה, כל המתכונים מוצגים
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const goToRecipe = (recipe) => {
        setRecipe(recipe);
        navigate('/recipe');
    };

    const goToFilter = () => {
        navigate('/filter')
    }

    const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterRecipes(query, searchUserQuery); // סינון על פי המתכון
    };

    const handleSearchUserQueryChange = (event) => {
        const query = event.target.value;
        setSearchUserQuery(query);
        filterRecipes(searchQuery, query); // סינון על פי המשתמש
    };

    const filterRecipes = (query, userQuery) => {
        let filtered = arrRecipes;

        // סינון על פי שם המתכון
        if (query) {
            filtered = filtered.filter((recipe) =>
                recipe.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        // סינון על פי שם המשתמש
        if (userQuery) {
            filtered = filtered.filter((recipe) =>
                recipe.userName.toLowerCase().includes(userQuery.toLowerCase())
            );
        }

        setFilteredRecipes(filtered);
    };

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
                <Button className="filter-button" variant="contained" disableElevation onClick={goToFilter}>
                    סינון
                </Button>
                <TextField
                    id="outlined-basic"
                    label="חפש משתמש"
                    variant="outlined"
                    className="searching"
                    value={searchUserQuery} // שומר את ערך החיפוש של המשתמש
                    onChange={handleSearchUserQueryChange} // מחפש לפי מה שמוזן
                />
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
                    if (!i || !i.name) {
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

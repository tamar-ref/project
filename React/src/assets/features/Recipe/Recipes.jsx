import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Profile from "../Profile/Profile";
import Links from '../Links';
import './Recipes.css';

export default function Recipes({ user, setUser, setRecipe, filters, setFilters }) {
    const [arrRecipes, setArrRecipes] = useState([]); // כל המתכונים
    const [filteredRecipes, setFilteredRecipes] = useState([]); // מתכונים אחרי סינון
    const [loading, setLoading] = useState(true);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // ערך החיפוש של המתכון
    const [searchUserQuery, setSearchUserQuery] = useState(""); // ערך החיפוש של המשתמש
    const navigate = useNavigate();
    const location = useLocation();
    const [combinedData, setCombinedData] = useState([]);

    // אם יש פילטרים שנשלחו מעמוד ה-Filter, נעדכן את ה-state
    useEffect(() => {
        if (location.state && location.state.filters) {
            setFilters(location.state.filters);
        }
    }, [location.state, setFilters]);

    useEffect(() => {
        const getRecipeIngredients = async () => {
            try {
                const result = await axios.get(Links.recipesIngredients);
                setRecipeIngredients(result.data);
            } catch (error) {
                console.error("Error fetching recipe ingredients:", error);
            }
        };

        getRecipeIngredients();
    }, []);

    useEffect(() => {
        if (arrRecipes.length > 0 && recipeIngredients.length > 0) {
            const combined = arrRecipes.map(recipe => {
                const ingredients = recipeIngredients
                    .filter(ingredient => ingredient.recipeId === recipe.id)
                    .map(ingredient => ingredient.ingredientName);
                return { recipeId: recipe.id, ingredients };
            });
            setCombinedData(combined);
        }
    }, [arrRecipes, recipeIngredients]);

    // גישה למתכונים מהשרת
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
        navigate('/filter'); // מפנה לעמוד הסינונים
    };

    const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterRecipes(query, searchUserQuery); // קוראים לפונקציה עם הערך החדש
    };

    const handleSearchUserQueryChange = (event) => {
        const query = event.target.value;
        setSearchUserQuery(query);
        filterRecipes(searchQuery, query); // קוראים לפונקציה עם הערך החדש
    };

    const filterRecipes = (query, userQuery) => {
        let filtered = arrRecipes;
        // סינון לפי שם המתכון אם יש חיפוש
        if (query) {
            filtered = filtered.filter((recipe) =>
                recipe.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        // סינון לפי שם המשתמש אם יש חיפוש
        if (userQuery) {
            filtered = filtered.filter((recipe) =>
                recipe.userName.toLowerCase().includes(userQuery.toLowerCase())
            );
        }

        // סינון לפי פילטרים נוספים
        if (filters.categories.length > 0) {
            filtered = filtered.filter(recipe =>
                filters.categories.includes(recipe.category)
            );
        }
        if (filters.types.length > 0) {
            filtered = filtered.filter(recipe =>
                filters.types.includes(recipe.recipeType)
            );
        }
        if (filters.methods.length > 0) {
            filtered = filtered.filter(recipe => {
                const recipeMethods = recipe.methods ? recipe.methods.split(' ') : [];
                return !filters.methods.some(method => recipeMethods.includes(method));
            });
        }
        if (filters.noIngredients.length > 0) {
            const found = combinedData.filter(subArray =>
                filters.noIngredients.some(ing => subArray.ingredients && subArray.ingredients.includes(ing))
            );
            filtered = filtered.filter(item1 =>
                !found.some(item2 => item2.recipeId == item1.id)
            );
        }
        if (filters.yesIngredients.length > 0) {
            const found = combinedData.filter(subArray =>
                filters.yesIngredients.every(ing => subArray.ingredients && subArray.ingredients.includes(ing))
            );
            var arr = []
            found.forEach(element1 => {
                filtered.forEach(element2 => {
                    if (element1.recipeId == element2.id) {
                        arr.push(element2)
                    }
                });
            });
            filtered = arr;
        }

        setFilteredRecipes(filtered);
    };

    useEffect(() => {
        goToServer();
    }, []);

    useEffect(() => {
        let filtered = arrRecipes;

        // סינון על פי הפילטרים
        if (filters.categories.length > 0) {
            filtered = filtered.filter(recipe =>
                filters.categories.includes(recipe.category)
            );
        }

        if (filters.types.length > 0) {
            filtered = filtered.filter(recipe =>
                filters.types.includes(recipe.recipeType)
            );
        }

        if (filters.methods.length > 0) {
            filtered = filtered.filter(recipe => {
                // אם recipe.methods הוא null או undefined, נחזיר מערך ריק
                const recipeMethods = recipe.methods ? recipe.methods.split(' ') : [];

                // אם המתכון מכיל אחת מהשיטות שנבחרו, הוא לא יופיע בתוצאות
                return !filters.methods.some(method => recipeMethods.includes(method));
            });
        }

        if (filters.noIngredients.length > 0) {
            const found = combinedData.filter(subArray =>
                filters.noIngredients.some(ing => subArray.ingredients && subArray.ingredients.includes(ing))
            );
            filtered = filtered.filter(item1 =>
                !found.some(item2 => item2.recipeId == item1.id)
            );
        }
        if (filters.yesIngredients.length > 0) {
            const found = combinedData.filter(subArray =>
                filters.yesIngredients.every(ing => subArray.ingredients && subArray.ingredients.includes(ing))
            );
            var arr = []
            found.forEach(element1 => {
                filtered.forEach(element2 => {
                    if (element1.recipeId == element2.id) {
                        arr.push(element2)
                    }
                });
            });
            filtered = arr;
        }

        setFilteredRecipes(filtered);
    }, [arrRecipes, filters]);

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
                {/* כפתור סינון */}
                <Button className="filter-button" variant="contained" disableElevation onClick={goToFilter}>
                    סינון
                </Button>
                <TextField
                    id="outlined-basic"
                    label="חפש משתמש"
                    variant="outlined"
                    className="searching"
                    value={searchUserQuery}
                    onChange={handleSearchUserQueryChange}
                />
                <TextField
                    id="outlined-basic"
                    label="חפש מתכון"
                    variant="outlined"
                    className="searching"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />
            </div>

            <div id="recipes">
                {filteredRecipes.length === 0 && <div id="no-results">לא נמצאו תוצאות</div>}
                {filteredRecipes.map((i) => (
                    <div key={i.id} className="recipe" onClick={() => goToRecipe(i)}>
                        <div className="recipe-content">
                            <img id="img" src={i.image || ''} alt={i.name} />
                            <div className="recipe-info">
                                <div>{i.name}</div>
                                <div>{i.recipeType === 0 ? "בשרי" : i.recipeType === 1 ? "חלבי" : "פרווה"}</div>
                                <div>{i.category === 0 ? "עיקריות" : i.category === 1 ? "תוספות" : i.category === 2 ? "קינוחים" : i.category === 3 ? "סלטים" : i.category === 4 ? "מרקים" : i.category === 5 ? "משקאות" : "אחר"}</div>
                                <div id="user">הועלה על ידי {i.userName}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

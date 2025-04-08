import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Links from '../Links';
import './Filter.css';

export default function Filter({ filters, setFilters }) {
    const [showAlert, setShowAlert] = useState(false);
    const alertRef = useRef(null);
    const [ingredients, setIngredients] = useState([]);
    const [recipesIngredients, setRecipesIngredients] = useState([]);
    const [recipeTypes, setRecipeTypes] = useState([
        { id: 0, text: 'בשרי' },
        { id: 1, text: 'חלבי' },
        { id: 2, text: 'פרווה' },
    ]);
    const [categories, setCategories] = useState([
        { id: 0, text: 'עיקריות' },
        { id: 1, text: 'תוספות' },
        { id: 2, text: 'קינוחים' },
        { id: 3, text: 'סלטים' },
        { id: 4, text: 'מרקים' },
        { id: 5, text: 'משקאות' },
        { id: 6, text: 'אחר' },
    ]);
    const [methods, setMethods] = useState([
        { id: 0, text: 'בישול' },
        { id: 1, text: 'אפיה' },
        { id: 2, text: 'טיגון' },
        { id: 3, text: 'הקצפה' },
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        setShowAlert(false);
        axios.get(Links.ingredients)
            .then((response) => {
                setIngredients(response.data);
            })
            .catch((error) => {
                console.error("Error fetching ingredients:", error);
            });
        axios.get(Links.recipesIngredients)
            .then((response) => {
                setRecipesIngredients(response.data);
            })
            .catch((error) => {
                console.error("Error fetching ingredients:", error);
            });
    }, []);

    useEffect(() => {
        if (showAlert && alertRef.current) {
            requestAnimationFrame(() => {
                alertRef.current.style.transition = 'top 0.3s ease-out';
                alertRef.current.style.top = '16px';
            });
        }
    }, [showAlert]);

    const handleCloseAlert = () => {
        if (alertRef.current) {
            alertRef.current.style.transition = 'top 0.3s ease-out';
            alertRef.current.style.top = '-100px';
            setTimeout(() => {
                setShowAlert(false);
            }, 300);
        }
    };

    const handleRecipeTypeChange = (event, newValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            types: newValue.map((item) => item.id),
        }));
    };

    const handleCategoryChange = (event, newValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            categories: newValue.map((item) => item.id),
        }));
    };

    const handleMethodChange = (event, newValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            methods: newValue.map((item) => item.text),
        }));
    };

    const handleIngredientChange = (event, newValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            yesIngredients: newValue.map((item) => item.name),
        }));
    };

    const handleExcludedIngredientChange = (event, newValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            noIngredients: newValue.map((item) => item.name),
        }));
    };

    const handleApplyFilters = () => {
        const hasCommonString = filters.noIngredients.some(ing => filters.yesIngredients.includes(ing));
        if (hasCommonString) {
            setShowAlert(true);
        }
        else {
            navigate('/', { state: { filters } });
        }
    };

    return (
        <>
            <div className="filter-container">
                <div className="filter-columns">
                    {/* עמודה עם סימן ✔ */}
                    <div className="filter-column">
                        <h2>✔</h2>
                        <Autocomplete
                            multiple
                            id="recipe-type-dropdown"
                            options={recipeTypes}
                            getOptionLabel={(option) => option.text}
                            value={recipeTypes.filter((type) => filters.types.includes(type.id))}
                            onChange={handleRecipeTypeChange}
                            renderInput={(params) => <TextField {...params} label="סוג מאכל" />}
                            className="searching"
                        />
                        <Autocomplete
                            multiple
                            id="category-dropdown"
                            options={categories}
                            getOptionLabel={(option) => option.text}
                            value={categories.filter((category) => filters.categories.includes(category.id))}
                            onChange={handleCategoryChange}
                            renderInput={(params) => <TextField {...params} label="קטגוריה" />}
                            className="searching"
                        />
                        <Autocomplete
                            multiple
                            id="show"
                            options={ingredients}
                            getOptionLabel={(option) => option.name}
                            value={ingredients.filter((yes) => filters.yesIngredients.includes(yes.name))}
                            onChange={handleIngredientChange}
                            renderInput={(params) => <TextField {...params} label="מוצר" />}
                            className="searching"
                        />
                    </div>

                    {/* עמודה עם סימן ✖ */}
                    <div className="filter-column">
                        <h2>✖</h2>
                        <Autocomplete
                            multiple
                            id="method-dropdown"
                            options={methods}
                            getOptionLabel={(option) => option.text}
                            value={methods.filter((method) => filters.methods.includes(method.text))}
                            onChange={handleMethodChange}
                            renderInput={(params) => <TextField {...params} label="שיטת הכנה" />}
                            className="searching"
                        />
                        <Autocomplete
                            multiple
                            id="dontShow"
                            options={ingredients}
                            getOptionLabel={(option) => option.name}
                            value={ingredients.filter((no) => filters.noIngredients.includes(no.name))}
                            onChange={handleExcludedIngredientChange}
                            renderInput={(params) => <TextField {...params} label="מוצר" />}
                            className="searching"
                        />
                    </div>
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyFilters}
                    className="apply-filters-button"
                    sx={{
                        backgroundColor: 'mediumpurple',
                        marginTop: '20px',
                    }}
                >
                    אישור
                </Button>
            </div>
            {showAlert && (
                <Alert
                    ref={alertRef}
                    severity="error"
                    className="alert-slide-in"
                    action={
                        <Button color="inherit" size="small" onClick={handleCloseAlert}>
                            אישור
                        </Button>
                    }
                >
                    לא ניתן לבחור את אותו מרכיב גם ב'כן' וגם ב'לא'
                </Alert>
            )}
        </>
    );
}
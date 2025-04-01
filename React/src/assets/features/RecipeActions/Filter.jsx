import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip'; // Import MUI Chip
import Links from '../Links';
import './Filter.css';

export default function Filter() {
    const [selectedIngredients, setSelectedIngredients] = useState([]); // State for selected ingredients
    const [ingredients, setIngredients] = useState([]);
    const [recipeType, setRecipeType] = useState([
        { id: 0, text: 'בשרי', isMarked: false },
        { id: 2, text: 'חלבי', isMarked: false },
        { id: 3, text: 'פרווה', isMarked: false },
    ]);

    const [selectedIngredient, setSelectedIngredient] = useState(null); // State to hold the selected ingredient
    const [inputValue, setInputValue] = useState(""); // State for inputValue of Autocomplete

    useEffect(() => {
        axios.get(Links.ingredients)
            .then((response) => {
                setIngredients(response.data);
            })
            .catch((error) => {
                console.error("Error fetching ingredients:", error);
            });
    }, []);

    const handleBoxClick = (id) => {
        setRecipeType((prevBoxes) =>
            prevBoxes.map((box) =>
                box.id === id ? { ...box, isMarked: !box.isMarked } : box
            )
        );
    };

    const handleIngredientChange = (event, newValue) => {
        if (newValue && !selectedIngredients.includes(newValue)) {
            setSelectedIngredients([...selectedIngredients, newValue]); // Add selected ingredient to state
        }
        setSelectedIngredient(null); // Clear the input field immediately after selection
        setInputValue(""); // Reset the inputValue to empty to clear the Autocomplete text box
    };

    const handleDelete = (ingredientToDelete) => {
        setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== ingredientToDelete)); // Remove ingredient from state
    };

    return (
        <>
            {recipeType.map((box) => (
                <div
                    key={box.id}
                    style={{
                        border: '1px solid black',
                        padding: '10px',
                        margin: '5px',
                        textDecoration: box.isMarked ? 'line-through' : 'none',
                        cursor: 'pointer',
                        color: 'black'
                    }}
                    onClick={() => handleBoxClick(box.id)}
                >
                    {box.text}
                </div>
            ))}

            {/* אוטומט של מוצר */}
            <Autocomplete
                disablePortal
                options={ingredients}
                getOptionLabel={(option) => option.name}
                value={selectedIngredient} // Bind the value to the selected ingredient
                onChange={handleIngredientChange} // Handle product selection
                inputValue={inputValue} // Bind the input value to state
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)} // Update inputValue on change
                renderInput={(params) => <TextField {...params} label="מוצר" />}
                className="searching"
            />

            {/* הצגת ה-Chips של המוצרים שנבחרו */}
            <div>
                {selectedIngredients.map((ingredient, index) => (
                    <Chip
                        key={index}
                        label={ingredient.name}
                        onDelete={() => handleDelete(ingredient)} // Delete chip on click
                        style={{ margin: '5px' }}
                    />
                ))}
            </div>
        </>
    );
}

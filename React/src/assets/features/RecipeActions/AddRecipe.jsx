import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Links from '../Links';
import './AddRecipe.css';

export default function AddRecipe({ user }) {
    const [ingredients, setIngredients] = useState([]);
    const [name, setName] = useState();
    const [userName, setUserName] = useState();
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [category, setCategory] = useState();
    const [recipeType, setRecipeType] = useState();
    const [description, setDescription] = useState();
    const [selectedMethods, setSelectedMethods] = useState([]);
    const [ingredientFields, setIngredientFields] = useState([{ quantity: '', ingredient: null, showAddIcon: true }]);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const alertRef1 = useRef(null);
    const alertRef2 = useRef(null);
    const [missingFields, setMissingFields] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        setUserName(user.userName ? user.userName : user.result.userName);
        axios.get(Links.ingredients)
            .then((response) => {
                setIngredients(response.data);
            })
            .catch((error) => {
                console.error("Error fetching ingredients:", error);
            });
    }, []);

    const handleAddIngredientField = () => {
        setIngredientFields([
            ...ingredientFields,
            { quantity: '', ingredient: null, showAddIcon: true } // נוסיף שדה חדש עם אפשרות להציג את האייקון
        ]);
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedFields = [...ingredientFields];
        updatedFields[index][field] = value;
        setIngredientFields(updatedFields);
    };

    const handleAddIconClick = () => {
        handleAddIngredientField(); // נוסיף שדה חדש תמיד בסוף
    };

    const handleRemoveIngredientField = (index) => {
        if (ingredientFields.length > 1) {
            const updatedFields = [...ingredientFields];
            updatedFields.splice(index, 1); // נבצע splice כדי להסיר את השדה הספציפי
            setIngredientFields(updatedFields); // נעדכן את המערך
        }
    };

    const handleMethodChange = (event) => {
        const value = event.target.value;
        setSelectedMethods((prevMethods) => {
            if (prevMethods.includes(value)) {
                return prevMethods.filter((method) => method !== value);
            }
            else {
                return [...prevMethods, value];
            }
        });
    };

    const validateForm = () => {
        const missingFields = [];

        if (!name) {
            missingFields.push("שם המתכון");
        }
        if (!category) {
            missingFields.push("קטגוריה");
        }
        if (!recipeType) {
            missingFields.push("סוג המתכון");
        }
        if (!description) {
            missingFields.push("הוראות הכנה");
        }
        const hasIngredient = ingredientFields.some(field => field.ingredient !== null);
        if (!hasIngredient) {
            missingFields.push("יש להוסיף לפחות מוצר אחד למתכון");
        }
        return missingFields;
    };

    useEffect(() => {
        if (successAlert && alertRef1.current) {
            requestAnimationFrame(() => {
                alertRef1.current.style.transition = 'top 0.3s ease-out';
                alertRef1.current.style.top = '16px';
            });
        }
    }, [successAlert]);

    useEffect(() => {
        if (errorAlert && alertRef2.current) {
            requestAnimationFrame(() => {
                alertRef2.current.style.transition = 'top 0.3s ease-out';
                alertRef2.current.style.top = '16px';
            });
        }
    }, [errorAlert]);

    const closeSuccessAlert = () => {
        if (alertRef1.current) {
            alertRef1.current.style.transition = 'top 0.3s ease-out';
            alertRef1.current.style.top = '-100px';
            setTimeout(() => {
                setSuccessAlert(false);
            }, 300);
            navigate('/myRecipes');
        }
    };
    const closeErrorAlert = () => {
        if (alertRef2.current) {
            alertRef2.current.style.transition = 'top 0.3s ease-out';
            alertRef2.current.style.top = '-100px';
            setTimeout(() => {
                setErrorAlert(false);
            }, 300);
        }
    }
    const save = async () => {

        const fieldsMissing = validateForm();

        if (fieldsMissing.length > 0) {
            setMissingFields(fieldsMissing);  // נעדכן את השדות החסרים
            setErrorAlert(true);
            return;
        }
        const methods = selectedMethods.join(' ');
        const recipeData = new FormData();
        recipeData.append('name', name);
        recipeData.append('userName', userName);
        recipeData.append('image', image);
        recipeData.append('imageFile', imageFile);
        recipeData.append('category', parseInt(category));
        recipeData.append('recipeType', parseInt(recipeType));
        recipeData.append('description', description);
        recipeData.append('methods', methods);
        const url = Links.recipes;
        const recipeResponse = await axios.post(url, recipeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        const recipeId = recipeResponse.data
        const ingredientsData = ingredientFields.map(field => ({
            ingredientName: field.ingredient?.name,
            amount: field.quantity,
            recipeId: recipeId
        }));
        const ingredientsUrl = Links.recipesIngredients;
        ingredientsData.map(async (i) => {
            await axios.post(ingredientsUrl, i, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        })
        setSuccessAlert(true);
    };


    return (
        <>
            <TextField
                id="outlined-basic"
                label="שם המתכון"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                className="searching"
                fullWidth
                style={{
                    marginTop: '80px',
                    marginBottom: '20px',
                    width: '20vw'
                }}
            />
            <div id="choose">
                <FormGroup id="words">
                    <FormControlLabel control={<Checkbox value="בישול" onChange={handleMethodChange} className="custom-checkbox" />} label="בישול" />
                    <FormControlLabel control={<Checkbox value="אפיה" onChange={handleMethodChange} className="custom-checkbox" />} label="אפיה" />
                    <FormControlLabel control={<Checkbox value="טיגון" onChange={handleMethodChange} className="custom-checkbox" />} label="טיגון" />
                    <FormControlLabel control={<Checkbox value="הקצפה" onChange={handleMethodChange} className="custom-checkbox" />} label="הקצפה" />
                </FormGroup>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={recipeType}
                    onChange={(e) => setRecipeType(e.target.value)}
                    name="radio-buttons-group">
                    <FormControlLabel className="radio" value={0} control={<Radio className="custom-checkbox" />} label="בשרי" />
                    <FormControlLabel className="radio" value={1} control={<Radio className="custom-checkbox" />} label="חלבי" />
                    <FormControlLabel className="radio" value={2} control={<Radio className="custom-checkbox" />} label="פרווה" />
                </RadioGroup>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    name="radio-buttons-group">
                    <FormControlLabel className="radio" value={0} control={<Radio className="custom-checkbox" />} label="עיקריות" />
                    <FormControlLabel className="radio" value={1} control={<Radio className="custom-checkbox" />} label="תוספות" />
                    <FormControlLabel className="radio" value={2} control={<Radio className="custom-checkbox" />} label="קינוחים" />
                    <FormControlLabel className="radio" value={3} control={<Radio className="custom-checkbox" />} label="סלטים" />
                    <FormControlLabel className="radio" value={4} control={<Radio className="custom-checkbox" />} label="מרקים" />
                    <FormControlLabel className="radio" value={5} control={<Radio className="custom-checkbox" />} label="משקאות" />
                    <FormControlLabel className="radio" value={6} control={<Radio className="custom-checkbox" />} label="אחר" />
                </RadioGroup>
            </div>
            <div id='addIngredient'>
                {ingredientFields.map((field, index) => (
                    <div key={index} className="ingredient-row">
                        <Autocomplete
                            disablePortal
                            options={ingredients}
                            getOptionLabel={(option) => option.name}
                            value={field.ingredient}
                            onChange={(event, newValue) => handleIngredientChange(index, 'ingredient', newValue)}
                            renderInput={(params) => <TextField {...params} label="מוצר" />}
                            className="searching"
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            id={`quantity-${index}`}
                            label="כמות"
                            variant="outlined"
                            value={field.quantity}
                            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                            className="searching"
                            style={{ marginRight: '10px' }}
                        />
                        {/* אייקון ה-X להסרת השדה */}
                        {ingredientFields.length > 1 && (
                            <RemoveCircleIcon
                                sx={{
                                    color: 'rgba(0, 0, 0, 0.658)',
                                    fontSize: '40px',
                                    cursor: 'pointer',
                                    marginLeft: '10px'
                                }}
                                className="searching"
                                onClick={() => handleRemoveIngredientField(index)} // נסיר את השדה כשנלחץ על האייקון
                            />
                        )}
                    </div>
                ))}
                {/* אייקון ההוספה תמיד בסוף */}
                <AddCircleIcon
                    sx={{
                        color: 'mediumpurple',
                        fontSize: '40px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}
                    onClick={handleAddIconClick} // תמיד יוסיף שדה חדש בסוף
                />
            </div>
            <TextField
                label="הוראות הכנה"
                className="searching"
                multiline
                rows={15}  // מספר השורות שמוצגות בתצוגה (לא מגביל את הגודל של השדה)
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                sx={{
                    width: '50vw',
                    marginTop: '30px',
                    direction: 'rtl',
                    marginBottom: '200px'
                }}
            />
            <Button id="save" variant="contained" disableElevation onClick={save}>
                שמור
            </Button>
            {errorAlert && missingFields.length > 0 && (
                <Alert
                    ref={alertRef2}
                    variant="outlined"
                    severity="error"
                    className="alert-slide-in"
                    action={
                        <Button color="inherit" size="small" onClick={closeErrorAlert}>
                            אישור
                        </Button>
                    }
                >
                    <Typography component="div">
                        לא מולאו השדות הבאים:
                        <ul>
                            {missingFields.map((field, index) => (
                                <li key={index}>{field}</li>
                            ))}
                        </ul>
                    </Typography>
                </Alert>
            )}
            {successAlert && (
                <Alert
                    ref={alertRef1}
                    severity="success"
                    className="alert-slide-in"
                    action={
                        <Button color="inherit" size="small" onClick={closeSuccessAlert}>
                            אישור
                        </Button>
                    }
                >
                    <Typography component="div" dangerouslySetInnerHTML={{
                        __html: `המתכון נוסף בהצלחה!`
                    }} />
                </Alert>
            )}
        </>
    );
}
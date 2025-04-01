import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './AddRecipe.css'

export default function Instructions() {
    const navigate = useNavigate();

    const goToAddRecipe = () => {
        navigate('/addRecipe');
    };
    return (
        <>
            <div id="words">
                <h3>שימ\י לב:</h3>
                <p>על מנת לשמור על יעילות האתר השתדל\י לבחור מתוך המוצרים את המוצרים המדויקים ביותר למתכון שלך
                    וכן כתוב את הכמות בצורה מדוייקת ומפורטת
                </p>
                <p>הכמות והמוצר מתחברים למשפט אחד</p>
                <p>לדוגמא:</p>
                <ul>
                    <li>
                        <b>כמות: </b>
                        2 סלסלאות
                        <b> מוצר: </b>
                        פטריות שמפיניון
                    </li>
                    <b>כך יופיע במתכון שלך: </b>
                    2 סלסלאות שמפיניון<br /><br />
                    <li>
                        <b>כמות: </b>
                        קורט
                        <b> מוצר: </b>
                        מלח
                    </li>
                    <b>כך יופיע במתכון שלך: </b>
                    קורט מלח<br /><br />
                    <li>
                        <b>כמות: </b>
                        שקית
                        <b> מוצר: </b>
                        סוכר וניל
                    </li>
                    <b>כך יופיע במתכון שלך: </b>
                    שקית סוכר וניל<br /><br />
                    <li>
                        <b>כמות: </b>
                        כף (10 גרם)
                        <b> מוצר: </b>
                        שמרים
                    </li>
                    <b>כך יופיע במתכון שלך: </b>
                    כף (10 גרם) שמרים
                </ul>
            </div>
            <Button id="continue" variant="contained" disableElevation onClick={goToAddRecipe}>
                המשך
            </Button>
        </>
    )
}
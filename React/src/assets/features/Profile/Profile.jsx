import React, { useState, useEffect, useRef } from "react";
import './Profile.css'
import Onclick from "./Onclick";

export default function Profile({ user, setUser }) {
    const [fontSize, setFontSize] = useState(20); // גודל פונט התחלתי
    const textRef = useRef(null);
    const [showOnclick, setShowOnclick] = useState(false);

    useEffect(() => {
        if (textRef.current) {
            const textWidth = textRef.current.offsetWidth;
            const circleWidth = 60;
            // חישוב גודל פונט אופטימלי
            let newFontSize = 20;
            if (textWidth > circleWidth) {
                newFontSize = Math.floor((circleWidth / textWidth) * 20);
            }
            setFontSize(newFontSize);
        }
    }, [user.name]);

    const handleButtonClick = () => {
        setShowOnclick(!showOnclick);
    };

    const handleClose = () => {
        setShowOnclick(false);
    };

    return (
        <>
            {showOnclick && <div className="blur-background"></div>}
            <button id='profile' onClick={handleButtonClick}>
                <span
                    ref={textRef}
                    style={{ fontSize: `${fontSize}px` }}>
                    {user.name ? user.name : user.result.name.split(' ')[0]}
                </span>
            </button>
            {showOnclick && <Onclick user={user} onClose={handleClose} setUser={setUser} />}
        </>
    )
}
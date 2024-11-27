import React, { useEffect } from "react";
import DisplayStyle from "./styles/display.module.css";


const Display = ({input, result, history, showResult, inputHistory}) => {
    
    useEffect(() => { function updateScroll() { 
        const historyDisplay = document.getElementById("display-history"); 
        if (historyDisplay) { 
            historyDisplay.scrollTop = historyDisplay.scrollHeight; 
        } 
        } 
        function enterKeyDown(event) { 
            if (event.key === "Enter") {
                updateScroll();
            } 
        } 
        function onClick() { 
            const inputDisplay = document.getElementById("input-display");
            if (input === "") {
                updateScroll();
            } 
            if (inputDisplay) {
                inputDisplay.scrollLeft = inputDisplay.scrollWidth;
            }
        }
        document.addEventListener("keydown", enterKeyDown);     
        document.addEventListener("click", onClick); 
        return () => { 
            document.removeEventListener("keydown", enterKeyDown); 
            document.removeEventListener("click", onClick); 
        };
    }, [input]);

    return (
        <>
            <div className={DisplayStyle.displayContainer}>
                <textarea className={DisplayStyle.resultHistory} value={history.join("\n")} id="display-history" rows="4" autoComplete="off" disabled></textarea>
                <input className={DisplayStyle.inputHistory} value={inputHistory} autoComplete="off" disabled></input>
                {showResult ? ( 
                    <input className={DisplayStyle.inputDisplay} id="input-display" value={result} autoComplete="off" disabled ></input> 
                    ) : (
                    <input className={DisplayStyle.inputDisplay} id="input-display" value={input} autoComplete="off" disabled ></input> 
                )}
                </div>
        </>
    );
}

export default Display;
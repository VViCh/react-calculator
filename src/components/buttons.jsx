import React from "react";
import ButtonsStyle from "./styles/buttons.module.css";
import { Link } from "react-router-dom";

const Buttons = ({inputHandler, clearInput, deleteInput, validateInput}) => {
    
    document.addEventListener("keydown", function(event) {
        if(event.key === "Enter") {
            event.preventDefault();
        }
    });

    return (
        <>
            <div className={ButtonsStyle.buttonsContainer}>
                <div className={ButtonsStyle.upperArea}>

                    <div className={ButtonsStyle.leftSide}>
                        <div className={ButtonsStyle.leftRow}>
                            <button className={ButtonsStyle.functionButton} onClick={clearInput}>C</button>
                            <button className={ButtonsStyle.functionButton} onClick={deleteInput}>DEL</button>
                            <Link to="/support">
                                <button className={ButtonsStyle.supportButton}>?</button>
                            </Link>
                        </div>
                        <div className={ButtonsStyle.leftRow}>
                            <button className={ButtonsStyle.numberButton} onClick={inputHandler}>1</button>
                            <button className={ButtonsStyle.numberButton} onClick={inputHandler}>2</button>
                            <button className={ButtonsStyle.numberButton} onClick={inputHandler}>3</button>
                        </div>
                        <div className={ButtonsStyle.leftRow}>
                            <button className={ButtonsStyle.numberButton} onClick={inputHandler}>4</button>
                            <button className={ButtonsStyle.numberButton} onClick={inputHandler}>5</button>
                            <button className={ButtonsStyle.numberButton} onClick={inputHandler}>6</button>
                        </div> 
                        <div className={ButtonsStyle.leftRow}>
                            <button className={ButtonsStyle.numberButton} onClick={inputHandler}>7</button>
                            <button className={ButtonsStyle.numberButton} onClick={inputHandler}>8</button>
                            <button className={ButtonsStyle.numberButton} onClick={inputHandler}>9</button>
                        </div>
                    </div>
                    <div className={ButtonsStyle.rightSide}>
                        <button className={ButtonsStyle.operatorButton} onClick={inputHandler}>/</button>
                        <button className={ButtonsStyle.operatorButton} onClick={inputHandler}>×</button>
                        <button className={ButtonsStyle.operatorButton} onClick={inputHandler}>-</button>
                        <button className={ButtonsStyle.operatorButton} onClick={inputHandler}>+</button>
                    </div>
                </div>
                <div className={ButtonsStyle.lastRow}>
                    <button className={ButtonsStyle.numberButton} onClick={inputHandler}>0</button>
                    <button className={ButtonsStyle.operatorButton} id="equal-button" onClick={validateInput}>=</button>
                </div>
            </div>
        </>
    );
}

export default Buttons;
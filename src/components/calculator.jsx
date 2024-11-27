import React, { useState } from "react";
import Display from "./display";
import Buttons from "./buttons";
import CalculatorStyle from"./styles/calculator.module.css";
import { evaluate } from "mathjs";

function Calculator() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [inputHistory, setInputHistory] = useState("");
    const [history, setHistory] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const inputHandler = (event) => {
        let value = event.target.innerText;

        const number = /^\d.*$/; 
        const symbols = /^[\+\-\/\×]$/;
        const sequence = /^\d+[\+\-\×\/]\d+$/;
        //To make sure if the value of the second operand is 0 then the zero will only be one regardless of how many times the user input it
        const operandTwoSequence = /^\d[\+\-\×\/]0+$/;
        
        let displayed = input;
        if (input === "" && number.test(value)) {
            setResult("");
            setInputHistory("");
            setShowResult(false);
            setInput(value);
        } else if(input !== "" && number.test(displayed.charAt(displayed.length - 1)) && symbols.test(value) && !sequence.test(displayed)){
            setInput(displayed + value);
        //To change the number of 0 to the new number input
        } else if(displayed === "0" && number.test(value) && value != 0) {
            setInput(value);
        //To make sure there are no excess 0
        } else if(displayed == 0) {
            setInput(displayed);
        //To change the number of 0 to the new number input
        } else if(operandTwoSequence.test(displayed) && number.test(value) && value != 0) {
            setInput((prev) => prev.slice(0, -1) + value);
        //To make sure there are no excess 0
        } else if(operandTwoSequence.test(displayed)) {
            setInput(displayed);
        } else if(input !== "" && symbols.test(displayed.charAt(displayed.length - 1)) && symbols.test(value)) {
            setInput((prev) => prev.slice(0, -1) + value);
        } else if(input !== "" && number.test(displayed.charAt(displayed.length - 1)) && number.test(value)){
            setInput(displayed + value);
        } else if(input !== "" && symbols.test(displayed.charAt(displayed.length - 1)) && number.test(value)){
            setInput(displayed + value);
        } else if(input !== "" && symbols.test(displayed.charAt(displayed.length - 1)) && symbols.test(value)) {
            setInput((prev) => prev.slice(0, -1) + value);
        }
    };

    const clearInput = () => {
        setInput("");
        setResult("");
        setInputHistory("");
        setShowResult(false);
    };

    const deleteInput = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    const validateInput = () => {
        const sequence = /^\d+[\+\-\×\/]\d+$/;

        let display = input;
        if(sequence.test(display)) {
            calculate();
        } else if(input === "") {
            setShowResult(false);
            setInputHistory("");
        } else {
            popAlert();
        }
    };

    const popAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    const calculate = () => {
        let calculation = 0;
        let expression = input;
        
        setInputHistory(expression)

        expression = expression.replaceAll("×", "*");
        try {
            calculation = evaluate(expression);
            setInput("");
            setShowResult(true);
        } catch (error) {
            setInput("");
            calculation = "Err";
            setShowResult(true);
        }
        calculation = isNaN(calculation) ? "Err" : calculation;
        setHistory((prevHistory) => [...prevHistory, `${calculation}`]);
        setResult(calculation);
    };


    return (
        <>
            <div class={CalculatorStyle.container}>
                <Display input={input} result={result} history={history} showResult={showResult} inputHistory={inputHistory}/>
                <Buttons inputHandler={inputHandler} clearInput={clearInput} deleteInput={deleteInput} validateInput={validateInput}/>
            </div>
            {showAlert && <div className={CalculatorStyle.errorAlertContainer}>
                <div className={CalculatorStyle.errorAlert}>
                    <h5>
                        Please make sure you calculate in a sequence of 'number' + 'symbol' + 'number'
                    </h5>
                </div>
            </div>}
        </>
    );
}

export default Calculator;

import React, { useState } from "react";
import "../Styles/style.css"


export default function App() {

    const [tipState, setTipState] = useState({
        firstNumber: "",
        secondNumber: "",
        selectService: ""
    })

    const [tipAmount, setTipAmount] = useState("")
    const [totalAmount, setTotalAmount] = useState([])
    const [eachPersonOwes, setEachPersonOwes] = useState("")
    const [booleanState, setBooleanState] = useState(false)

    // console.log(tipState)

    const handleChange = (event) => {

        const { name, value } = event.target;

        setTipState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })

    }

    // calculations 

    const first = tipState.firstNumber;
    const second = tipState.secondNumber;
    const tip = tipState.firstNumber / 100 * tipState.selectService;
    const total = parseInt(first) + parseInt(tip);
    const eachPerson = total / second;


    // this function sets states 

    const handleClick = () => {
        setTipAmount(tip)
        setTotalAmount(total)
        setEachPersonOwes(eachPerson)
        setBooleanState(prevState => !prevState)

        if (tipState.firstNumber === "" ||
            (tipState.secondNumber === "" || tipState.secondNumber <= "0") ||
            (tipState.selectService === "Choose" || tipState.selectService === "")) {
            setTipAmount("")
            setTotalAmount("")
            setEachPersonOwes("")
        }


    }

    // displays result when calculation states are not equal empty strings (!== "")..

    const display = () => {
        if (tipAmount !== "") {
            return <div id="resultContainer">

                <h2 id="display"> Tip Amount: $ {tipAmount}</h2>

                <h2 id="display">Total Amount: $ {totalAmount}</h2>

                <h2 id="display">Each Person Owes: $ {eachPersonOwes}</h2>
            </div>
        }
    }

    // validations (errors)


    const number1 = () => {
        if (booleanState === true && tipState.firstNumber === "") {
            return <h2 id="error">Bill Amount Cannot Be Blank</h2>
        }
    }

    const number2 = () => {

        if ((tipState.secondNumber <= "0" || tipState.secondNumber === "") && booleanState === true) {
            return <h2 id="error">Number Of Users Must Be Greater Than Zero</h2>
        }
    }

    const percent = () => {
        if (tipState.selectService === "" && booleanState === true) {
            return <h2 id="error">You Must Select A Service</h2>
        }
    }


    // this comparison operator gives validation function call div tag id name

    const errorStyle = booleanState === true &&
        (tipState.firstNumber === "" || tipState.secondNumber === "" ||
            tipState.selectService === "") ?
        "errors" :
        "";


    return (
        <div id="container">
            <h2 id="header">TIP CALCULATOR</h2>

            {/* validation function calls */}

            <div id={errorStyle}>
                {number1()}
                {number2()}
                {percent()}

            </div>

            <form >

                <h2 id="bill">How Much Was Your Bill ?</h2>

                <input
                    type="number"
                    id="numberInputOne"
                    onChange={handleChange}
                    name="firstNumber"
                    value={tipState.firstNumber}

                />

                <h2 id="numberPeople">How Many People Sharing The Bill ?</h2>

                <input
                    type="number"
                    id="numberInputTwo"
                    onChange={handleChange}
                    name="secondNumber"
                    value={tipState.secondNumber}

                />

                <h2 id="service">How Was Your Service</h2>

                <select
                    id="selectOption"
                    onChange={handleChange}
                    name="selectService"
                    value={tipState.selectService}
                >

                    <option defaultValue >Choose...</option>
                    <option value="20">Great - 20%</option>
                    <option value="10">Good - 10%</option>
                    <option value="2">Bad - 2%</option>
                </select>

            </form>

            <br />
            <button id="btn" onClick={handleClick}>Calculate</button>

            {/* display function call */}

            {display()}

        </div>
    )
}
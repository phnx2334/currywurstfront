import React from 'react'
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faClock } from '@fortawesome/free-solid-svg-icons'
import './Dish.css'

const Dish =(props) =>{

    //Set local state to handle the current item count
    const [count, setCount] = useState(0);

    //Disable minus button if count reaches 0
    useEffect(()=>{
        const element = document.getElementById(`minusButton${props.id}`);
        if(count <= 0){
            element.setAttribute("disabled", true);
        }else{
            element.removeAttribute("disabled",false);
        }
    },[count]);

    //Capture the current button being pressed and add or subtract to the count state
    const onTriggerPressButtonEvent = (event) =>{
        let data = {};

        if(event.target.innerText === "+"){
            data.dishName = props.dishName;
            data.operation = "add";
            setCount(count+1);
        }else{
            data.dishName = props.dishName;
            data.operation = "subtract";
            setCount(count-1);
        }
        //Send info to parent component
        props.passDishData(data);
    }

    const ingredientsAvailable = () =>{
        if(props.available){
            return(
                <span className="available-dish-notification">
                    <span className="a-dish-circle"><FontAwesomeIcon icon={faCircle}/></span>
                    <p className="a-dish-text">All ingredients available</p>
                </span>
            )
        }else{
            return(
                <span className="not-available-dish-notification">
                    <span className="na-dish-circle"><FontAwesomeIcon icon={faCircle}/></span>
                    <p className="na-dish-text">Ingredients soon to be available</p>
                </span>
            )
        }
    };

    
    return(
        <div className="order-menu-item">
            <span className="menu-item-header">
                <p className="menu-item-title">{props.dishName}</p>
                <p className="menu-item-coin">€</p>
                <p id="menu-item-price">{props.dishPrice}</p>
            </span>
            <span className="quantity-input">
                <button id={`minusButton${props.id}`} className='quantity-input-button less'
                onClick={onTriggerPressButtonEvent}>-</button>

                <input className="quantity" value = {count}/>

                <button id="plusButton" className="quantity-input-button more" 
                onClick={onTriggerPressButtonEvent}>+</button>
            </span>
            <span className="dish-prep-time">
                <span className="order-panel-time-icon"><FontAwesomeIcon icon={faClock}/></span>
                <p className="dish-prep-time-intro">Prepping time: </p>            
                <p id="actual-dish-prep-time">{props.ttc}</p>
                {props.available?
                    null:
                    <p className="extra-prep-time-notification"> + few extra minutes</p>}
            </span>
            {ingredientsAvailable()}
            <hr className="beige-line"></hr>
        </div>
    )
}

export default Dish;
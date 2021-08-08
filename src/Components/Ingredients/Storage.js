import React from 'react'
import { useEffect } from 'react';
import './Ingredients.css';



const Storage = (props) => {

  useEffect(()=>{
    //Hide the editable fields from the view  
    const ingredientQtyEdit = document.getElementById(`ingredientQtyEdit${props.id}`);
    if(ingredientQtyEdit){ingredientQtyEdit.classList.add("hide-time-quantity")}
        
  },[]);

  //Input validations
  const  onKeyPressNumbers = (e) => {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  return (
    <div className="ki-list-item-container">
     <div className="ki-list-item">
        <p id={`ingredientName${props.id}`} className="ki-list-name">{props.name}</p>
        <span className="ki-list-capacity-container">
          <p id={`ingredientQty${props.id}`} className="ki-list-capacity">{props.avUnits}</p>
          <input id={`ingredientQtyEdit${props.id}`} className="ki-list-capacity" onKeyPress={(e)=>onKeyPressNumbers(e)}></input>
        </span>
        <span className="ki-button-container">
          <button id={`ingredientQtyButton${props.id}`} className="ki-list-edit" onClick={(e)=>props.modify(e)}>Modify</button>
        </span>
     </div>
    </div>
  );
}

export default Storage;

import React from 'react'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Warehouse from './Warehouse'
import Storage from './Storage'
import * as ingredientsActions from '../../store/actions/ingredientsActions'
import yellowFork from '../../cssResources/yellow-fork.png'



const  Ingredients = (props) => {
  
  //Define state to store which field is modifiable or not
  const [modifiable, setModifiable] = useState([]);


  //Get storage and warehouse ingredients when component finishes loading
  useEffect(()=>{
    props.getStorageIngredients();
    props.getWarehouseIngredients();
  },[]);


  //On click modify, activate edition for ingredient quantity
  const onClickModify = (event)=>{

    const buttonId = event.target.id;
    const re = /[^0-9]+/g;
    const id = buttonId.replace(re, "");

    const ingredientName = document.getElementById(`ingredientName${id}`);
    const ingredientQty = document.getElementById(`ingredientQty${id}`);
    const ingredientQtyEdit = document.getElementById(`ingredientQtyEdit${id}`);

    if(modifiable.includes(buttonId)){
        
      //Remove from modifiables list in the local state
      setModifiable([modifiable.filter((button)=>{
          return button !== buttonId
      })])

      //Hide the editable field
      ingredientQtyEdit.classList.add("hide-time-quantity");
      //Show the non editable field
      ingredientQty.classList.remove("hide-time-quantity");

       //Change p tag and input tag to match new values
       ingredientQty.innerText = ingredientQtyEdit.value? ingredientQtyEdit.value : ingredientQty.innerText;
       ingredientQtyEdit.placeholder = ingredientQtyEdit.value? ingredientQtyEdit.value : ingredientQtyEdit.placeholder;

      //Build the recipe object with the new data
      const modifiedIngredientData = {
          name:ingredientName.innerText,
          availableUnits:ingredientQtyEdit.value
      }

      //Dispatch the modification on the recipe
      props.modifyStorageIngredient(modifiedIngredientData);
      
    }else{
      setModifiable(modifiable.concat(buttonId));
      
      //Show the editable field
      ingredientQtyEdit.classList.remove("hide-time-quantity");
      //Hide the non editable field
      ingredientQty.classList.add("hide-time-quantity");
    } 
  };

 
  //Get storage ingredients array and render each position
  const renderStorageIngredients =  () =>{
    if (props.storageIngredients){

      const storageIngredientsData = [...props.storageIngredients];

      return(storageIngredientsData.map((ingredient, index) =>{

        return(
          <Storage
          name = {ingredient.name}
          key = {index}
          id={index+1}
          avUnits = {ingredient.availableUnits}
          modify={onClickModify}/>
        )
        })
      )
    }
  }

  //Get warehouse ingredients array and render each position
  const renderWarehouseIngredients =  () =>{
    if (props.warehouseIngredients){

      const warehouseIngredientsData = [...props.warehouseIngredients];

      return(warehouseIngredientsData.map((ingredient, index) =>{

        return(
          <Warehouse
          name = {ingredient.name}
          deliveryTime = {ingredient.deliveryTime}
          key = {index}/>
        )
        })
      )
    }
  }


  return (
    <div>
      <div className="ingredients-panel-section-header">
        <img className="yellow-fork" src={yellowFork} alt="yellow-fork"></img>
        <div>
          <h1>Ingredients</h1>
        </div>
      </div>

      <div className="ingredients-panel-section-background">
        <div className="ki-list-panel">
          <div className="ki-list-yellow-frame">
            <h2>Kitchen Ingredients</h2>
            <hr className="ki-list-green-line"></hr>
            <div className="ki-list-grid">
              <div className="ki-list-grid-titles">
                  <p className="ki-list-name-title">Name</p>
                  <p className="ki-list-capacity-title">Available Units</p>
              </div>
              {renderStorageIngredients()}
            </div>
          </div>
        </div>

        <div className="wi-list-panel">
          <div className="wi-list-yellow-frame">
            <h2>Warehouse Ingredients</h2>
            <hr className="wi-list-green-line"></hr>
            <div className="wi-list-grid">
              <div className="wi-list-grid-titles">
                  <p className="wi-list-name-title">Name</p>
                  <p className="wi-list-capacity-title">Time to carry</p>
              </div>

              {renderWarehouseIngredients()}
            </div>
          </div>
        </div> 
      </div>      
    </div>
  );
}


//Redux state and actions dispatchers

const mapStateToProps = state =>{
  return{
      storageIngredients: state.ingredients.storage,
      warehouseIngredients: state.ingredients.warehouse
  };
};

const mapDispatchToProps = dispatch =>{
  return{
      getStorageIngredients: () => dispatch(ingredientsActions.dispatchGetStorageIngredients()),
      addStorageIngredient: (ingredientData) => dispatch(ingredientsActions.dispatchAddStorageIngredient(ingredientData)),
      modifyStorageIngredient: (ingredientData) => dispatch(ingredientsActions.dispatchModifyStorageIngredient(ingredientData)),
      deleteStorageIngredient: (ingredientName) =>dispatch(ingredientsActions.dispatchDeleteStorageIngredient(ingredientName)),

      getWarehouseIngredients: () => dispatch(ingredientsActions.dispatchGetWarehouseIngredients()),
      addWarehouseIngredient: (ingredientData) => dispatch(ingredientsActions.dispatchAddWarehouseIngredient(ingredientData)),
      deleteWarehouseIngredient: (ingredientName) =>dispatch(ingredientsActions.dispatchDeleteWarehouseIngredient(ingredientName)),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);

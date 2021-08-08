import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import './RecipeItem.css';


const RecipeItem =(props) =>{

    const [state, setState] = useState({
        showIngredients:false,
        modifiable:[],
        ingData:{
            name:'',
            quantity:0
        }
    })

    //Hide the editable fields from the view when view recipe button is clicked
    useEffect(()=>{
        const ingredients = props.ingredients
        if(ingredients){
            ingredients.map((ingredientData, index)=>{
                const ingredientNameEdit = document.getElementById(`ingDataNameEdit${index+1}-${props.id}`);
                const ingredientNumberEdit = document.getElementById(`ingDataNumberEdit${index+1}-${props.id}`);
                const ttcEdit = document.getElementById(`ttcDataEdit${props.id}`);
                
                if(ingredientNameEdit){ingredientNameEdit.hidden = true}
                if(ingredientNumberEdit){
                    ingredientNumberEdit.classList.remove("ingredientQty");
                    ingredientNumberEdit.classList.add("ingredientQtyHidden");
                }
                if(ttcEdit){ttcEdit.hidden = true}
            })
        }
       
    },[state.showIngredients])

    //Render list of ingredients
    const renderIngredients = () =>{
        if(state.showIngredients){
            
            const ingredients = props.ingredients;

            if(ingredients){
                return(
                    ingredients.map((ingredientData, index)=>{
                        return(
                            <div key={index} className="ingredient-to-edit-container">
                                <p id={`ingDataName${index+1}-${props.id}`} className="ingredient-name-to-edit">{Object.keys(ingredientData)}</p>

                                <span className="ingredient-qty-to-edit-container">
                                    <p id={`ingDataNumber${index+1}-${props.id}`} className="ingredient-qty-to-edit">{Object.values(ingredientData)}</p>
                                    <input id={`ingDataNumberEdit${index+1}-${props.id}`} 
                                            className="ingredient-qty-to-edit"
                                            type="text" placeholder={Object.values(ingredientData)}
                                            onKeyPress={event => onKeyPressNumbers(event)}></input>
                                </span>
                                    
                                <button id={`ingDataModifyButton${index+1}-${props.id}`} 
                                        onClick={(e)=>onModifyIngredientClick(e)}
                                        className="modify-ingredient-qty-button">Modify</button>
                            </div>
                        )
                    })
               )     
            }
        }
    };


    //Event handlers----------------------------------

    //Alter the state to show the ingredients
    const onViewRecipeClick = () =>{
        setState({...state, showIngredients : !state.showIngredients});
    }


    const onModifyTimeToCookClick = (event) => {
    
        const buttonId = event.target.id;
        const re = /[^0-9.-]+/g;
        const id = buttonId.replace(re, "");

        const timeToCook = document.getElementById(`ttcData${id}`);
        const timeToCookEdit = document.getElementById(`ttcDataEdit${id}`);
        
        if(state.modifiable.includes(buttonId)){
            
            //Remove from modifiables list in the local state
            setState({...state, modifiable:state.modifiable.filter((button)=>{
                return button !== buttonId
            })})

            //Hide the editable field
            timeToCookEdit.hidden = true;
            //Show the non editable field
            timeToCook.classList.remove("hide-time-quantity");

             //Change p tag and input tag to match new values
             timeToCook.innerText = timeToCookEdit.value? timeToCookEdit.value : timeToCook.innerText;
             timeToCookEdit.placeholder = timeToCookEdit.value? timeToCookEdit.value : timeToCookEdit.placeholder;

            //Build the recipe object with the new data
            const modifiedRecipeData = {
                id:props.recipeId,
                name:props.name,
                ttc:timeToCookEdit.value? timeToCookEdit.value:timeToCook.innerText ,
                nutrients:props.nutrients,
                preMade:props.preMade
            }
            //Dispatch the modification on the recipe
            props.modifyTtc(props.recipeId, modifiedRecipeData);
            
        }else{
            setState({...state,modifiable:state.modifiable.concat(buttonId)});
            
            //Show the editable field
            timeToCookEdit.hidden = false;
            //Hide the non editable field
            timeToCook.classList.add("hide-time-quantity");
        } 
    };

    const onModifyIngredientClick = (event) => {
    
        const buttonId = event.target.id;
        const re = /[^0-9.-]+/g;
        const id = buttonId.replace(re, "");
        console.log("the id has", id)
        
        const ingredientName = document.getElementById(`ingDataName${id}`);
        const ingredientNumber = document.getElementById(`ingDataNumber${id}`);
        const ingredientNumberEdit = document.getElementById(`ingDataNumberEdit${id}`);

        if(state.modifiable.includes(buttonId)){
            
            //Remove from modifiables list in the local state
            setState({...state, modifiable:state.modifiable.filter((button)=>{
                return button !== buttonId
            })})

            //Hide the editable field
            ingredientNumberEdit.classList.remove("ingredientQty");
            ingredientNumberEdit.classList.add("ingredientQtyHidden");
            //Show the non editable field
            ingredientNumber.classList.remove("ingredientQtyHidden");
            ingredientNumber.classList.add("ingredientQty");

                    
             //Change p tag and input tag to match new values
             ingredientNumber.innerText = ingredientNumberEdit.value? ingredientNumberEdit.value : ingredientNumber.innerText;
             ingredientNumberEdit.placeholder = ingredientNumberEdit.value? ingredientNumberEdit.value : ingredientNumberEdit.placeholder;


            //If the quantity needed was changed
            if(ingredientNumberEdit.value !== ''){

                const newIngData = {
                    recipeId:props.recipeId,
                    ingredientName:ingredientName.innerText,
                    quantity:ingredientNumberEdit.value
                }

                //Dispatch the action to change the quantity
                props.modifyQuantity(newIngData);

                ingredientNumberEdit.value = '';
            }
        }else{
            setState({...state,modifiable:state.modifiable.concat(buttonId)});
            
            //Show the editable field
            ingredientNumberEdit.classList.remove("ingredientQtyHidden");
            ingredientNumberEdit.classList.add("ingredientQty");
            //Hide the non editable field
            ingredientNumber.classList.remove("ingredientQty");
            ingredientNumber.classList.add("ingredientQtyHidden");
        } 
    };
    
    //Validation to receive only numbers as input
    const  onKeyPressNumbers = (e) => {
        const re = /[0-9]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    }


    //Render the recipe container with the information
    const viewRecipeContainer = () =>{
        if(state.showIngredients){
            return(
                <div className="view-recipe-panel">
                    <div className="view-recipe-inner-frame">
                        <p>You're editing</p>
                        <h2>{props.name}</h2>
                        <hr className="view-recipe-green-line"></hr>
                        <div className="view-recipe-form-header">
                            <span className="view-recipe-time-span-title">
                                <FontAwesomeIcon icon={faClock}/>
                                <p>Time to cook:</p>  
                            </span>

                            <span className="view-recipe-time-span-number">
                                <p id={`ttcData${props.id}`}>{props.ttc}</p>
                                <input id={`ttcDataEdit${props.id}`} 
                                        type="number" placeholder={props.ttc} 
                                        onKeyPress={event => onKeyPressNumbers(event)}
                                        min="1"/>
                           </span>

                            <button id ={`ttcModifyButton${props.id}`} className="ttcModifyButton"
                                onClick={(e) => onModifyTimeToCookClick(e)}>Modify time to cook
                            </button>
                        </div>                     
                        <div className="view-recipe-form-body">
                            <hr className="view-recipe-yellow-line"></hr>
                            <h3>Edit dish ingredients:</h3>
                            {renderIngredients()}
                        </div>
                    </div>
                </div>
            )
        }
    };

  
    return(
        <div className="recipe-list-wrapper">
            <div className="list-items">
                <p>{`${props.recipeId}.`}</p>
                <p>{props.name}</p>
                <div className="buttons-list-items">
                    <button className="edit-recipe"  onClick={() => onViewRecipeClick()} >View / edit</button>
                    <button className="delete-recipe" onClick={()=>props.deleteRecipe(props.recipeId)}>Delete</button>
                </div>
                {viewRecipeContainer()}
            </div>  
        </div>
    )
}


export default RecipeItem;
import React from 'react'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import RecipeItem from './RecipeItem'
import * as recipesActions from '../../store/actions/recipesActions'
import * as ingredientsActions from '../../store/actions/ingredientsActions'
import * as menuItemsActions from '../../store/actions/menuItemsActions'
import yellowFork from '../../cssResources/yellow-fork.png'
import purpleFork from '../../cssResources/purple-fork.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEuroSign } from '@fortawesome/free-solid-svg-icons'
import './Recipe.css'



const Recipes = (props) => {

  //Declare state to store the data from the new recipe to add
  const [newRecipe, setNewRecipe] = useState({
    name:'',
    ttc:0,
    madeProduct:null,
    nutrients:[],
    type:'',
    price:0,
    ingredients:  null
  })

  //Define state to store the number of ingredients added
  const [count, setCount] = useState(0);


  //Get the data of recipes and ingredients, hide recipe form field
  useEffect(()=>{
    props.getStorageIngredients();
    props.getWarehouseIngredients();
    props.getMenuItems();
    props.getRecipes();
    document.getElementById("recipeFormBody").hidden = true
    setCount(0);
  },[]);

  //Render recipes that exist in the database
  const renderRecipesList = () =>{
    
    if(props.recipes !== null){
      //Get recipes from global object
      const recipes = [...props.recipes];
      //Display the items
      return (recipes.map((item,index) =>{
          return(
            <RecipeItem
              key={index}
              recipeId={item.id}
              id={Date.now() + Math.random()}
              name = {item.name}
              ttc = {item.ttc}
              ingredients = {item.ingredients}
              nutrients = {item.nutrients}
              preMade = {item.preMade}
              modifyQuantity = {onModifyIngredientClickHandler}
              modifyTtc = {onModifyTtcClickHandler}
              deleteRecipe = {onDeleteRecipeClickHandler}
            />
          )
        }) 
      )
    }
  };


  //Reders the list of ingredients to add to a new recipe
  const renderIngredientsList = () =>{
    //Declare an array of null with fixed positions
    const ingredients = Array.apply(null, Array(count));
    return (
      //Map the HTML to each element needed to be rendered
      ingredients.map((item,index)=>{
        return(
        <div id={`ingDiv${index}`} className="ingredient-container" key={index}> 
          <input placeholder="Ingredient name" type="text" id={`ingredientName${index}`}  className="ingredientName" onKeyPress={event => onKeyPressLetters(event)}/>
          <input placeholder="Qty." type="number" min="1" id={`ingredientQty${index}`} className="ingredientQty" onKeyPress={event => onKeyPressNumbers(event)}/>
          <button id={`ingdel${index}`} onClick={(e) => onDeleteIngredientClickHandler(e)} className="delete-ingredient-button">Delete</button>
        </div>
        )
      })
    )
  };
  

  //Event handlers
  //Update the state object depending on input received of the new recipe data
  const onRecipeFieldUpdate = (event, type) => {
    switch (type){
      case 'name':
       setNewRecipe({
         ...newRecipe,name:event.target.value
       })
      break;

      case 'ttc':
        setNewRecipe({
          ...newRecipe,ttc:event.target.value
        })
      break;

      case 'madeProduct':
        setNewRecipe({
          ...newRecipe,madeProduct:event.target.value == 'Yes'?true:false
        })

        //Show  or hide section according to answer
        if(event.target.value == 'Yes'){
          document.getElementById("recipeFormBody").hidden = true;
          
          const elements = document.getElementsByClassName("ingredient-container");

          if(elements){
            while (elements.length > 0) elements[0].remove();
          }
        }else{document.getElementById("recipeFormBody").hidden = false;}
      break;

      case 'type':
        let value;
        switch(event.target.value){
          case "Main Dish":
            value = "main"
          break;

          case "Drink":
            value = "drink"
          break;

          case "Dessert":
            value = "dessert"
          break;
        }
        setNewRecipe({
          ...newRecipe,type:value
        })
      break;

      case 'price':
        setNewRecipe({
          ...newRecipe,price:event.target.value
        })
      break;

      default:
          console.log("Default case for recipes state setting")
    }
  
  };

  const onAddIngredientClickHandler = () =>{
    setCount(count+1)
  };

  const onModifyIngredientClickHandler = (itemData) =>{
    props.modifyStorageIngredientQuantity(itemData)
  };

  const onModifyTtcClickHandler = (recipeId,recipeData) =>{
    props.modifyRecipe(recipeId, recipeData)
  };

  //Obtain the div element to delete and delete it
  const onDeleteIngredientClickHandler = (event)=>{
    const idToDelete = event.target.id.replace('ingdel','ingDiv');
    const elementToDelete = document.getElementById(idToDelete);
    if(elementToDelete){
      elementToDelete.remove();
    }  
  };

  const onAddRecipeClickHandler = async ()=>{

    //Generate array of objects with ingredients to add to the recipe
    let ingredientsToAdd = [];
    
    for(let i = 0;i<count;i++){
      
      let currName = document.getElementById(`ingredientName${i}`);
      let currQuantity = document.getElementById(`ingredientQty${i}`);
      
      if(currName !== null && currQuantity!==null){
        ingredientsToAdd.push({
          name:currName.value, 
          quantity:currQuantity.value,
          deliveryTime:2,
          availableUnits:20
        })
      }
    }

    //If the recipe is a pre made product
    if(ingredientsToAdd.length == 0){
      ingredientsToAdd.push({
        name:newRecipe.name, 
        quantity:"1",
        deliveryTime:2,
        availableUnits:20
      })
    }


    //Check if all fields are filled to enable button
    const name = newRecipe.name !== '' ? true :false
    const ttc = newRecipe.ttc !== 0? true : false
    const type = newRecipe.type !== '' ? true :false
    const price = newRecipe.price !== 0? true : false
    const ingredients = ingredientsToAdd? true:false

    const conditions = [name,ttc,type,price,ingredients]
    
    if(conditions.includes(false)){
      console.log("the recipe is not being saved")
      return null
    }

    //Dispatch the PUT calls to the API

    //Add new recipe if it does not exist
    if(!props.recipes.some(el =>el.name ===newRecipe.name)){
      props.addRecipe(newRecipe);

      //Add every ingredient in storage and warehouse

      //Get available ingredients on the storage and the warehouse
      const storageIngredientsData = [...props.storage]
      const warehouseIngredientsData = [...props.warehouseIngredients]

  
      //Add new ingredient to the storage
      ingredientsToAdd.map(async (recipeIngredient)=>{

        if(!storageIngredientsData.some(el =>el.name ===recipeIngredient.name)){
          await  props.addStorageIngredient(recipeIngredient);
        }

        //Add new ingredient to the warehouse
        if(!warehouseIngredientsData.some(el =>el.name ===recipeIngredient.name)){
          await  props.addWarehouseIngredient(recipeIngredient);
        }

        //Build expected object with information
        const newIngredientsStorage = {
          id:{},
          ingredient: {
            name:recipeIngredient.name
          },
          quantityNeeded:recipeIngredient.quantity,
          recipe:{
            id:props.recipes.length+1,
            name:newRecipe.name
          }
        }

        //Add entry to the ingredients storage table
        props.addStorageIngredientRecipe({...newIngredientsStorage});
      })

      //Update menu items
      props.addMenuItem({...newRecipe});

      //Clear the fields and delete the ingredients fields
      document.getElementById("recipeName").value = "";
      document.getElementById("ttc").value = "";
      document.getElementById("preMade").value = "default";
      document.getElementById("productType").value = "default";
      document.getElementById("price").value = "";

      document.getElementById("recipeFormBody").hidden = true;

      const elements = document.getElementsByClassName("ingredient-container");

      if(elements){
        while (elements.length > 0) elements[0].remove();
      }

      setNewRecipe({
        name:'',
        ttc:0,
        madeProduct:null,
        nutrients:[],
        type:'',
        price:0,
        ingredients:  null
      });

    }else{
      console.log("Recipe already exists")
    }
  };

  const onDeleteRecipeClickHandler = (recipeId) =>{
    //Delete recipe from the ingredients storage table
    props.deleteStorageIngredientRecipe(recipeId);
    //Delete recipe from the recipe table
    props.deleteRecipe(recipeId);
    //Delete recipe from the menu items
    props.deleteMenuItem(recipeId);
  };

  //Input validation
  const  onKeyPressLetters = (e) => {
    const re = /[A-Za-z ]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  const  onKeyPressNumbers = (e) => {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  return (
    <div>
     
     <div className="recipes-section-header">
        <img className="yellow-fork" src={yellowFork} alt="yellow-fork"></img> 
          <div>
              <h1>Recipes</h1>
          </div>
       
      </div>
      <div className="recipes-section-background">
        <div className="create-recipe-panel">
          <div className="create-recipe-yellow-frame">
            <h2>Create new dish</h2>
            <img src={purpleFork} alt="purple-fork"></img>
              <hr className="create-recipe-green-line"></hr>
              <p className="create-recipe-intructions">Set the recipe’s name, add all the details and ingredients necessary 
              for preparation and how much of each it requires (if applies). Then click “Add dish to menu”.</p>
          
            <div className="create-recipe-form-header">
              <input id="recipeName" type="text" placeholder="Dish name" 
              onChange={(e) => onRecipeFieldUpdate(e,'name')}
              onKeyPress={event => onKeyPressLetters(event)}/>
              <span className="create-recipe-panel-icon time-icon"><FontAwesomeIcon icon={faClock} className="far fa-clock"/></span>
              <input id="ttc" type="number" min="1" placeholder="Minutes to cook/serve"
              onChange={(e) =>onRecipeFieldUpdate(e,'ttc')}
              onKeyPress={event => onKeyPressNumbers(event)}/>
              <span className="create-recipe-panel-icon euro-icon"><FontAwesomeIcon icon={faEuroSign}/></span>
              <input id="price" type="number" min="1" placeholder="Dish price"
              onChange={(e) =>onRecipeFieldUpdate(e,'price')}
              onKeyPress={event => onKeyPressNumbers(event)}/>      
              <select id="preMade" name="preMade" onChange={(e) =>onRecipeFieldUpdate(e,'madeProduct')}> 
                <option value="default">Is it a pre-made product?</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              <select id="productType" name="productType" onChange={(e) =>onRecipeFieldUpdate(e,'type')}>
                <option value="default">Select dish type</option>
                <option value="Main Dish">Main Dish</option>
                <option value="Dessert">Dessert</option>
                <option value="Drink">Drink</option>
              </select>
              <hr className="create-recipe-white-line"></hr>
            </div>

            <div className="create-recipe-form-body" id="recipeFormBody">
              <span className="create-recipe-form-body-header">
                <h3>Dish ingredients are...</h3>
                <button className="add-ingredient-button" onClick={() => onAddIngredientClickHandler()}>Add ingredient to dish</button>
              </span>
              {renderIngredientsList()}
            </div>
            <div className="create-recipe-form-footer">
              <button id="addRecipe" className="add-recipe-button" onClick={()=>onAddRecipeClickHandler()}>Add dish to menu</button>
            </div>
          </div>
        </div>
            

        <section className="recipe-list">
          <div className="list-container">
            <h2>Recipes's List</h2>
            <hr className="view-recipe-green-line"></hr>
            <div className="recipes-space">
              {renderRecipesList()}
            </div>        
          </div>
        </section>


      </div>
    </div>
  );
}

//Redux state and actions dispatchers

const mapStateToProps = state =>{
  return{
      recipes: state.recipes.recipes,
      storage: state.ingredients.storage,
      warehouseIngredients: state.ingredients.warehouse,
      storageRecipeIngredients: state.ingredients.storageIngredients

  };
};

const mapDispatchToProps = dispatch =>{
  return{
    //Recipes
      getRecipes: () => dispatch(recipesActions.dispatchGetRecipes()),
      addRecipe: (builtRecipe) => dispatch(recipesActions.dispatchAddRecipe(builtRecipe)),
      modifyRecipe: (recipeId, modifiedRecipe) =>dispatch(recipesActions.dispatchModifyRecipe(recipeId, modifiedRecipe)),
      deleteRecipe: (recipeId) => dispatch(recipesActions.dispatchDeleteRecipe(recipeId)),
    //Storage
      getStorageIngredients: () => dispatch(ingredientsActions.dispatchGetStorageIngredients()),
      addStorageIngredient: (ingredientData) => dispatch(ingredientsActions.dispatchAddStorageIngredient(ingredientData)),

      //Storage ingredients recipe joint table
      addStorageIngredientRecipe: (newRecipe) => dispatch(ingredientsActions.dispatchAddStorageIngredientRecipe(newRecipe)),
      modifyStorageIngredientQuantity: (itemData) => dispatch(ingredientsActions.dispatchModifyStorageIngredientRecipe(itemData)),
      deleteStorageIngredientRecipe: (recipeId) => dispatch(ingredientsActions.dispatchDeleteStorageIngredientRecipe(recipeId)),
      
   //Warehouse   
      getWarehouseIngredients: () => dispatch(ingredientsActions.dispatchGetWarehouseIngredients()),
      addWarehouseIngredient: (ingredientData) => dispatch(ingredientsActions.dispatchAddWarehouseIngredient(ingredientData)),
    //Menu
      getMenuItems: () => dispatch(menuItemsActions.dispatchGetMenuItems()),
      addMenuItem: (newMenuItem) => dispatch(menuItemsActions.dispatchAddMenuItem(newMenuItem)),
      deleteMenuItem : (menuItemId) => dispatch(menuItemsActions.dispatchDeleteMenuItem(menuItemId))

  };
};


export default connect(mapStateToProps,mapDispatchToProps)(Recipes);

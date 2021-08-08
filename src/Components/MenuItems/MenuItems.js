import React from 'react'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Dish from './Dish'
import * as menuItemsActions from '../../store/actions/menuItemsActions'
import * as recipesActions from '../../store/actions/recipesActions'
import * as ingredientsActions from '../../store/actions/ingredientsActions'
import './MenuItems.css'




const MenuItems = (props) =>{

     //Declare a local state for each type of menu item
     const [mainMenuItems, setMainMenuItems] = useState([]);
     const [dessertMenuItems, setDessertMenuItems] = useState([]);
     const [drinkMenuItems, setDrinkMenuItems] = useState([]);
     

     //Get menu data once the component has finished loading
     useEffect(()=>{
        props.getRecipes();
        props.getStorageIngredients();
        props.getMenuItems();
        if(props.menuItems !==null && props.recipes !==null){
            filterItems();
        }
        
    },[]);

    //Call the filterItems once the component received info from the API
    useEffect(()=>{
        if(props.menuItems !==null && props.recipes !==null){
            filterItems();
        }  
    },[props.menuItems,props.recipes]);

    //Declare function to handle child data and pass it to the orders parent component
    const handleDishData = (dishData) =>{
        const data = dishData;
        props.passOrderData(data);
    }

    //Filter the menu items according to their type
    const filterItems = () =>{
        //Add time to cook to recipes
        const items = addTTC([...props.menuItems], [...props.recipes]);
        
        
        const mainDishItems = [...items.filter((item)=>{
            if (item.type === "main") {return true}
        })]
        

        const dessertDishItems = [...items.filter((item)=>{
            if (item.type === "dessert") {return true}
        })]


        const drinkDishItems = [...items.filter((item)=>{
            if (item.type === "drink") {return true}
        })]
        
        
        setMainMenuItems(mainDishItems);
        setDessertMenuItems(dessertDishItems);
        setDrinkMenuItems(drinkDishItems);
    }

    //Add time to cook to each menu item
    const addTTC =  (menuItemsArray, recipes) =>{
        
        menuItemsArray.map((menuItem)=>{
            recipes.filter((recipeItem)=>{
                if(recipeItem.name === menuItem.name){
                    menuItem.ttc = recipeItem.ttc;
                }
            })
        })

        return menuItemsArray;
    }

    //Render the view
    /* if(props.menuItems !==null && props.recipes !==null){ */
    const renderMenuItems = (menuItems) =>{
        if(props.menuItems && props.recipes){
            
            return(
                menuItems.map((item,index)=>{

                    return <Dish
                        passDishData = {handleDishData}
                        dishName = {item.name}
                        dishPrice = {item.price}
                        ttc = {item.ttc}
                        key = {index}
                        id = {Date.now() + Math.random()}
                        available={checkForAvailableIngredients(item.name)}
                    />
                }) 
            ) 
        }
    }

    //Check if all ingredients are available for a given dish
    const checkForAvailableIngredients = (recipeName)=>{
        
        //For each ingredient, check if it has available units
        if(props.recipes){
            //Get the specific recipe
            const recipe = props.recipes.filter(el=> el.name === recipeName)[0];

                if(recipe.ingredients){

                    //For each ingredient, check if its available in the kitchen storage
                    const allIngAvailable  = recipe.ingredients.every((rIng)=>{
                    const recipeIngName = Object.keys(rIng)[0]
                    const recipeIngValue = Object.values(rIng)[0]
                    //Get the ingredient in the storage
                    const ingredientStorage = props.storage.filter(sIng => sIng.name === recipeIngName)[0];
                    //If the quantity available is less than the needed quantity return false, else, return true
                    return ingredientStorage.availableUnits > recipeIngValue
                })
                return allIngAvailable;
            }
        }   
    };

    return(
        <div className="order-panel-entire-menu-container">
            <div className="order-panel-entire-menu">
                <div className="white-menu-section main-dishes">
                    <header>
                        <h4>Main dishes</h4>
                        <hr className="beige-line"></hr>
                        {renderMenuItems(mainMenuItems)}
                    </header>
                </div>
                <div className="white-menu-section desserts">
                    <header>
                        <h4>Desserts</h4>
                        <hr className="beige-line"></hr>
                        {renderMenuItems(dessertMenuItems)}
                    </header>
                </div>
                <div className="white-menu-section drinks">
                    <header>
                        <h4>Drinks</h4>
                        <hr className="beige-line"></hr>
                        {renderMenuItems(drinkMenuItems)}
                    </header>
                </div>
            </div>
        </div>
    )
}

//Redux state and actions dispatchers

const mapStateToProps = state =>{
    return{
        menuItems: state.menuItems.menuItems,
        recipes: state.recipes.recipes,
        storage:state.ingredients.storage
    };
};
  
const mapDispatchToProps = dispatch =>{
    return{
        getMenuItems: () => dispatch(menuItemsActions.dispatchGetMenuItems()),
        addMenuItem: (newMenuItem) => dispatch(menuItemsActions.dispatchAddMenuItem(newMenuItem)),

        getRecipes: () => dispatch(recipesActions.dispatchGetRecipes()),

        getStorageIngredients: () => dispatch(ingredientsActions.dispatchGetStorageIngredients())
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps)(MenuItems);
import * as ingredientsActions from '../actions/ingredientsActions';

const initState = {
    storage:null,
    warehouse:null,
    storageIngredients: null
}

const ingredientsReducer = (state = initState, action) =>{

    try {
        switch (action.type){

            //Get storage ingredients and add them to the global state
            case ingredientsActions.GET_STORAGE_INGREDIENTS:
                return {
                    ...state,
                    storage: action.ingredients
                }
    
            //Add new storage ingredient to the global state
            case ingredientsActions.ADD_STORAGE_INGREDIENT:
                return {
                    ...state,
                    storage: state.storage.concat(action.newStorageIngredientData)
                }
            
            //Modify storage ingredient in the global state
            case ingredientsActions.PUT_STORAGE_INGREDIENT:
            
                const ingredientIndex = state.storage.findIndex((ingredient)=>{
                    return ingredient.name === action.storageIngredientData.name
                })
    
                const newIngredientsArray = [...state.storage]
    
                newIngredientsArray[ingredientIndex] = action.storageIngredientData
                
    
                return {
                    ...state,
                    storage: newIngredientsArray
                }   
    
            //Delete storage ingredient from the global state
            case ingredientsActions.DELETE_STORAGE_INGREDIENT:
                
                return {
                    ...state,
                    storage: state.storage.filter((storageIngredient)=>{
                        return(
                            storageIngredient.name !== action.storageIngredientName
                        )
                    })
                }
    
            //Get ingredients from the storage ingredients table (joint with recipes)
            case ingredientsActions.GET_STORAGE_INGREDIENT_WRECIPE:
                return {
                    ...state,
                    storageIngredients: action.allStorageIngredientData
                }
    
    
            //WAREHOUSE/////////////////////////////////////////////////////
    
            //Get warehouse ingredients and add them to the global state
            case ingredientsActions.GET_WAREHOUSE_INGREDIENTS:
                return {
                    ...state,
                    warehouse: action.ingredients
                }
            
            //Add warehouse ingredient to the global state
            case ingredientsActions.ADD_WAREHOUSE_INGREDIENT:
                return {
                    ...state,
                    warehouse: state.warehouse.concat(action.newWarehouseIngredientData)
                }
    
            //Delete warehouse ingredient from the global state
            case ingredientsActions.DELETE_WAREHOUSE_INGREDIENT:
                
                return {
                    ...state,
                    warehouse: state.warehouse.filter((warehouseIngredient)=>{
                        return(
                            warehouseIngredient.name !== action.warehouseIngredientName
                        )
                    })
                }
        }
        
    } catch (error) {
        console.log("Error ocurred in ingredients reducer", error)
    }

    

    //Return state if none of the actions apply
    return state;
};

export default ingredientsReducer;
import * as storageApi from '../../Components/Ingredients/StorageApi';
import * as warehouseApi from '../../Components/Ingredients/WarehouseApi'

//DEFINE THE ACTIONS TO TRIGGER
export const GET_STORAGE_INGREDIENTS = 'GET_STORAGE_INGREDIENTS';
export const ADD_STORAGE_INGREDIENT = 'ADD_STORAGE_INGREDIENT';
export const PUT_STORAGE_INGREDIENT = 'PUT_STORAGE_INGREDIENT';
export const DELETE_STORAGE_INGREDIENT = 'DELETE_STORAGE_INGREDIENT';

export const GET_STORAGE_INGREDIENT_WRECIPE = 'GET_STORAGE_INGREDIENT_WRECIPE';
export const ADD_STORAGE_INGREDIENT_WRECIPE = 'ADD_STORAGE_INGREDIENT_WRECIPE';
export const PUT_STORAGE_INGREDIENT_WRECIPE = 'PUT_STORAGE_INGREDIENT_WRECIPE';
export const DELETE_STORAGE_INGREDIENT_WRECIPE = 'DELETE_STORAGE_INGREDIENT_WRECIPE';

export const GET_WAREHOUSE_INGREDIENTS = 'GET_WAREHOUSE_INGREDIENTS';
export const ADD_WAREHOUSE_INGREDIENT = 'ADD_WAREHOUSE_INGREDIENT';
export const PUT_WAREHOUSE_INGREDIENT = 'PUT_WAREHOUSE_INGREDIENT';
export const DELETE_WAREHOUSE_INGREDIENT = 'DELETE_WAREHOUSE_INGREDIENT';


//GET INGREDIENTS----------------------------------
export const getStorageIngredients = (ingredients)=>{
    return{
        type:GET_STORAGE_INGREDIENTS,
        ingredients:ingredients
    };
};

export const dispatchGetStorageIngredients = () =>{
    return async (dispatch) =>{
        const storageIngredientsData = await storageApi.getIngredients();
        dispatch(getStorageIngredients(storageIngredientsData));
    }
};

//ADD INGREDIENTS----------------------------------
export const addStorageIngredient = (storageIngredientData) =>{
    return {
        type:ADD_STORAGE_INGREDIENT,
        newStorageIngredientData:storageIngredientData
    }
};

export const dispatchAddStorageIngredient= (storageIngredientData) =>{
    return async (dispatch) =>{
        const data = await storageApi.addIngredient(storageIngredientData);
        if (data){
          return  dispatch(addStorageIngredient(data));
        }
    }
}

//MODIFY INGREDIENTS----------------------------------
export const modifyStorageIngredient = (storageIngredientData) =>{
    return {
        type:PUT_STORAGE_INGREDIENT,
        storageIngredientData:storageIngredientData
    }
};

export const dispatchModifyStorageIngredient = (storageIngredientData) =>{
    return async (dispatch) =>{
        const data = await storageApi.modifyAvailableUnits(storageIngredientData);
        if (data){
          return  dispatch(modifyStorageIngredient(data));
        }
    }
}


//DELETE INGREDIENTS----------------------------------
export const deleteStorageIngredient = (name) =>{
    return {
        type:DELETE_STORAGE_INGREDIENT,
        storageIngredientName:name
    }
};

export const dispatchDeleteStorageIngredient= (storageIngredientName) =>{
    return async (dispatch) =>{
        const data = await storageApi.deleteIngredient(storageIngredientName);
        if(data === 'OK'){
            dispatch(deleteStorageIngredient(storageIngredientName));
        }
    }
}

//GET STORAGE RECIPE INGREDIENTS

export const getAllStorageIngredientsRecipe = (allStorageIngredientData) =>{
    return {
        type:GET_STORAGE_INGREDIENT_WRECIPE,
        allStorageIngredientData:allStorageIngredientData
    }
};

export const dispatchGetAllStorageIngredientsRecipe = () =>{
    
    return async (dispatch) =>{
        const data = await storageApi.getAllStorageIngredientRecipe();
        dispatch(getAllStorageIngredientsRecipe(data));
    }
}

//ADD STORAGE RECIPE INGREDIENTS

export const addStorageIngredientRecipe = (newStorageIngredientData) =>{
    return {
        type:ADD_STORAGE_INGREDIENT_WRECIPE,
        newStorageIngredientData:newStorageIngredientData
    }
};

export const dispatchAddStorageIngredientRecipe = (newStorageIngredientData) =>{
    return async (dispatch) =>{
        const data = await storageApi.addStorageIngredientRecipe(newStorageIngredientData)
        dispatch(addStorageIngredientRecipe(data));
    }
}

//MODIFY STORAGE RECIPE INGREDIENTS

export const modifyStorageIngredientRecipe = (modifiedStorageIngredientData) =>{
    return {
        type:PUT_STORAGE_INGREDIENT_WRECIPE,
        modifiedStorageIngredientData:modifiedStorageIngredientData
    }
};

export const dispatchModifyStorageIngredientRecipe = (modifiedStorageIngredientData) =>{
    
    return async (dispatch) =>{
        const data = await storageApi.modifyStorageIngredientQuantity(modifiedStorageIngredientData);
        if(data === 'OK'){
            dispatch(modifyStorageIngredientRecipe(data));
        }
    }
}


//DELETE RECIPE INGREDIENTS----------------------------------
export const deleteStorageIngredientRecipe = (deletedRecipe) =>{
    return {
        type:DELETE_STORAGE_INGREDIENT_WRECIPE,
        deletedRecipe:deletedRecipe
    }
};

export const dispatchDeleteStorageIngredientRecipe = (recipeId) =>{
    
    return async (dispatch) =>{
        const data = await storageApi.deleteStorageIngredientRecipe(recipeId);

        if(data === 'OK'){
            dispatch(deleteStorageIngredientRecipe(data));
        }
    }
}


//WAREHOUSE///////////////////////////////////////////////////////////////////////

//GET WAREHOUSE INGREDIENTS----------------------------------------------------------
export const getWarehouseIngredients = (ingredients)=>{
    return{
        type:GET_WAREHOUSE_INGREDIENTS,
        ingredients:ingredients
    };
};

export const dispatchGetWarehouseIngredients = () =>{
    return async (dispatch) =>{
        const warehouseIngredientsData = await warehouseApi.getIngredients();
        dispatch(getWarehouseIngredients(warehouseIngredientsData));
    }
};

//ADD WAREHOUSE INGREDIENTS----------------------------------------------------------
export const addWarehouseIngredient = (warehouseIngredientData) =>{
    return {
        type:ADD_WAREHOUSE_INGREDIENT,
        newWarehouseIngredientData:warehouseIngredientData
    }
};

export const dispatchAddWarehouseIngredient= (warehouseIngredientData) =>{
    return async (dispatch) =>{
        const data = await warehouseApi.addIngredient(warehouseIngredientData);
        if(data){
          return  dispatch(addWarehouseIngredient(data));
        }
        
    }
}

//DELETE WAREHOUSE INGREDIENTS----------------------------------------------------------
export const deleteWarehouseIngredient = (name) =>{
    return {
        type:DELETE_WAREHOUSE_INGREDIENT,
        warehouseIngredientName:name
    }
};

export const dispatchDeleteWarehouseIngredient= (warehouseIngredientName) =>{
    return async (dispatch) =>{
        const data = await warehouseApi.deleteIngredient(warehouseIngredientName);
        if(data === 'OK'){
            dispatch(deleteWarehouseIngredient(warehouseIngredientName));
        }
    }
}
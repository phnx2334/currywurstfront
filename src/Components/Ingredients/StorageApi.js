import axios from 'axios'
import config from '../../config'

//Define main endpoint for the API
const requestEndpoint =  `${config.apiPort}/storage`;

console.log(`The request endpoint is ${requestEndpoint}`)

//Get all ingredients from the API
export const getIngredients = async () =>{

    let response = await axios.get(requestEndpoint).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}


//Add a new ingredient
export const addIngredient = async (ingredientData) =>{

    let response = await axios.post(requestEndpoint,ingredientData).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Modify storage available units
export const modifyAvailableUnits = async (ingData) =>{

    
    let response = await axios.put(requestEndpoint, ingData).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;

};

//Delete ingredient
export const deleteIngredient = async (ingredientId) =>{
 
    let response = await axios.delete(requestEndpoint+`/${ingredientId}`).then(response=> response.data).catch(error=>console.log(error));
     let data = await response;
 
     return data;
}


//TABLE INGREDIENTS STORAGE

//Get all ingredients from storage ingredients table
export const getAllStorageIngredientRecipe = async () =>{

    let response = await axios.get(requestEndpoint+`/ingredients`).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Add a new ingredient to the storage ingredients table
export const addStorageIngredientRecipe = async (ingredientData) =>{

    let response = await axios.post(requestEndpoint+`/ingredients`,ingredientData)
                                .then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}


//Modify ingredient in the storage ingredients table
export const modifyStorageIngredientQuantity = async (ingData) =>{

    let response = await axios.put(requestEndpoint+`/ingredients/${ingData.recipeId}/${ingData.ingredientName}/${ingData.quantity}`)
                                .then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;

};


//Delete an ingredient from the storage ingredients table
export const deleteStorageIngredientRecipe = async (recipeId) =>{

    let response  = await axios.delete(requestEndpoint+`/ingredients/${recipeId}`, {headers: {'Content-Type': 'application/json'}})
                            .then(response=> response.data).catch(error=>console.log(error));
    
    let data = await response;

    return data;
}
import axios from 'axios'
import config from '../../config'

//Define main endpoint for the API
const requestEndpoint =  `${config.apiPort}/recipes`;

console.log(`The request endpoint is ${requestEndpoint}`)

//Get all recipes from the API
export const getRecipes = async () =>{
    
    let response = await axios.get(requestEndpoint).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Get all the recipe ingredients from the ingredientsStorage table
export const getRecipeIngredients = async (recipeName) =>{
    
    let response = await axios.get(`${requestEndpoint}/ingredients/${recipeName}`)
                                .then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}


//Add a new recipe
export const addRecipe = async (recipeData) =>{
    
    let response = await axios.post(requestEndpoint,recipeData).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Update recipe
export const updateRecipe = async (recipeId,updatedRecipeData) =>{
        
    let response = await axios.put(requestEndpoint+`/${recipeId}`,updatedRecipeData,
    {headers: {'Content-Type': 'application/json'}}).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Delete recipe
export const deleteRecipe = async (recipeId) =>{
     
     let response = await axios.delete(requestEndpoint+`/${recipeId}`).then(response=> response.data).catch(error=>console.log(error));
     let data = await response;
 
     return data;
}


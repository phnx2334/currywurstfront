import axios from 'axios'
import config from '../../config'

//Define main endpoint for the API
const requestEndpoint =  `${config.apiPort}/warehouse`;

console.log(`The request endpoint is ${requestEndpoint}`)

//Get all warehouse ingredients 
export const getIngredients = async () =>{
    
    let response = await axios.get(requestEndpoint).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}


//Add a new ingredient to the warehouse
export const addIngredient = async (ingredientData) =>{
    
    let response = await axios.post(requestEndpoint,ingredientData).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Delete an ingredient from the warehouse
export const deleteIngredient = async (ingredientId) =>{
     
     let response = await axios.delete(requestEndpoint+`/${ingredientId}`).then(response=> response.data).catch(error=>console.log(error));
     let data = await response;
 
     return data;
}
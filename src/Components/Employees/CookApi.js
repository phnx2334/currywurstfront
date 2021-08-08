import axios from 'axios'
import config from '../../config'

//Define main endpoint for the API
const requestEndpoint =  `${config.apiPort}/cooks`;

console.log(`The request endpoint is ${requestEndpoint}`)

//Get all cooks from the API
export const getCooks = async () =>{

    let response = await axios.get(requestEndpoint).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}


//Add a new cook
export const addCook = async (cookData) =>{

    let response = await axios.post(requestEndpoint,cookData).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Update cook
export const updateCook = async (id,cookData) =>{

    let response = await axios.put(requestEndpoint+`/${id}`,cookData,
    {headers: {'Content-Type': 'application/json'}}).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Delete cook
export const deleteCook = async (id) =>{

    let response = await axios.delete(requestEndpoint+`/${id}`).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}


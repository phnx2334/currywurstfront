import axios from 'axios'
import config from '../../config'

//Define main endpoint for the API
const requestEndpoint =  `${config.apiPort}/menu`;

console.log(`The request endpoint is ${requestEndpoint}`)

//Get all menu items
export const getMenuItems = async () =>{

    let response = await axios.get(requestEndpoint).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}


//Add a new menu item
export const addMenuItem = async (newMenuItem) =>{
    
    let response = await axios.post(requestEndpoint,newMenuItem).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Update menu item
export const updateMenuItem = async (menuItemId,updatedMenuItem) =>{
    
    let response = await axios.put(requestEndpoint+`/${menuItemId}`,updatedMenuItem,{headers: {'Content-Type': 'application/json'}})
                                .then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Delete menu item
export const deleteMenuItem = async (menuItemId) =>{
    
    let response = await axios.delete(requestEndpoint+`/${menuItemId}`,{headers: {'Content-Type': 'application/json'}})
                               .then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}
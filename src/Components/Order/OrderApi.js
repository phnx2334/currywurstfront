import axios from 'axios'
import config from '../../config'

//Define main endpoint for the API
const requestEndpoint =  `${config.apiPort}/orders`

console.log(`The request endpoint is ${requestEndpoint}`)



//Get all orders from the API
export const getOrders = async () =>{
     
     let response = await axios.get(requestEndpoint).then(response=> response.data).catch(error=>console.log(error));
     let data = await response;
 
     return data;
}


//Place a new order
export const placeOrder = async (builtOrder) =>{
    
    let response = await axios.post(requestEndpoint,builtOrder).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Update order
export const updateOrder = async (orderId, modifiedOrder) =>{
    
    let response = await axios.put(requestEndpoint+`/${orderId}`,modifiedOrder,
    {headers: {'Content-Type': 'application/json'}}).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Delete specific order
export const deleteOrder = async (orderId) =>{
     
     let response = await axios.delete(requestEndpoint+`/${orderId}`).then(response=> response.data).catch(error=>console.log(error));
     let data = await response;
 
     return data;
}



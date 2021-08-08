import axios from 'axios'
import config from '../../config'

//Define main endpoint for the API
const requestEndpoint =  `${config.apiPort}/workers`;

console.log(`The request endpoint is ${requestEndpoint}`)


//Function to get all workers from the API
export const getWorkers = async () =>{
     
    let response = await axios.get(requestEndpoint).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}


//Add new worker
export const addWorker = async (workerData) =>{

    let response = await axios.post(requestEndpoint,workerData).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}

//Update worker
export const updateWorker = async (workerId, workerData) =>{
    
    let response = await axios.put(requestEndpoint+`/${workerId}`,workerData,
    {headers: {'Content-Type': 'application/json'}}).then(response=> response.data).catch(error=>console.log(error));
    
    let data = await response;

    return data;
}

//Delete worker
export const deleteWorker = async (id) =>{
    
    let response = await axios.delete(requestEndpoint+`/${id}`).then(response=> response.data).catch(error=>console.log(error));
    let data = await response;

    return data;
}


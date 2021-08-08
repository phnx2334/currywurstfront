import axios from 'axios'
import config from '../../config'


//Define main endpoint for the API
const requestEndpoint =  `${config.apiPort}/cookingPlan`

console.log(`The request endpoint is ${requestEndpoint}`)

//Get all CookingPlan entries from the API
export const getCookingPlan = async () =>{
    let response = await axios.get(requestEndpoint).then(response=> response.data).catch(error=>console.log(error))
    let data = await response

    return data
}

//Delete specific cooking plan entry ***not implemented yet
export const deleteCookingPlanItem = async (id) =>{
 let response = await axios.delete(requestEndpoint+`/${id}`).then(response=> response.data).catch(error=>console.log(error))
 let data = await response

 return data
}

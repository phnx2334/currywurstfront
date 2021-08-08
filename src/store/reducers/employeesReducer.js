import * as employeesActions from '../actions/employeesActions';

const initState = {
    cooks:null,
    workers:null
}

const employeesReducer = (state = initState, action) =>{

    try {
        switch (action.type){

            //Store cooks in the global state
            case employeesActions.GET_COOKS:
                return {
                    ...state,
                    cooks: action.cooks
                }
    
            //Add cook to the global state
            case employeesActions.ADD_COOK:
                return {
                    ...state,
                    cooks: state.cooks.concat(action.newCookData)
                }
    
            //Modify cook in the global state
            case employeesActions.PUT_COOK:
                
                const cookIndex = state.cooks.findIndex((cook)=>{
                    return cook.id === action.cookData.id
                })
    
                const newCookArray = [...state.cooks]
    
                newCookArray[cookIndex] = action.cookData
                
                return {
                    ...state,
                    cooks: newCookArray
                }  
    
            //Delete cook from the global state
            case employeesActions.DELETE_COOK:
                
                return {
                    ...state,
                    cooks: state.cooks.filter((cook)=>{
                        return(
                            cook.id !== action.cookId
                        )
                    })
                }
    
            //WORKERS ACTIONS
    
            //Store workers in global state
            case employeesActions.GET_WORKERS:
                return {
                    ...state,
                    workers: action.workers
                }   
    
            //Add worker to the global state
            case employeesActions.ADD_WORKER:
                return {
                    ...state,
                    workers: state.workers.concat(action.newWorkerData)
                }   
    
            //Modify cook in the global state
            case employeesActions.PUT_WORKER:
                
                const workerIndex = state.workers.findIndex((worker)=>{
                    return worker.id === action.workerData.id
                })
    
                const newWorkerArray = [...state.workers]
    
                newWorkerArray[workerIndex] = action.workerData
                
    
                return {
                    ...state,
                    workers: newWorkerArray
                }   
    
            //Delete worker from the global state
            case employeesActions.DELETE_WORKER:
                
                return {
                    ...state,
                    workers: state.workers.filter((worker)=>{
                        return(
                            worker.id !== action.workerId
                        )
                    })
                }
        }
        
    } catch (error) {
        console.log("Error ocurred in employees reducer", error)
    }
    
    //Return state if none of the actions apply
    return state;
};

export default employeesReducer;
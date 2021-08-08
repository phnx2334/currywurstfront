import * as cookApi from '../../Components/Employees/CookApi';
import * as workerApi from '../../Components/Employees/WorkerApi'


//DEFINE THE ACTIONS TO TRIGGER
export const GET_COOKS = 'GET_COOKS';
export const ADD_COOK = 'ADD_COOK';
export const PUT_COOK = 'PUT_COOK';
export const DELETE_COOK = 'DELETE_COOK';

export const GET_WORKERS = 'GET_WORKERS';
export const ADD_WORKER = 'ADD_WORKER';
export const PUT_WORKER = 'PUT_WORKER';
export const DELETE_WORKER = 'DELETE_WORKER';

//GET COOKS ---------------------------------------------
export const getCooks = (cooks)=>{
    return{
        type:GET_COOKS,
        cooks:cooks
    };
};

export const dispatchGetCooks = () =>{
    return async (dispatch) =>{
        const cooksData = await cookApi.getCooks();
        dispatch(getCooks(cooksData))
    }
};


//ADD COOKS ---------------------------------------------
export const addCook = (cookData) =>{
    return {
        type:ADD_COOK,
        newCookData:cookData
    }
};

export const dispatchAddCook = (cookData) =>{
    return async (dispatch) =>{
        const data = await cookApi.addCook(cookData)

        dispatch(addCook(data))
    }
}

//MODIFY COOKS ---------------------------------------------
export const modifyCook = (cookData) =>{
    return {
        type:PUT_COOK,
        cookData:cookData
    }
};

export const dispatchModifyCook = (cookId, cookData) =>{
    return async (dispatch) =>{
        const data = await cookApi.updateCook(cookId,cookData)

        dispatch(modifyCook(data))
    }
}

//DELETE COOKS ---------------------------------------------
export const deleteCook = (id) =>{
    return {
        type:DELETE_COOK,
        cookId:id
    }
};

export const dispatchDeleteCook = (cookId) =>{
    return async (dispatch) =>{
        const data = await cookApi.deleteCook(cookId)
        if(data === 'OK'){
            dispatch(deleteCook(cookId))
        }
    }
}


//WORKERS///////////////////////////////////////////////////////////////////////

//GET WORKERS ---------------------------------------------
export const getWorkers = (workers)=>{
    return{
        type:GET_WORKERS,
        workers:workers
    };
};

export const dispatchGetWorkers = () =>{
    return async (dispatch) =>{
        const workersData = await workerApi.getWorkers();
        dispatch(getWorkers(workersData))
    }
};

//ADD WORKERS ---------------------------------------------
export const addWorker = (workerData) =>{
    return {
        type:ADD_WORKER,
        newWorkerData:workerData
    }
};

export const dispatchAddWorker = (workerData) =>{
    return async (dispatch) =>{
        const data = await workerApi.addWorker(workerData)
        
        dispatch(addWorker(data))
    }
}

//MODIFY WORKERS ---------------------------------------------
export const modifyWorker = (workerData) =>{
    return {
        type:PUT_WORKER,
        workerData:workerData
    }
};

export const dispatchModifyWorker = (workerId, workerData) =>{
    return async (dispatch) =>{
        const data = await workerApi.updateWorker(workerId,workerData)
        
        dispatch(modifyWorker(data))
    }
}

//DELETE WORKERS ---------------------------------------------
export const deleteWorker = (id) =>{
    return {
        type:DELETE_WORKER,
        workerId:id
    }
};

export const dispatchDeleteWorker = (workerId) =>{
    return async (dispatch) =>{
        const data = await workerApi.deleteWorker(workerId)
        if(data === 'OK'){
            dispatch(deleteWorker(workerId))
        }
    }
}
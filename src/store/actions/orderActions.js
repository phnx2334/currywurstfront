import * as orderApi from '../../Components/Order/OrderApi'

//DEFINE THE ACTIONS TO TRIGGER
export const GET_ORDERS = 'GET_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const PUT_ORDER = 'PUT_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const SET_ORDER_STATUS = 'SET_ORDER_STATUS';



//GET ORDER--------------------------
export const getOrders = (orders)=>{
    return{
        type:GET_ORDERS,
        orders:orders
    };
};

export const dispatchGetOrders = () =>{
    return async (dispatch) =>{
        const ordersData = await orderApi.getOrders();
        dispatch(getOrders(ordersData));
    }
};

//ADD ORDER-------------------------
export const addOrder = (order)=>{
    return{
        type:ADD_ORDER,
        order:order
    };
};

export const dispatchAddOrder = (builtOrder) =>{
    return async (dispatch) =>{
        const orderData = await orderApi.placeOrder(builtOrder);
        
        if(orderData){
            dispatch(addOrder(orderData));
            return true;
        }else{
            return false;
        }
    }
};

//SET ORDER STATUS-------------------------
export const setOrderStatus = (status)=>{
    
    return{
        type:SET_ORDER_STATUS,
        status:status
    };
};

export const dispatchSetOrderStatus = (orderStatus) =>{
    
    return  (dispatch) =>{
        dispatch(setOrderStatus(orderStatus));
    }
};

//PUT ORDER (MODIFY)


//DELETE ORDER



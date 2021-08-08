import * as orderActions from '../actions/orderActions';

const initState = {
    orders:[]
}

const orderReducer = (state = initState, action) => {

    try {
        switch (action.type){
            //Get orders from the API and store them in the global state
            case orderActions.GET_ORDERS:
                return {
                    ...state,
                    orders: action.orders
                }
            
            //Add order to the global state
            case orderActions.ADD_ORDER:
                return {
                    ...state,
                    orders: state.orders.concat(action.order)
                }
        }
        
    } catch (error) {
        console.log("Error ocurred in orders reducer", error)
    }
    

    //Return state if none of the actions apply
    return state;
};

export default orderReducer;
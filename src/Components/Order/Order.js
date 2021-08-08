import React from 'react'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import MenuItems from '../MenuItems/MenuItems'
import * as orderActions from '../../store/actions/orderActions'
import './Order.css'



const Order =(props) =>{
    //Hide reject order message and disable place order button on component load
    useEffect(() => {
        const rejectElement = document.getElementById("rejectOrder");
        rejectElement.hidden = true;

        enablePlaceOrder();
    },[])

    //Declare state to handle the built order data
    const [builtOrder, setBuiltOrder] = useState({
        expectedDeliveryTime : "",
        orderItems:{}});
    
    //Declare state to reload the component and clear the fields once the order has been placed
    const [clearFields, setClearFields] = useState(new Date())

    //Function for handling the child data information
    const handleDishData = (childDishData) =>{

        //Get current state of the order
        let tempBuiltOrder = {...builtOrder};
        //Store current quantity of the item
        let quantity = builtOrder.orderItems[`${childDishData.dishName}`];
        if(isNaN(quantity)){quantity=0}

        if(childDishData.operation === "add"){
            tempBuiltOrder.orderItems[childDishData.dishName] = quantity+1;
        }else{
            quantity-=1;
            tempBuiltOrder.orderItems[childDishData.dishName] = quantity;
            //Delete item from built order if count reaches 0
            if(quantity == 0){
               delete  tempBuiltOrder.orderItems[childDishData.dishName];
            }
        }

       setBuiltOrder({...tempBuiltOrder});
       enablePlaceOrder();
    }

    //Handle the delivery time input
    const onSetDeliveryTime = (event) =>{
        let tempBuiltOrder = {...builtOrder};
        tempBuiltOrder.expectedDeliveryTime = event.target.value;
        setBuiltOrder({...tempBuiltOrder});
    }

    //Place the order dispatching the call to the API
    const placeOrder = async () =>{
        
        //Wait for response from the action thunk
        const orderReceived = await props.addOrder(builtOrder);
        
        //Get the elements to show/hide from the view
        const rejectElement = document.getElementById("rejectOrder");
        const orderNElement = document.getElementById("orderNumberHeader");
                
        //If the order was processed OK
        if(orderReceived){
            rejectElement.hidden = true;
            orderNElement.classList.remove("order-number-hidden");

            //Clear fields and built order state
            setBuiltOrder({
                expectedDeliveryTime : "",
                orderItems:{}});
            document.getElementById('order-prepping-time-number').value = '';
            
            setClearFields(new Date());
        //If the order was rejected
        }else{
            rejectElement.hidden = false;
            orderNElement.classList.add("order-number-hidden");
            //Show order not received message
            setTimeout(()=>{
                rejectElement.hidden = true;
                orderNElement.classList.remove("order-number-hidden");
            },2000)
        }
    }

    //Handle the click on the reset order button
    const resetOrder = () =>{
        setBuiltOrder({
            expectedDeliveryTime : "",
            orderItems:{}});
        document.getElementById('order-prepping-time-number').value = '';
        setClearFields(new Date())
    }
    /* if(props.cookingPlan !== null){ */
    const getOrderNumber = ()=>{
        if(props.cookingPlan){
            return props.cookingPlan.length + 1
        }else{
            return 1
        }
    };

    //Enable place order button if the order has items, disable if not
    const enablePlaceOrder = () => {
        const placeOrderButton = document.getElementById("order-placing-button");
        
        if(Object.keys(builtOrder.orderItems).length){
            placeOrderButton.removeAttribute("disabled");
        
        }else{
            placeOrderButton.setAttribute("disabled",true);
        }
    };


    return (
        <div className="order-panel">
            <div className="order-panel-inner-frame">
                <h2 className="order-panel-title">Place an order</h2>
                <p className="order-panel-description">Create orders and estimate prepping times</p>
                <hr className="green-line"></hr>

                <div className="order-header">
                    <span id="orderNumberHeader">
                        <h3 id="order-number"> {`Order n. ${getOrderNumber()}`}</h3>
                        <div className="order-time-inputs">
                            <p className="order-prepping-time">Expected delivery time: </p>
                            <input className="order-prepping-time" id="order-prepping-time-number" onChange={onSetDeliveryTime} type="time" />
                        </div>
                    </span>

                    <p className="rejected-order" id="rejectOrder">
                    <span>Sorry!  :(</span> 
                    We cannot deliver the order in the given time. 
                    <br></br>Try a different one.</p>
                    <hr className="white-line"></hr>
                </div>
                <div>
                    <MenuItems
                    passOrderData = {handleDishData}
                    key = {clearFields} />
                </div>
                <span className="order-panel-buttons">
                    <button id="order-canceling-button" onClick={resetOrder}>Reset Order</button>
                    <button id="order-placing-button" onClick={placeOrder}>Place an order</button>
                </span>
            </div>
        </div> 
    )
}


//Redux state and actions dispatchers

const mapStateToProps = state =>{
    return{
        orders: state.orders.orders,
        cookingPlan: state.cookingPlan.cookingPlan
    };
};
  
const mapDispatchToProps = dispatch =>{
    return{
        getOrders: () => dispatch(orderActions.dispatchGetOrders()),
        addOrder: (builtOrder) => dispatch(orderActions.dispatchAddOrder(builtOrder))
    };
};
  
  
  
export default connect(mapStateToProps,mapDispatchToProps)(Order);
import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux'
import OrderItem from './OrderItem'
import * as cookingPlanActions from '../../store/actions/cookingPlanActions'
import './CookingPlan.css'


const  CookingPlan = (props) => {

  //Get cooking plan items every time there is a new order
  useEffect(()=>{
       props.getCookingPlan();
  },[props.orders]);


  //Render cooking plan in reverse order using the child component OrderItem
  /* if(props.cookingPlan !== null){  */
  const renderCookingPlan = () =>{
    if(props.cookingPlan){ 
      const cpItems = [...props.cookingPlan]
      const len = cpItems.length;

      return (cpItems.reverse().map((item,index) =>{
          return(
            <OrderItem
            key={index}
            orderNumber = {len-index}
            ItemsNumberAndPrice = {item.orderItems}
            totalPrice = {item.totalPrice}
            orderTimeReceived ={item.timeReceived}
            orderDeliveryTime = {item.deliveryTime}/>
          )
        }) 
      )
    }
  }


  return (
    <div className="white-background">
        <div className="inner-frame">
            <header>
                <h2>Cooking plan</h2>
                <p className="white-background-description">Check orders in process in real time</p>
                <hr className="green-line"></hr>
            </header>
            <div className="green-background-container">
              <div className="orders-list green-background">
                {renderCookingPlan()}
              </div>
            </div>
            
        </div>
    </div>
  );
}


//Redux state and actions dispatchers

const mapStateToProps = state =>{
  return{
      cookingPlan: state.cookingPlan.cookingPlan,
      orders:state.orders.orders
  };
};

const mapDispatchToProps = dispatch =>{
  return{
      getCookingPlan: () => dispatch(cookingPlanActions.dispatchGetCookingPlan())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CookingPlan);


import React from 'react'
import './OrderItem.css'

const OrderItem =(props) =>{

    //Render each item from the order using the received props
    const renderOrderItems = (items) =>{
        const dishes = Object.entries(items);

       return  dishes.map((item, index) =>{
            return(
                <div className="order-item" key={index}>
                    <p className="order-item-quantity">{`${item[1].quantity} `}</p>
                    <p className="order-item-name">{item[0]}</p>
                    <p className="order-item-price">€ {item[1].price}</p>
                </div>
            )
        })

    };

    return(
        
        <div className="orderContainer">
            <div className="order-content">
                <span>
                    <h4 className="order-title">Order n. </h4>
                    <h4 id="order-number">{props.orderNumber}</h4>
                </span>
                <hr className="yellow-line line-1"></hr>
                {renderOrderItems(props.ItemsNumberAndPrice)}
                <hr className="yellow-line line-2"></hr>
            </div>
            <div className="order-details">
                <p className="order-detail-regular statement total">Total: </p>
                <span>
                    <p className="order-detail-regular coin">€</p>
                    <p className="order-detail-bold total-price">{props.totalPrice}</p>    
                </span>
                <p className="order-detail-regular statement">Order recieved at:</p>
                <span>
                    <p className="order-detail-bold hours" id="order-entry-time">{props.orderTimeReceived}</p>
                    <p className="order-detail-bold hours"> hs</p>
                </span>
                <p className="order-detail-regular statement">Order will be ready at: </p>
                <span>
                    <p className="order-detail-bold hours" id="order-delivery-time">{props.orderDeliveryTime}</p>
                    <p className="order-detail-bold hours"> hs</p>
                </span>
            </div>
        </div>
        
    )
}

export default OrderItem;
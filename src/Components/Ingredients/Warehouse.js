import React from 'react'
import './Ingredients.css';

const Warehouse = (props) => {
  return (
    <div className="wi-list-item-container">
     <div className="wi-list-item">
        <p className="wi-list-name">{props.name}</p>
        <p className="wi-list-capacity">{props.deliveryTime}</p>
     </div>
    </div>
  );
}

export default Warehouse;

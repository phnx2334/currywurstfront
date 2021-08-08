import React from 'react'
import { useState } from 'react'

const  Worker = (props) => {

  //Handle particular worker state
  const [worker, setWorker] = useState({
    name: props.name,
    capacity:props.capacity,
    modifiable:false});


  //Event handlers
  const onClickModify = () =>{
    
    setWorker({...worker, modifiable:!worker.modifiable});
    
    if(!worker.modifiable === false){
      props.modify(props.id,worker.name,worker.capacity);
    }
  }

  
  const onChangeName = (event) =>{
    let newName =event.target.value;
    setWorker({...worker, name:newName});
  }

  
  const onChangeCapacity = (event) =>{
    let newCapacity =event.target.value;
    setWorker({...worker, capacity:newCapacity});
  }


  //Input validations
  const  onKeyPressLetters = (e) => {
    const re = /[A-Za-z]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  const  onKeyPressNumbers = (e) => {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }


  //Choose wether the name and capacity fields are editable or not
  let nameField = worker.modifiable? 
    <input type="text" placeholder={props.name} onChange={onChangeName} onKeyPress={(event) => onKeyPressLetters(event)}></input> : 
    <p className="worker-name" id={`worker${props.id}name`}>{props.name}</p>

  let capacityField = worker.modifiable? 
    <input type="text" placeholder={props.capacity} onChange={onChangeCapacity} onKeyPress={(event) => onKeyPressNumbers(event)}></input> : 
    <p className="worker-capacity" id={`worker${props.id}capacity`}>{props.capacity}</p>

  return (
    <div className="worker-info">
        <p className="worker-number">{`${props.id}.`}</p>
        {nameField}
        {capacityField}

        <button className="worker-edit"
        onClick={() => onClickModify()}>Edit</button>
        <button className="worker-delete"
        onClick={() => props.delete(props.id)}>Delete</button>
    </div>
  );
}

export default Worker;
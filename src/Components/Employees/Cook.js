import React from 'react'
import { useState } from 'react';


const  Cook = (props) => {

  //Handle particular cook state
  const [cook, setCook] = useState({
    name: props.name,
    modifiable:false});

  //Event handlers
  const onClickModify = () =>{
    setCook({...cook, modifiable:!cook.modifiable});
    
    if(!cook.modifiable === false){

      const cookData = {
        name:cook.name,
        available:true
      }
      
      props.modify(props.id,cookData);
    }
  }
  
  const onChangeName = (event) =>{
    let newName =event.target.value;
    setCook({...cook, name:newName});
  }

  //Field imput validation
  const  onKeyPressLetters = (e) => {
    const re = /[A-Za-z]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }


  //Choose wether the name field is editable or not
  let nameField = cook.modifiable? 
    <input type="text" placeholder={props.name} onChange={onChangeName}  onKeyPress={(event) => onKeyPressLetters(event)}></input> : 
      <p className="cook-name" id={`cook${props.id}name`}>{props.name}</p>

  return (
    <div className="cook-info">
      <p className="cook-number">{`${props.id}.`}</p>
      {nameField}
      <button className="cook-edit" onClick={() => onClickModify()}>Edit</button> 
      <button className="cook-delete" onClick={() => props.delete(props.id)}>Delete</button>
    </div>
  );
}

export default Cook;
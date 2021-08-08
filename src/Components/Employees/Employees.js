import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Worker from './Worker'
import Cook from './Cook'
import * as employeesActions from '../../store/actions/employeesActions'
import yellowFork from '../../cssResources/yellow-fork.png'
import purpleFork from '../../cssResources/purple-fork.png'
import './Employees.css'


const  Employees = (props) => {

  //Declare state for both cooks and workers
  const [cookInfo, setCookInfo] = useState({
    name:'',
    available:true
  });
  const [workerInfo, setWorkerInfo] = useState({
    name:'',
    capacity:'',
    available:true
  });
  
  
  useEffect(()=>{
    //Obtain the data from the API dispatching Redux actions once the component loaded
    props.getCooks();
    props.getWorkers();

    //Deactivate add cook/worker buttons on load
    document.getElementById("add-cook").setAttribute("disabled", true);
    document.getElementById("add-worker").setAttribute("disabled", true);
  },[]);

  //Event handlers
  const onEnterCookName = (event)=>{
    setCookInfo({...cookInfo, name: event.target.value});

    if(event.target.value.length > 0 && props.cooks.length < 40){
      document.getElementById("add-cook").removeAttribute("disabled");
    }else{
      document.getElementById("add-cook").setAttribute("disabled", true);
    }
    
  };

  const onEnterWorkerName = (event)=>{
    setWorkerInfo({...workerInfo, name: event.target.value});
    const capacity = document.getElementById("workerCapacity").value;

    if(capacity > 0 && event.target.value && props.workers.length < 24){
      document.getElementById("add-worker").removeAttribute("disabled");
    }else{
      document.getElementById("add-worker").setAttribute("disabled",true);
    }
  };

  const onEnterWorkerCapacity = (event)=>{
    setWorkerInfo({...workerInfo, capacity: event.target.value});

    const workerName = document.getElementById("workerName").value;

    if(workerName.length && event.target.value > 0  && props.workers.length < 24){
      document.getElementById("add-worker").removeAttribute("disabled");
    }else{
      document.getElementById("add-worker").setAttribute("disabled", true);
    }
  };

  //Validations
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

  //CRUD
  const addNewCook = () =>{
    props.addCook(cookInfo);
    setCookInfo({
      name:'',
      available:true
    });
    document.getElementById("add-cook").setAttribute("disabled", true);
  }

  const addNewWorker = () =>{
    props.addWorker(workerInfo);
    setWorkerInfo({
      name:'',
      capacity:'', 
      available:true
    })
    document.getElementById("add-worker").setAttribute("disabled", true);
  };

  const deleteCook = async (id)  =>{
    props.deleteCook(id);
  }

  const deleteWorker = (id) =>{
    props.deleteWorker(id);
  }

  const modifyCook = async (id, cookData) =>{
    props.modifyCook(id,cookData);
  };

  const modifyWorker = async (id, workerName,workerCapacity) =>{
    
    const workerData = {
      name:workerName,
      capacity:workerCapacity,
      available:true
    }

    props.modifyWorker(id,workerData);
  };


  //Get cooks array from Redux state and render them to the DOM
  const renderCooks =  () =>{
    if (props.cooks){

      const cooksData = [...props.cooks];
      return(cooksData.map((cook) =>{
        return(
          <Cook
          id={cook.id}
          name = {cook.name}
          key = {cook.id}
          modify = {modifyCook}
          delete = {deleteCook}/>
        )
        })
      )
    }
  }

  //Get cooks array from Redux state and render them to the DOM
  const renderWorkers =  () =>{
    if (props.workers){
      const workersData = [...props.workers];
      return(workersData.map((worker) =>{
        return(
          <Worker
          id={worker.id}
          name = {worker.name}
          capacity = {worker.capacity}
          key = {worker.id}
          modify = {modifyWorker}
          delete = {deleteWorker}/>
        )
        })
      )
    }
  }


  //Determine number of available positions to add new employees
  const getSpotsAvailable = (type) =>{

    switch (type){
        case 'cook':
            if(props.cooks){
                return props.cooks.length;
            }
        break;
        
        case 'worker':
            if(props.workers){
                return props.workers.length;
            }
        break;

        default:
          return 0;
    }
  };


  return (
    <div>
        <div className="employees-section-header">
            <img className="yellow-fork" src={yellowFork} alt="yellow-fork"></img> 
            <div>
                <h1>Employees</h1>
            </div>
        </div>
        
        <div className="employees-section-background">
          <div className="create-new-cook-panel">
              <h2>Create new cook</h2>
              <img className="purple-fork" src={purpleFork} alt="purple-fork"></img> 
              <input type="text" placeholder="New cook's name"
              onChange={event => onEnterCookName(event)} onKeyPress={event => onKeyPressLetters(event)} value={cookInfo.name}
              /> 
              <button id="add-cook"
              onClick={() => addNewCook()}
              >Add cook</button>
          </div>
          
          <div className="create-new-worker-panel">
              <h2>Create new worker</h2>
              <img className="purple-fork" src={purpleFork} alt="purple-fork"></img> 

              <input id="workerName" 
                    className="write-workers-name" 
                    type="text" 
                    placeholder="New worker's name"
                    onChange={onEnterWorkerName}
                    onKeyPress={event => onKeyPressLetters(event)}
                    value={workerInfo.name}/>
              
              <input id="workerCapacity" 
                    className="write-workers-capacity" 
                    type="number" 
                    min="1"
                    placeholder="How many items can he/she carry?"
                    onChange={onEnterWorkerCapacity}
                    onKeyPress={event => onKeyPressNumbers(event)}
                    value={workerInfo.capacity}/>
              
              <button id="add-worker"
              onClick={() => addNewWorker()}>Add worker</button>
          </div>

          <div className="cooks-list-panel">
            <div className="cooks-list-yellow-frame">

              <h2>Cook's list</h2>

              <div className="cooks-list-yellow-tag">
                  <p>Spots available: </p>
                  <p id="number-of-open-spots-for-cooks">{40-getSpotsAvailable('cook')}</p>
              </div>
              <hr className="green-line"></hr>

              <div className="cooks-list-grid">
                <div className="cooks-list-grid-titles">
                  <p className="cook-number-title">n.</p>
                  <p className="cook-name-title">Name</p>
                </div>
                {renderCooks()}
              </div>
            </div>
          </div>

          <div className="workers-list-panel">
            <div className="workers-list-yellow-frame">
              <h2>Worker's list</h2>
              <div className="workers-list-yellow-tag">
                  <p>Spots available: </p>
                  <p id="number-of-open-spots-for-workers">{24-getSpotsAvailable('worker')}</p>
              </div>
              <hr className="green-line"></hr>
              <div className="workers-list-grid">
                <div className="worker-list-grid-titles">
                  <p className="worker-number-title">n.</p>
                  <p className="worker-name-title">Name</p>
                  <p className="worker-capacity-title">Capacity</p>
                </div>
                  {renderWorkers()}
              </div>
            </div>
          </div>
        </div>
   </div>  
  );
}


//Redux state and actions dispatchers

const mapStateToProps = state =>{
  return{
      cooks: state.employees.cooks,
      workers: state.employees.workers
  };
};

const mapDispatchToProps = dispatch =>{
  return{
      getCooks: () => dispatch(employeesActions.dispatchGetCooks()),
      addCook: (cookData) => dispatch(employeesActions.dispatchAddCook(cookData)),
      modifyCook: (id, cookData) =>dispatch(employeesActions.dispatchModifyCook(id, cookData)),
      deleteCook: (id) =>dispatch(employeesActions.dispatchDeleteCook(id)),

      getWorkers: () => dispatch(employeesActions.dispatchGetWorkers()),
      addWorker: (workerData) => dispatch(employeesActions.dispatchAddWorker(workerData)),
      modifyWorker: (id, workerData) =>dispatch(employeesActions.dispatchModifyWorker(id, workerData)),
      deleteWorker: (id) =>dispatch(employeesActions.dispatchDeleteWorker(id))
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Employees);

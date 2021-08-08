import React from 'react'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import * as employeesActions from '../../store/actions/employeesActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale } from '@fortawesome/free-solid-svg-icons'
import './EmployeesStatus.css'





const EmployeesStatus =(props) =>{
    //Declare local state for reloading the component
    const [reload, setReload] = useState(new Date());

    //Retreive data from the API once the component has finished loading
    useEffect(()=>{
        props.getCooks();
        props.getWorkers();
    },[]);

    //Set colors for cooks and workers when there's a change in the Redux state of cooks or workers
    useEffect(()=>{
        setColors();
    },[props.cooks, props.workers]);

    //Define a timeout function that re-renders the component to update the color if changed
    useEffect(()=>{
        setTimeout(() => {
            props.getCooks();
            props.getWorkers();
            setReload(new Date());
        }, 5000);
    },[props.cookingPlan, reload]);

    //Set the data for both workers and cooks depending on their status
    /* if (props.cooks !== null && props.workers !== null){ */
    const setColors = ()=>{
        if (props.cooks  && props.workers ){
            const cooksData = [...props.cooks];
            const workersData = [...props.workers];

            cooksData.map((cook, index)=>{
                const icon = document.getElementById(`cook${index+1}`);
                const container = document.getElementById(`cook${index+1}status`);
                const name = document.getElementById(`cook${index+1}name`);
                const recipes = document.getElementById(`cook${index+1}dishes`);

                
                //Set colors of icon and info container
                if(cook.available){
                    icon.classList.remove("busy-e");
                    icon.classList.add("available-e");
                    
                    container.classList.remove("busyContainer");
                    container.classList.add("availableContainer");
                }else{
                    icon.classList.remove("available-e");
                    icon.classList.add("busy-e");

                    container.classList.remove("availableContainer");
                    container.classList.add("busyContainer");
                } 

                //Set info container data
                name.innerHTML = cook.name;
                //Set recipes to cook
                if(cook.recipesToCook){recipes.innerHTML = Object.values(cook.recipesToCook).join(',')}
               
            })

            workersData.map((worker, index)=>{
                const icon = document.getElementById(`worker${index+1}`);
                const container = document.getElementById(`worker${index+1}status`);
                const name = document.getElementById(`worker${index+1}name`);
                const items = document.getElementById(`worker${index+1}items`);

                
                //Set colors of icon and info container
                if(worker.available){
                    icon.classList.remove("busy-e");
                    icon.classList.add("available-e");
                    
                    container.classList.remove("busyContainer");
                    container.classList.add("availableContainer");
                }else{
                    icon.classList.remove("available-e");
                    icon.classList.add("busy-e");

                    container.classList.remove("availableContainer");
                    container.classList.add("busyContainer");
                } 

                //Set info container data
                name.innerHTML = worker.name;
                //Set items to worker
                if(worker.items){items.innerHTML = Object.values(worker.items).join(',')}
               
            })
        }
    };

    //Render cooks and workers icons
    const renderCooksIcons = ()  => {

        let cooksDiagram = [];

        for(let i = 1; i<=40;i++){
            cooksDiagram.push(
                <div className="cook" id={`cook${i}`}>
                    <FontAwesomeIcon icon={faMale}/>
                    <div className="statusContainer" id={`cook${i}status`}>
                        <p id={`cook${i}name`}></p>
                        <p id={`cook${i}dishes`}></p>
                    </div>
                </div>
            )   
        }
        
        return cooksDiagram
    };


    const renderWorkersIcons = ()  => {

        let workersDiagram = [];

        for(let i = 1; i<=24;i++){
            workersDiagram.push(
                <div className="worker" id={`worker${i}`}>
                    <FontAwesomeIcon icon={faMale}/>
                    <div className="statusContainer" id={`worker${i}status`}>
                        <p id={`worker${i}name`}></p>
                        <p id={`worker${i}items`}></p>
                    </div>
                </div>
            )
        }
        
        return workersDiagram
    };

    //Determine number of available employees to show
    const getAvailableEmployees = (type) =>{

        switch (type){
            case 'cook':
                if(props.cooks){
                    return props.cooks.filter(cook => cook.available === true).length
                }
            break;
            
            case 'worker':
                if(props.workers){
                    return props.workers.filter(worker => worker.available === true).length
                }
            break;
        }

    };
    
    return (
        <div className="staff-status-background">
        <div className="yellow-frame">
            <header>
                <h2>Staff status</h2>
                <p className="white-background-description">Check your staff's availability</p>
                <hr className="green-line"></hr>
            </header>
            <div className="kitchen-header">
                <h3>Kitchen</h3>
                <div className="kitchen-white-highlight">
                    <p>Cooks available: </p>
                    <p id="cooks-available">{getAvailableEmployees('cook')}</p>
                </div>
            </div>

            <div className="kitchen-grid">
            <div className="table t1"></div>
            <div className="table t2"></div>
            <div className="table t3"></div>
            <div className="table t4"></div>
            <div className="table t5"></div>
                {renderCooksIcons()}
            </div>

            <div className="warehouse-header">
                <h3>Warehouse</h3>
                <div className="warehouse-white-highlight">
                    <p>Workers available: </p>
                    <p id="workers-available">{getAvailableEmployees('worker')}</p>
                </div>
            </div>

            <div className="warehouse-grid">
                <div className="shelf sh1"></div>
                <div className="shelf sh2"></div>
                <div className="shelf sh3"></div>
                {renderWorkersIcons()}
            </div>

            <footer>
                <span>
                    <hr className="green-line"></hr>
                    <span className="busy-e"><FontAwesomeIcon icon={faMale}/></span>
                    <p>Busy</p>
                    <span className="available-e"><FontAwesomeIcon icon={faMale}/></span>
                    <p>Available</p>
                    <span className="non-active"><FontAwesomeIcon icon={faMale}/></span>
                    <p>Spot available for new staff members</p>
                </span>
            </footer>
        </div>
    </div>
    )
}

//Redux state and actions dispatchers

const mapStateToProps = state =>{
    return{
        cooks: state.employees.cooks,
        workers: state.employees.workers,
        cookingPlan: state.cookingPlan.cookingPlan
    };
  };
  
  const mapDispatchToProps = dispatch =>{
    return{
        getCooks: () => dispatch(employeesActions.dispatchGetCooks()),

        getWorkers: () => dispatch(employeesActions.dispatchGetWorkers())
    
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesStatus);
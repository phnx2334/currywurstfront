import React from 'react'
import Order from '../Order/Order'
import CookingPlan from '../CookingPlan/CookingPlan'
import Status from '../EmployeesStatus/EmployeesStatus'
import yellowFork from '../../cssResources/yellow-fork.png'
import './Dashboard.css'

//Main dashboard components, calls components: EmployeesStatus, CookingPlan and Order
const Dashboard =() =>{
    
    return (
        <div className="purple-background">
            <div class="dashboard-section-header">
                <img class="yellow-fork" src={yellowFork} alt="yellow-fork"></img> 
                <div>
                    <h1>Dashboard</h1>
                </div>            
            </div>

            <div className="all-workers-status">
                <Status/>
           </div>
           <div className="all-cooking-plan" >
                <CookingPlan/>
           </div>
           <div className="all-orders">
                <Order/>
           </div>  
        </div>
    )
}

export default Dashboard;
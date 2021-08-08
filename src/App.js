import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMale,faCheck, faEuroSign, faCircle, faClock } from '@fortawesome/free-solid-svg-icons'
import Nav from './Components/Nav/Nav'
import Dashboard from './Components/Dashboard/Dashboard'
import Recipes from './Components/Recipes/Recipes'
import Employees from './Components/Employees/Employees'
import Ingredients from './Components/Ingredients/Ingredients'
import About from './Components/About/About'
import './App.css';


//Add icons from Fortawesome
library.add(faMale, faCheck, faEuroSign, faCircle, faClock);


function App() {

  //Define react router to handle the redirections in the app
  return (
    <Router>
      <div className="App">
      <Nav/>
      <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/recipes" exact component={Recipes}/>
        <Route path="/ingredients" exact component={Ingredients}/>
        <Route path="/employees" exact component={Employees}/>
        <Route path="/about" exact component={About}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;

import React from 'react'
import yellowFork from '../../cssResources/yellow-fork.png'
import bigFork from '../../cssResources/big-beige-fork.png'
import './About.css'

function About() {
  return (
    <div>
        <div class="about-section-header">
            <img class="yellow-fork" src={yellowFork} alt="yellow-fork"></img> 
            <div>
                <h1>About Currywurst</h1>
            </div>
        </div>
        <div class="about-section-background">
            <p>Currywurst is an app for restaurant management<br></br>
            developed by <span>Carlos Indriago.</span></p>
            <p>The application uses the following technologies:</p>
            <ul>
              <li>Spring Boot</li>
              <li>H2 Database</li>
              <li>JPA</li>
              <li>Lombok</li>
              <li>Swagger <br></br>(exposed at http://localhost:8888/swagger-ui/ running the API locally)</li>
              <li>React Js</li>
            </ul>
          <img className="big-beige-fork" src={bigFork} alt="big-beige-fork"></img> 
        </div>
    </div>
  );
}

export default About;

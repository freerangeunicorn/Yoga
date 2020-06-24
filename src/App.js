import React from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Teacher from "./components/Teacher";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Student from "./components/Student";
/* import Footer from "./components/Footer"; */
import TeacherSignUp from "./components/TeacherSignUp";

function App() {
  
/*   const getTeacher = async () => { 
  const url = 'http://localhost:3000/api/teacher'
  try {
    const header = new Headers();
    header.append('Accept', 'application/json')
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

    });
    console.log(response)
    const data = await response.json();
    
     console.log(data);
  } catch (error) {
    console.log(error)
  }
} */
  return (
    
  <div>
    <div>
      <Router>
        <NavBar/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/teacher" component={Teacher} />
            <Route path="/student" component={Student} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/teachersignup" component={TeacherSignUp} />
            {/* <Route path="/teachersignup" component={} /> */}
          </Switch>
          </Router>
        </div>
        {/* <Footer /> */}
     
    </div>
  );
}

export default App;

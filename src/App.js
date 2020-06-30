import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Teacher from "./components/Teacher";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Student from "./components/Student"; 
import TeacherSignUp from "./components/TeacherSignUp";
import StudentSignUp from "./components/StudentSignUp";
import Footer from "./components/Footer";
import Login from "./components/Login";


function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/teacher" component={Teacher} />
            <Route path="/student" component={Student} />
            <Route path="/login" component={Login} />
            <Route path="/signupteacher" component={TeacherSignUp} />
            <Route path="/signupstudent" component={StudentSignUp} />
          </Switch>
          </Router>
        </div>
        <Footer />
     
    </div>
  );
}


export default App;

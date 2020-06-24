import React from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Teacher from "./components/Teacher";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Student from "./components/Student";
import Footer from "./components/Footer";

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
          </Switch>
          </Router>
        </div>
        <Footer />
     
    </div>
  );
}

export default App;

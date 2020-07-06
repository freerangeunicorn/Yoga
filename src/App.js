import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import TeacherSignUp from "./components/TeacherSignUp";
import StudentSignUp from "./components/StudentSignUp";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Context from "./components/Context";
import StudentLogin from "./components/StudentLogin";
import TeacherProfile from "./components/TeacherProfile";



function App() {
  return (
<Context>
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <NavBar />
          <Switch>
          
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/studentlogin" component={StudentLogin} />
            <Route path="/signupteacher" component={TeacherSignUp}/>
            <Route path="/teacherprofile" component={TeacherProfile}/>

            <Route path="/signupstudent" component={StudentSignUp} />
          </Switch>
          </Router>
        </div>
        <Footer />
     
    </div>
    </Context>
  );
}


export default App;

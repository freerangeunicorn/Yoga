import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import TeacherSignUp from './components/TeacherSignUp';
import StudentSignUp from './components/StudentSignUp';
import Footer from './components/Footer';
import Login from './components/Login';
import { TokenProvider } from './components/Context';
import StudentLogin from './components/StudentLogin';
import TeacherProfile from './components/TeacherProfile';
import StudentProfile from './components/StudentProfile';




function App() {
  return (
<TokenProvider>
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
            <Route path="/studentprofile" component={StudentProfile}/>
            <Route path="/signupstudent" component={StudentSignUp} />
          </Switch>
          </Router>
        </div>
        <Footer />
    </div>
    </TokenProvider>
  );
}


export default App;

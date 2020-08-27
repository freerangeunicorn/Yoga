import React from 'react';
import {useContext} from 'react';
import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { TokenContext } from "./Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { useHistory} from "react-router-dom";



function NavBar() {
  const [token, setToken] = useContext(TokenContext);
  const history = useHistory();
  const handleLogOut = () => {
    setToken(null);
    history.push("/");
  }

  return (
    <div>
    <Navbar expand="lg">
  <Navbar.Brand href="#home"> YOGIC <FontAwesomeIcon icon={faSeedling} /> </Navbar.Brand> {/* import lotus icon */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="./.">Home</Nav.Link>
          {!token &&
          <React.Fragment>
          <NavDropdown title="Login" id="collasible-nav-dropdown">
        <NavDropdown.Item href="./login">As a teacher {token}  
         </NavDropdown.Item>
  <NavDropdown.Item href="./studentlogin">Student {token}</NavDropdown.Item>
      </NavDropdown>
          <NavDropdown title="Signup" id="collasible-nav-dropdown">
        <NavDropdown.Item href="./signupteacher">Teacher </NavDropdown.Item>
        <NavDropdown.Item href="./signupstudent">Student</NavDropdown.Item>
      </NavDropdown>
      </React.Fragment>
        }
        {token && <Button variant="outline-light" onClick= {() => handleLogOut()}>Log out</Button>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default NavBar;

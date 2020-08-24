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



function NavBar() {
  const [token, setToken] = useContext(TokenContext);
  return (
    <div>
    <Navbar expand="lg">
  <Navbar.Brand href="#home"> YOGIC <FontAwesomeIcon icon={faSeedling} /> </Navbar.Brand> {/* import lotus icon */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
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
        {token && <Nav.Link href="./.">Logout</Nav.Link>}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default NavBar;

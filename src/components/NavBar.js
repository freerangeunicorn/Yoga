import React from "react";
/* import {Link} from "react-router-dom"; */
import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";


function NavBar() {
  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">YOGIC</Navbar.Brand> {/* home */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="./.">Home</Nav.Link>
          <NavDropdown title="Login" id="collasible-nav-dropdown">
        <NavDropdown.Item href="./login">As a teacher </NavDropdown.Item>
        <NavDropdown.Item href="./studentlogin">Student</NavDropdown.Item>
      </NavDropdown>
          <NavDropdown title="Signup" id="collasible-nav-dropdown">
        <NavDropdown.Item href="./signupteacher">Teacher </NavDropdown.Item>
        <NavDropdown.Item href="./signupstudent">Student</NavDropdown.Item>
      </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-dark">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default NavBar;

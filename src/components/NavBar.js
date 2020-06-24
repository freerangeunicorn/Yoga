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
            <Nav.Link href="./teacher">Teach a class</Nav.Link>
            <Nav.Link href="./student">Take a class</Nav.Link>
            <Nav.Link href="./login">Login</Nav.Link>
            <NavDropdown title="Signup" id="collasible-nav-dropdown">
              <NavDropdown.Item href="./studentsignup">
                Student signup
              </NavDropdown.Item>
              <NavDropdown.Item href="./teachersignup">
                Teacher signup
              </NavDropdown.Item>
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

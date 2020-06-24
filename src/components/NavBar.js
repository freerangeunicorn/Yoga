import React from "react";
/* import {Link} from "react-router-dom"; */
import {
  Button,
  Navbar,
  Nav,
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
          <Nav.Link href="./teacher">Teacher</Nav.Link>
          <Nav.Link href="./student">Student</Nav.Link>
          <Nav.Link href="#signup">Is this necessary?</Nav.Link>
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

import React from "react";
import { Card, Nav, Button} from 'react-bootstrap';





function Teacher() {
  return (
    <div>
    <Card>
    <Card.Header>
      <Nav variant="tabs" defaultActiveKey="#first">
        <Nav.Item>
          <Nav.Link href="./teacherprofile">My profile</Nav.Link>
  
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#first">My Schedule</Nav.Link>  
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#disabled">
            Schedule
          </Nav.Link>
        </Nav.Item>   
      </Nav>
    </Card.Header>
    <Card.Body>
      <Card.Title> Teaching appointments </Card.Title>
      <Card.Text> Here, add schedule and a list of classes/appointments.1. display schedule so you can click and choose the date you like to create a class.
      </Card.Text>
    </Card.Body>
  </Card>
    </div>
  );
}
export default Teacher;

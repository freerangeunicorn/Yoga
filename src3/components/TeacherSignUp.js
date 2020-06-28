import React from 'react';
import {Form, Col, Button} from 'react-bootstrap';


function TeacherSignUp() {
    return (
        <div>
            <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>


    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridName1">
    <Form.Label>First Name</Form.Label>
    <Form.Control placeholder="First Name" />
  </Form.Group>

  <Form.Group controlId="formGridName2">
    <Form.Label>Last Name</Form.Label>
    <Form.Control placeholder="Last Name" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridTime">
      <Form.Label>Default time zone</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridExperience">
      <Form.Label>Teaching Experience</Form.Label>
      <Form.Control as="select" defaultValue="Choose...">
        <option>Years of Experience</option>
        <option>1 year</option>
        <option>2 years</option>
        <option>3 years</option>
      </Form.Control>
    </Form.Group>
  </Form.Row>

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="I agree to these terms"/>
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        </div>
    )
}
export default TeacherSignUp;
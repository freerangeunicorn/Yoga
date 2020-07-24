import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import {useState, useEffect} from 'react';


function StudentSignUp() {
  const [emailAddress, setEmailAddress] = useState();
  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [pWord, setPWord] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onSubmit = async () => {
    console.log("submit");
    
    const url = 'http://localhost:3000/api/student'
    const studentData = {
      first_name: fName,
      last_name: lName,
      password: pWord,
      email: emailAddress,
    
    }
    console.log(JSON.stringify(studentData))
    try {
      const header = new Headers();
      header.append('Accept', 'application/json')
      const response = await fetch(url, { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        withCredentials: true,
        body: JSON.stringify(studentData)
      });
      console.log(response);
      const data = await response.json();
      
       console.log(data);
    } catch (error) {
      console.log('error')
      console.log(error)
    }
  }

  return (
    <div className='d-flex justify-content-center'>
      <Form>
        <Form.Row>
          <Col>
          <Form.Label>First Name</Form.Label>
            <Form.Control required
            value={fName}
            onChange={(event) => setFName(event.target.value)}
            placeholder="First name" />
          </Col>
          <Col>
          <Form.Label>Last Name</Form.Label>
            <Form.Control 
            required
            value={lName}
            onChange ={(event) => setLName(event.target.value)}
            placeholder="Last name" />
          </Col>
        </Form.Row>
        <Form.Group 
        controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          required
          value = {emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
          type="email" 
          placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          required
          value={pWord}
          onChange={(event) => setPWord(event.target.value)}
           type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="dark" onClick={()=> onSubmit()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default StudentSignUp;

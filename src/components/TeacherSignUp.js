import React from "react";
import { Form, Col, Button, Toast, ToastBody } from "react-bootstrap";
import { useState, useEffect } from "react";
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';


function TeacherSignUp() {
  const [email, setEmail] = useState();
  const [experience, setExperience] = useState(1);
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [timeZone, setTimeZone] = useState('Europe/Stockholm');
  const [showToast, setShowToast] = useState(false);
  

  useEffect(() => {
    if (password === password2) {
      setShowToast(false);
    } else {
      setShowToast(true);
    }
  }, [password, password2]);


  const onExperience = (value) => {
    /* console.log(value) */
    const years = Number(value);
    if (Number.isNaN(years)) {
      console.log("NaN");
      setExperience(0);
    } else {
      setExperience(years);
    }
  };


  const onSubmit = async() => {
  
  
    const url = 'http://localhost:3000/api/teacher'
    const teacherData = {
      first_name: firstName,
      last_name: lastName,
      password: password,
      email: email,
      years_experience: experience,
      default_timezone: timeZone,
    }
    console.log(JSON.stringify(teacherData))
    
    try {
      const header = new Headers();
      header.append('Accept', 'application/json');
      header.append('Content-type','application/json');
      const response = await fetch(url, { 
        method: 'POST',
        headers: header, 
        //withCredentials: true,
        body: JSON.stringify(teacherData)
      });
      console.log(response);
      const data = await response.json();
      
       console.log(data);
    } catch (error) {
      console.log('error')
      console.log(error)
    }
  }

  const onPassword = (value) => {
    console.log(password);
    console.log(password2);
  };
  return (
    <div className='d-flex justify-content-center'>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Toast show={showToast} animation={false}>
            <Toast.Body>Your password doesn't match!</Toast.Body>
          </Toast>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              value={password2}
              onChange={(event) => {
                setPassword2(event.target.value);
              }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridName1">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First Name"
          />
        </Form.Group>

        <Form.Group controlId="formGridName2">
          <Form.Label>Last Name</Form.Label>
          <Form.Control required
           value={lastName}
           onChange={(event) => setLastName(event.target.value)} placeholder="Last Name" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridTime">
            <Form.Label>Default Timezone</Form.Label>
            <TimezonePicker
  absolute      = {false}
  defaultValue  = {timeZone}
  placeholder   = "Select timezone..."
  onChange      = {(timeZone)=>setTimeZone(timeZone)}
/>
          </Form.Group>

          <Form.Group controlId="formGridExperience">
            <Form.Label>Years of Experience</Form.Label>
            <Form.Control
              required
              value={experience}
              onChange={(event) => onExperience(event.target.value)}
              placeholder="Enter a number"
            />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check required
          type="checkbox" label="I agree to these terms" feedback="You must agree before submitting." />
        </Form.Group>

        <Button variant="dark" onClick={() => onSubmit()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}



export default TeacherSignUp;

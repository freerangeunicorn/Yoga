import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import {useState, useEffect } from "react";



function Login() {
const [email, setEmail] = useState()
const [password, setPassword] = useState();
const onSubmit = async () => {
    console.log("login");
    
    const url = 'http://localhost:3000/api/login/teacher'
    const login = {
    
      password: password,
      email: email,
    }
    console.log(JSON.stringify(login))
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
        body: JSON.stringify(login)
      });
      console.log(response);
      for (var pair of response.headers.entries()) {
        console.log(pair[0]+ ': '+ pair[1]);
     }
      const data = await response.json();
      
       console.log(data);
    } catch (error) {
      console.log('error')
      console.log(error)
    }
  }


    return (
        <div>
       <Form>
        <Form.Group 
        controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          required
          value = {email}
          onChange={(event) => setEmail(event.target.value)}
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
           type="password" placeholder="Password" />
        </Form.Group>
        
        <Button variant="dark" onClick={()=> onSubmit()}>
          Submit
        </Button>
      </Form>
        </div>
    )
}

export default Login;
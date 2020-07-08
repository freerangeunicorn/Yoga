import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
//import { TokenContext } from "./Context";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show,setShow]=useState(false);
  const [errorMessage, setErrorMessage] = useState('Something went wrong');
  const history=useHistory();


  const onSubmit = async () => {
  
    console.log("login");

    const url = "http://localhost:3000/api/login/teacher";
    const login = {
      password: password,
      email: email,
    };
    console.log(JSON.stringify(login));
    try {
      const header = new Headers();
      header.append("Accept", "application/json");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(login),
      });

      const data = await response.json();
      console.log();
      if (data.access_token){
        history.push('/teacherprofile', {data})
      } 
      else {
        setShow(true);
        setErrorMessage('Login failed, try your luck one more time')
      }
      //token.setToken(data.access_token);


      console.log(data);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  return (
    
    <div className="d-flex justify-content-center">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter teacher email"
          />
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
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="dark" onClick={() => onSubmit()}>
          Submit
        </Button>
      </Form>
      <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {errorMessage}
        </p>
      </Alert>
    </div>

  );
}

export default Login;

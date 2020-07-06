import React from "react";
import { Form, Button} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import Context from "./Context";

function StudentLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const token = useContext(Context);

  const onSubmit = async () => {
    console.log("Studenlogin");

    const url = "http://localhost:3000/api/login/student";
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
      console.log(token);
      console.log(data);
      token.setToken(data.access_token);

    

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
            placeholder="Enter email"
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
    </div>
  );
}

export default StudentLogin;

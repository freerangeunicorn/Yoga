import React from "react";
import { Card, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { TokenContext } from "./Context";
import { useHistory } from "react-router-dom";

function StudentProfile() {
  const [studentData, setStudentData] = useState({}); // check the backend code for GET studentdata
  const [show, setShow] = useState(false);
  const [token, setToken] = useContext(TokenContext);
  const history = useHistory();

  useEffect(() => {
    const url = "http://localhost:3000/api/student"; // buy a domain name and change this url
    const header = new Headers();
    header.append("Accept", "application/json");
    header.append("Content-type", "application/json");
    header.append("Authorization", `Bearer ${token}`);
    fetch(url, {
      method: "GET",
      headers: header,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data[0].id) {
          console.log(data);
          setStudentData(data[0]);
        } else if (data.msg === "Missing Authorization Header") {
          history.push("/studentlogin");
        }
      })
      .catch((error) => {
        setShow(true);
        console.log("error");
        console.log(error);
      });

    return () => {
      console.log("unsubscribe");
    };
  }, [token, history]);

  return (
    <div className="parentcontainer">
      <Card className="text-center">
        <Card.Header>Upcoming class</Card.Header>
        <Card.Body>
          <Card.Title>
            {studentData.first_name} {studentData.last_name}{" "}
          </Card.Title>
          <Card.Text>Next class:</Card.Text>
          <Button variant="dark">Enter</Button>
        </Card.Body>
        <Card.Footer className="text-muted">Previous</Card.Footer>
      </Card>
    </div>
  );
}

export default StudentProfile;

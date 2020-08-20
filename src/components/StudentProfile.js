import React from "react";
import { Card, Button, Tab, TabContent, Tabs, ListGroup } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { TokenContext } from "./Context";
import { useHistory } from "react-router-dom";

function StudentProfile() {
  const [studentData, setStudentData] = useState({}); // check the backend code for GET studentdata
  const [show, setShow] = useState(false);
  const [token, setToken] = useContext(TokenContext);
  const [yogaClass, setYogaClass] = useState([]);
  const history = useHistory();
  console.log("show me data; yoga class", yogaClass);
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

  const getClasses = async () => {
    console.log("SUP");
    const url = "http://localhost:3000/api/yogaclass"; // buy a domain name and change this url
    const header = new Headers();
    header.append("Accept", "application/json");
    header.append("Content-type", "application/json");
    header.append("Authorization", `Bearer ${token}`);

    fetch(url, {
      method: "GET",
      headers: header,
    })
      .then((response) => {
        console.log("2PAC", response);
        return response.json();
      })
      .then((data) => {
        setYogaClass(data);
        console.log("YOOOOO", data);
      })
      .catch((error) => {
        setShow(true);
        console.log("error");
        console.log(error);
      });
  };


  const book = async (id) => {
    console.log("SUPPERMAN", id);
    const url = "http://localhost:3000/api/bookclass"; // buy a domain name and change this url
    const header = new Headers();
    header.append("Accept", "application/json");
    header.append("Content-type", "application/json");
    header.append("Authorization", `Bearer ${token}`);

    fetch(url, {
      method: "PUT",
      headers: header,
      body: JSON.stringify({id: id}),
    })
  
      .catch((error) => {
        setShow(true);
        console.log("error");
        console.log(error);
      });
  };

  return (
    <div className="parentcontainer">
      <Tabs
        defaultActiveKey="studentClasses"
        id="studentProfile"
        onSelect={(event) => {
          if (event === "allClasses") {
            getClasses();
          }
        }}
      >
        <Tab eventKey="studentClasses" title="Student Classes">
          <TabContent>
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
          </TabContent>
        </Tab>
        <Tab eventKey="allClasses" title="Book a class">
        <Card>
       
       {yogaClass.map((yogaClass, index) => (
         <React.Fragment>
       <Card.Header>{yogaClass.title} </Card.Header>
      
 <Card.Body>
   <Card.Title>Level:{yogaClass.level} </Card.Title>
    <ListGroup variant="flush">
       <ListGroup.Item> Teacher:{yogaClass.first_name} {yogaClass.last_name}</ListGroup.Item>
       <ListGroup.Item> Years of experience:{yogaClass.years_experience}</ListGroup.Item>
    <ListGroup.Item> Time:{yogaClass.time}</ListGroup.Item>
   <ListGroup.Item>Price: {yogaClass.price}</ListGroup.Item>
       <ListGroup.Item>Date: {yogaClass.date}</ListGroup.Item>
 <ListGroup.Item>Style: {yogaClass.style}</ListGroup.Item>
       <ListGroup.Item>Duration: {yogaClass.duration} minutes</ListGroup.Item>
 </ListGroup> 
   <Card.Text>
     Description: {yogaClass.description}
   </Card.Text>
   <Button onClick={() => {book(yogaClass.id)}} variant="success">Book</Button>

 </Card.Body>
 </React.Fragment>
))}
</Card>
          <TabContent />
        </Tab>
      </Tabs>
    </div>
  );
}

export default StudentProfile;

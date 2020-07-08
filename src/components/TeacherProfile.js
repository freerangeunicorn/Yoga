import React, {useEffect, useState} from 'react';
import { Card, Nav, Button, Alert} from "react-bootstrap";
import {useHistory, useLocation} from "react-router-dom";
import { TokenContext } from "./Context";


function TeacherProfile() {
  const [teacherData, setTeacherData]=useState({});
  const [show, setShow ] = useState(false);
  const [token, setToken] = useState(TokenContext);
  const history = useHistory();
  
  const location = useLocation();
    

    useEffect(()=> {
      const token = location.state.data.access_token
      const url = 'http://localhost:3000/api/teacher' // buy a domain name and change this url
      const header = new Headers();
      header.append('Accept', 'application/json');
      header.append('Content-type','application/json');
      header.append('Authorization', `Bearer ${token}`)
      fetch(url, { 
        method: 'GET',
        headers: header, 
      
      })
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        if (data[0].id) {
          console.log(data)
        setTeacherData(data[0]);
  
        }
        else if (data.msg==="Missing Authorization Header") {
          history.push('/login')
        }

      })
      .catch((error)=>{
        setShow(true);
        console.log('error')
        console.log(error)

      })
  
      return () => {
        console.log("unsubscribe")}
    },[location, history ]);

 
    return (
        <div>

            <Card>
  <Card.Header>
    <Nav variant="tabs" defaultActiveKey="#first">
      <Nav.Item>
        <Nav.Link href="#first">My profile</Nav.Link>

      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#link">Classes</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#second">
          Schedule
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </Card.Header>
  <Card.Body>
    <Card.Title> Name: {teacherData.first_name} {teacherData.last_name}</Card.Title>
    <Card.Text> Years of Experience :
      {teacherData.years_experience}
    </Card.Text>
    <Button variant="dark">SAVE</Button>
  </Card.Body>
</Card>
<Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          'Something went wrong'
        </p>
      </Alert>
            
        </div>
    )
}
export default TeacherProfile;
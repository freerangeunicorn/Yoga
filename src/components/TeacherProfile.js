import React, { useEffect, useState, useContext } from "react";
import { Card, Tabs, Tab, Button, Alert, TabContent } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TokenContext } from "./Context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TeacherProfile() {
  const [teacherData, setTeacherData] = useState({});
  const [show, setShow] = useState(false);
  const [token, setToken] = useContext(TokenContext);
  const history = useHistory();
  const [date, setDate] = useState(new Date());
  const handleChange = (date) => setDate(date);
  const today = new Date();
  let in30Days = new Date();
  in30Days.setDate(in30Days.getDate() + 30);

  const CustomInput = ({ value, onClick }) => (
    <button onClick={onClick}>{value}</button>
  );

  useEffect(() => {
    const url = "http://localhost:3000/api/teacher"; // buy a domain name and change this url
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
          setTeacherData(data[0]);
        } else if (data.msg === "Missing Authorization Header") {
          history.push("/login");
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
    <div>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="profile" title="My profile">
          <ul>
            {teacherData.first_name} {teacherData.last_name}
          </ul>
          <ul>{teacherData.years_experience} </ul>
          <Button variant="dark">SAVE</Button>
          <TabContent />
        </Tab>
        <Tab eventKey="Schedule" title="My Schedule">
          <TabContent />
          <DatePicker
            selected={date}
            onChange={handleChange}
            minDate={today}
            maxDate={in30Days}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            customInput={<CustomInput />}
          />
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          <TabContent />
        </Tab>
      </Tabs>

      {/*      <Card>
  <Card.Header>
    <Nav variant="tabs" defaultActiveKey="#first">
      <Nav.Item>
        <Nav.Link href="#first">My profile</Nav.Link>

      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="./teacher">Classes</Nav.Link>  
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#disabled">
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
   
    
  </Card.Body>
</Card>
<Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          'Something went wrong'
        </p>
      </Alert> */}
    </div>
  );
}
export default TeacherProfile;

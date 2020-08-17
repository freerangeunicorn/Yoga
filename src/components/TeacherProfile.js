import React, { useEffect, useState, useContext } from "react";
import {
  Form,
  Tabs,
  Tab,
  Button,
  Alert,
  TabContent,
  Col,
  CardGroup,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TokenContext } from "./Context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

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
  // set the state here for what will be used in the create class form and then do handleChange
  const [title, setTitle] = useState();
  const [level, setLevel] = useState();
  const [price, setPrice] = useState();
  const [style, setStyle] = useState();
  const [description, setDescription] = useState();
  const [time, setTime] = useState();
  const onChange = (time) => setTime(time);
  // console.log(time)
  const [yogaClass,setYogaClass] = useState([]);

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

  const onSubmit = async () => {
    console.log("submit");

    const url = "http://localhost:3000/api/yogaclass";
    const createClass = {
      title: title,
      level: level,
      price: price,
      style: style,
      date: date,
      time: time,
      description: description,
    };
    console.log('hi', JSON.stringify(createClass));
    try {
      const header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-type", "application/json");
      header.append("Authorization", `Bearer ${token}`);
      const response = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(createClass),
      });
      console.log(response);
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const getClasses = async () => { 
    console.log('SUP')
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
        console.log('2PAC', response)
        return response.json();
      })
      .then((data) => {
          setYogaClass(data);
          console.log('YOOOOO',data)
      })
      .catch((error) => {
        setShow(true);
        console.log("error");
        console.log(error);
      });

    return () => {
      console.log("unsubscribe");
    };
  };

  return (
    <div>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" onSelect={(event) => {
        if (event === 'myclasses') {
          getClasses()
        };
      }}>
        <Tab eventKey="profile" title="My profile">
          <ul>
            {teacherData.first_name} {teacherData.last_name}
          </ul>
          <ul>{teacherData.years_experience} </ul>
          <Button variant="dark">SAVE</Button>
          <TabContent />
        </Tab>
        <Tab eventKey="Schedule" title="Schedule a class">
          {/* <TabContent /> */}
          <div>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Name your class"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLevel">
                  <Form.Label>Level</Form.Label>
                  <Form.Control
                    value={level}
                    onChange={(event) => setLevel(event.target.value)}
                    placeholder="Beginner, intermediate, advanced or all"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="Your price in USD"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLevel">
                  <Form.Label>Style of yoga</Form.Label>
                  <Form.Control
                    value={style}
                    onChange={(event) => setStyle(event.target.value)}
                    placeholder="Hatha, Vinyasa, Yin, Ashtanga, Restorative, Hot yoga or Pre-natal yoga"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridDate">
                  <Form.Label>Select a date</Form.Label>
                  <DatePicker
            selected={date}
            onChange={handleChange}
            minDate={today}
            maxDate={in30Days}

          />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTime">
                  <Form.Label>Select time</Form.Label>
                  <TimeRangePicker
                    value={time}
                    onChange={onChange}

                  />

                </Form.Group>
              </Form.Row>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Describe your class</Form.Label>
                  <Form.Control
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    as="textarea"
                    rows="3"
                  />
                </Form.Group>
              <Button variant="dark" type="button" onClick={() => onSubmit()}>
                Submit
              </Button>
            </Form>
          </div>
        </Tab>
        <Tab eventKey="myclasses" title="My classes" >
        
        
        <Card>
       
        {yogaClass.map((yogaClass, index) => (
          <React.Fragment>
        <Card.Header>{yogaClass.title} </Card.Header>
       
  <Card.Body>
    <Card.Title>Level:{yogaClass.level} </Card.Title>
     <ListGroup variant="flush">
     <ListGroup.Item> Time:{yogaClass.time}</ListGroup.Item>
    <ListGroup.Item>Price: {yogaClass.price}</ListGroup.Item>
        <ListGroup.Item>Date: {yogaClass.date}</ListGroup.Item>
  <ListGroup.Item>Style: {yogaClass.style}</ListGroup.Item>
        <ListGroup.Item>Duration: {yogaClass.duration} minutes</ListGroup.Item>
  </ListGroup> 
    <Card.Text>
      Description: {yogaClass.description}
    </Card.Text>

  </Card.Body>
  </React.Fragment>
 ))}
</Card>
          
    
        </Tab>
      </Tabs>
     

     
    </div>
  );
}
export default TeacherProfile;

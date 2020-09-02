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
  Badge,
  Dropdown,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TokenContext } from "./Context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

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
  const [yogaClass, setYogaClass] = useState([]);
  const [teacherFirstName, setTeacherFirstName] = useState();
  const [teacherLastName, setTeacherLastName] = useState();
  const [teacherEmail, setTeacherEmail] = useState();
  const [teacherExperience, setTeacherExperience] = useState();

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
          setTeacherFirstName(data[0].first_name);
          setTeacherLastName(data[0].last_name);
          setTeacherEmail(data[0].email);
          setTeacherExperience(data[0].years_experience);
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
    console.log("hi", JSON.stringify(createClass));
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

    return () => {
      console.log("unsubscribe");
    };
  };

  const editProfile = async () => {
    const newTeacherData = {
      first_name: teacherFirstName,
      last_name: teacherLastName,
      email: teacherEmail,
      years_experience: teacherExperience,
    };
    console.log("Gangstabitch", newTeacherData);
    const url = "http://localhost:3000/api/teacher"; // buy a domain name and change this url

    const header = new Headers();
    header.append("Accept", "application/json");
    header.append("Content-type", "application/json");
    header.append("Authorization", `Bearer ${token}`);

    fetch(url, {
      method: "PUT",
      headers: header,
      body: JSON.stringify(newTeacherData),
    })
      .then((response) => {
        console.log("confirmation response from be", response);
        return response.json();
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  return (
    <div>
      <Tabs
        className="d-flex justify-content-center"
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        onSelect={(event) => {
          if (event === "myclasses") {
            getClasses();
          }
        }}
      >
        <Tab eventKey="profile" title="My profile">
          <Form className="form-centered">
            <Form.Group controlId="formName">
              <Form.Label>First Name:</Form.Label>

              <Form.Control
                value={teacherFirstName}
                onChange={(event) => setTeacherFirstName(event.target.value)}
              />
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                value={teacherLastName}
                onChange={(event) => setTeacherLastName(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:{teacherEmail}</Form.Label>
            </Form.Group>

            <Form.Group controlId="formYears">
              <Form.Label>Experience:</Form.Label>
              <Form.Control
                value={teacherExperience}
                onChange={(event) => setTeacherExperience(event.target.value)}
              />
            </Form.Group>

            <Button variant="success" onClick={() => editProfile()}>
              Save
            </Button>
          </Form>

          <TabContent />
        </Tab>
        <Tab eventKey="Schedule" title="Schedule a class">
          {/* <TabContent /> */}
          <div>
            <Form className="form-centered">
              <Form.Group controlId="formGridTitle">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Name your class"
                />
              </Form.Group>
              {/* <br /> */}
              <Form.Group controlId="formGridLevel">
                <Form.Label>Level:</Form.Label>
                <Form.Control
                  required
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  placeholder="Beginner, intermediate, advanced or all"
                />
              </Form.Group>
              <Form.Group controlId="formGridPrice">
                <Form.Label>What's your price?</Form.Label>
                <Form.Control
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="Your price in USD"
                />
              </Form.Group>
              <Form.Group controlId="formGridLevel">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Describe your class:</Form.Label>
                  <Form.Control
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    as="textarea"
                    rows="3"
                  />
                </Form.Group>

                <Form.Group controlId="formGridDate">
                  <Form.Label>Select a date: </Form.Label>
                  <br />
                  <DatePicker
                    selected={date}
                    onChange={handleChange}
                    minDate={today}
                    maxDate={in30Days}
                  />
                </Form.Group>

                <Form.Group controlId="formGridTime">
                  <Form.Label>Select time: </Form.Label>
                  <br />
                  <TimeRangePicker value={time} onChange={onChange} />
                </Form.Group>
                <Dropdown
                  value={style}
                  onSelect={(eventKey) => setStyle(eventKey)}
                >
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Choose a style
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="Hatha">Hatha</Dropdown.Item>
                    <Dropdown.Item eventKey="Vinyasa">Vinyasa</Dropdown.Item>
                    <Dropdown.Item eventKey="Yin">Yin Yoga</Dropdown.Item>
                    <Dropdown.Item eventKey="Restorative">
                      Restorative
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Ashtanga">Ashtanga</Dropdown.Item>
                    <Dropdown.Item eventKey="Power">Power Yoga</Dropdown.Item>
                    <Dropdown.Item eventKey="Pre-Natal">
                      Pre-natal
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Button variant="dark" onClick={() => onSubmit()}>
                Submit
              </Button>
            </Form>
          </div>
        </Tab>
        <Tab eventKey="myclasses" title="My classes">
          {yogaClass.map((yogaClass, index) => (
            <React.Fragment>
              <Card className="yoga-card" style={{ marginBottom: 20 }}>
                <Card.Header className="card-header">
                  {yogaClass.title}
                  {yogaClass.student_id && (
                    <Badge variant="success">Booked</Badge>
                  )}
                </Card.Header>

                <Card.Body>
                  <Card.Title>Level:{yogaClass.level} </Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Time: {yogaClass.time}</ListGroup.Item>
                    <ListGroup.Item>Price: ${yogaClass.price}</ListGroup.Item>
                    <ListGroup.Item>Date: {yogaClass.date}</ListGroup.Item>
                    <ListGroup.Item>Style: {yogaClass.style}</ListGroup.Item>
                    <ListGroup.Item>
                      Style: {yogaClass.description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Duration: {yogaClass.duration} minutes
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </React.Fragment>
          ))}
        </Tab>
      </Tabs>
    </div>
  );
}
export default TeacherProfile;

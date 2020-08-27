import React from "react";
import {
  Card,
  Button,
  Tab,
  TabContent,
  Tabs,
  ListGroup,
  Toast,
  ToastBody,
  ToastHeader,
  Col,
  Form,
  Dropdown,
  FormLabel,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { TokenContext } from "./Context";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function StudentProfile() {
  const [studentData, setStudentData] = useState({}); // check the backend code for GET studentdata
  const [show, setShow] = useState(false);
  const [token, setToken] = useContext(TokenContext);
  const [yogaClass, setYogaClass] = useState([]);
  const [toast, setToast] = useState(false);
  const [style, setStyle] = useState();
  const history = useHistory();
  const [date, setDate] = useState(new Date());
 
  const today = new Date();
  let in30Days = new Date();
  in30Days.setDate(in30Days.getDate() + 30);
  const [time, setTime] = useState();

  console.log("show me data; yoga class", yogaClass);
  
  const handleChange = (date) => {
    setDate(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDay();
    setTime(`${hours}:${minutes}`)
  } 

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
      body: JSON.stringify({ id: id }),
    })
      .then((response) => {
        console.log("confirmation response from be", response);
        return response.json();
      })
      .then((data) => {
        setToast(data.confirmation);
        console.log("is it true?");
  
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  console.log(style, date);

  const handleSearch = async () => {
    console.log("SEARCH"); 
    const searchParams = new URLSearchParams(`filter=time^eq^${time},date^eq^${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()},style^eq^${style}`);
    const url = new URL("http://localhost:3000/api/yogaclass"); // buy a domain name and change this url
    const header = new Headers();
    header.append("Accept", "application/json");
    header.append("Content-type", "application/json");
    header.append("Authorization", `Bearer ${token}`);
    
    url.search = searchParams.toString();


    fetch(url, {
      method: "GET",
      headers: header,
    })
      .then((response) => {
        console.log("50cent", response);
        return response.json();
      })
      .then((data) => {
        setYogaClass(data);
        console.log("YOOOOO this shit filtered", data);
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
          else if (event === 'Search') {
            setYogaClass([]);
          }
    
        }}
      >
        <Tab eventKey="studentClasses" title="My Classes">
          <TabContent>
            <Card className="text-center" style={{marginBottom: 20}}>
              <Card.Header>Upcoming class:</Card.Header>
              <Card.Body>
                <Card.Title>
                  {studentData.first_name} {studentData.last_name}{" "}
                </Card.Title>
                <Card.Text>Next class:</Card.Text>
                <Button variant="dark">Enter</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Previous: </Card.Footer>
            </Card>
          </TabContent>
        </Tab>
        <Tab eventKey="allClasses" title="Explore Yoga classes">
        {yogaClass.map((yogaClass, index) => (
           <React.Fragment>
          <Card style={{marginBottom: 20}}>
            
      
                <Card.Header>{yogaClass.title} </Card.Header>

                <Card.Body>
                  <Card.Title>Level:{yogaClass.level} </Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Teacher:{yogaClass.first_name} {yogaClass.last_name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Years of experience:{yogaClass.years_experience}
                    </ListGroup.Item>
                    <ListGroup.Item> Time:{yogaClass.time}</ListGroup.Item>
                    <ListGroup.Item>Price: {yogaClass.price}</ListGroup.Item>
                    <ListGroup.Item>Date: {yogaClass.date}</ListGroup.Item>
                    <ListGroup.Item>Style: {yogaClass.style}</ListGroup.Item>
                    <ListGroup.Item>
                      Duration: {yogaClass.duration} minutes
                    </ListGroup.Item>
                    <ListGroup.Item>Description: {yogaClass.description}</ListGroup.Item>
                  </ListGroup>
                  
                  <Button class="button-center"
                    onClick={() => {
                      book(yogaClass.id);
                    }}
                    variant="success"
                  >
                    Book
                  </Button>
                </Card.Body>
                </Card>
              </React.Fragment>
            ))}
          
    
        </Tab>
        <Tab eventKey="Search" title="Search a class">
          <TabContent />
          <Form className="search-form">
            <Form.Group controlId="formBasicDate">
              <Form.Label>Select a date: </Form.Label>
              <br/>
              <DatePicker
                    selected={date}
                    onChange={handleChange}
                    minDate={today}
                    maxDate={in30Days}
                    showTimeSelect
                  />
            </Form.Group>
            
            

            <Form.Group controlId="formBasicStyle">
              <FormLabel>Pick a style!</FormLabel>
              <Dropdown
                value={style}
                onSelect={(eventKey) => setStyle(eventKey)}
              >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Style
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
                  <Dropdown.Item eventKey="Pre-Natal">Pre-natal</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Button variant="dark" onClick={() => handleSearch()}>
              Search
            </Button>
          </Form>
          <Card style={{marginBottom: 20}}>
            {yogaClass.map((yogaClass, index) => (
              <React.Fragment>
                <Card.Header>{yogaClass.title} </Card.Header>

                <Card.Body>
                  <Card.Title>Level:{yogaClass.level} </Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Teacher:{yogaClass.first_name} {yogaClass.last_name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Years of experience:{yogaClass.years_experience}
                    </ListGroup.Item>
                    <ListGroup.Item> Time:{yogaClass.time}</ListGroup.Item>
                    <ListGroup.Item>Price: {yogaClass.price}</ListGroup.Item>
                    <ListGroup.Item>Date: {yogaClass.date}</ListGroup.Item>
                    <ListGroup.Item>Style: {yogaClass.style}</ListGroup.Item>
                    <ListGroup.Item>
                      Duration: {yogaClass.duration} minutes
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Text> Description: {yogaClass.description}</Card.Text>
                  <Button variant="dark" onClick={() => handleSearch()}></Button>  {/* can u use the same book for async? */}
                </Card.Body>
               
                </React.Fragment>
            ))
          }
          </Card>
          <TabContent />
          
        </Tab>
      </Tabs>
      <Toast show={toast}>
        <Toast.Header closeButton="True">
          <strong className="mr-auto">
            Thank you {studentData.first_name} {studentData.last_name}
          </strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>
          BOOKED! Confirmation has been sent to your email!.
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default StudentProfile;

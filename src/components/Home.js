import React from "react";
import { Button, Form, Col, Carousel } from "react-bootstrap";
import Yoga from '../img/yoga.png';
import Mudra from '../img/mudra.png';
import Pair from '../img/pair.png';



function Home() {
  return (
    <div className="home-page">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100 carousel-img" src={Yoga} alt="Yoga" />
          <Carousel.Caption>
            <h3>“Take care of your body, it's the only place you have to live.”</h3>
            <p>- Jim Rohn</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
          
            src={Mudra}
            alt="Mudra"
            
          />

          <Carousel.Caption>
            <h3>"Yoga is the journey of the self, through the self, to the self."</h3>
            <p>- The Bhagavad Gita</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={Pair}
            alt="Cat"
            
          />

          <Carousel.Caption>
            <h3>Yoga is like music: the rhythm of the body, the melody of the mind, and the harmony of the soul create the symphony of life.”</h3>
            <p>- B.K.S. Iyengar 
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
     
    </div>
  );
}

export default Home;

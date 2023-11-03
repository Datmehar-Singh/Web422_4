import React from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Home = () => {
  return (
    <div className='my-5'>
      <Row>
        <Col md={6}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
            alt="Metropolitan Museum of Art"
            fluid
            rounded
          />
        </Col>
        <Col md={6}>
          <p>
            The Metropolitan Museum of Art, often referred to as "The Met," is one of the world's largest and most prestigious art museums. Located in Central Park, New York City, it houses a vast collection of art spanning centuries and cultures.
          </p>
          <p>
            Explore more about The Met on its <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia page</a>.
          </p>
        </Col>
      </Row>
    </div>
  );
};


export default Home;
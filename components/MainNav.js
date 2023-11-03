import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';


function MainNav() {
    const linkStyle = {
        textDecoration: 'none', 
        color: 'white',      
        fontSize: '1.2rem',  
        margin: '0 1rem',    
      };
    const router = useRouter();
    const [searchField, setSearchField] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark fixed-top">
      <Container className='me-auto'>
        <Navbar.Brand>Datmehar Singh</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior><span style={linkStyle}>Home</span></Link>
            <Link href="/search" passHref legacyBehavior><span style={linkStyle}>Advanced Search</span></Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Form className="d-flex mx-5" onSubmit={handleSubmit}>
            <Form.Control
            type="text"
            placeholder="Search"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}            />
            <Button variant="outline-success mx-2" type='submit'>Search</Button>
        </Form>
    </Navbar>
  );
}

export default MainNav;
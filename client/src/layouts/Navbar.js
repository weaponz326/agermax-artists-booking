import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/Navbar.css';

const MyNavbar = () => {
  return (
    <Navbar fixed="top" className='navbar'>
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand href="#" className='logo-name'>Your Logo</Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar content */}
        <Navbar.Collapse id="navbar-nav">
          {/* Search bar with search icon */}
          <Form className="d-flex mx-auto">
            <FormControl
              type="search"
              placeholder="Find amazing artist"
              className="mr-2"
              aria-label="Search"
            />
          </Form>

          {/* Circle Avatar with dropdown */}
          <Nav className="ms-2">
            <NavDropdown title={<i className="bi bi-person-circle" />} id="basic-nav-dropdown">
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

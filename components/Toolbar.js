import React from 'react';

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'


const Toolbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">Movie App </Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
     {/*  <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <Form.Group controlId="exampleForm.SelectCustom">

            <Form.Control as="select" custom>
              <option>Title</option>
              <option>Cast</option>

            </Form.Control>
          </Form.Group>
          <Form.Group>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form.Group>
        </Form>
      </Navbar.Collapse> */}
    </Navbar>
  )
}

export default Toolbar;
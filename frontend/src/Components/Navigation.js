import React from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa'

const Navigation = () => {
  return (
    <div className='header w-100 h-100'>
      <Navbar variant='dark' bg='primary' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>Web Store</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/cart'>
                <FaShoppingCart className='mx-1' /> Cart
              </Nav.Link>
              <Nav.Link href='/signin'>
                <FaSignInAlt className='mx-1' /> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation

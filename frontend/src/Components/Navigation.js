import React from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa'

const Navigation = () => {
  return (
    <div className='header w-100 h-100'>
      <Navbar variant='dark' bg='primary' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Web Store</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link >
                  <FaShoppingCart className='mx-1' /> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/signin'>
                <Nav.Link >
                  <FaSignInAlt className='mx-1' /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation

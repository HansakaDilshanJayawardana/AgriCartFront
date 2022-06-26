import React from 'react'
import {Navbar,Container,Nav,NavDropdown, Dropdown, Badge} from 'react-bootstrap'
import agzoneLogo from '../static/images/agzone.png'
import '../static/css/global.css'
import Cart from '../pages/cart'
import { useNavigate } from 'react-router';

import authService from '../services/auth.services'
// import { Link } from 'react-router-dom'

const Cust_nav = () => {
  const navigate = useNavigate();
  const logged_user= authService.getCurrentUser();
  const logged_user_role = logged_user.role
  console.log('this is logged role', logged_user_role)
  
  return (
    <div>
      <Navbar expand="lg" className='agzone_top_nav'>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            >
              {logged_user_role === 'BUYER' ? (
              <>
                <Nav.Link style={{color: "#fcc528"}} href="#action1" id='agzoneNavLink'>Home</Nav.Link>
                <Nav.Link style={{color: "#fcc528"}} href="products" id='agzoneNavLink'>Products</Nav.Link>
                <Nav.Link style={{color: "#fcc528"}} href="cart" id='agzoneNavLink'>Cart</Nav.Link>
              </>):
              
              (
              <>
                <Nav.Link style={{color: "#fcc528"}} href="#action1" id='agzoneNavLink'>Home</Nav.Link>
                <Nav.Link style={{color: "#fcc528"}} href="products" id='agzoneNavLink'>Products</Nav.Link>
                <Nav.Link style={{color: "#fcc528"}} href="create_product" id='agzoneNavLink'>Item</Nav.Link>
                <Nav.Link style={{color: "#fcc528"}} href="create_category" id='agzoneNavLink'>Category</Nav.Link>
              </>
              )}
            </Nav>
            <Nav></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Cust_nav
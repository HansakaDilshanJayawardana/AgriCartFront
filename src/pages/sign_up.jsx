import React, {useState} from 'react'
import '../static/css/all_products.css'
import {Form,Button, Container, Row, Col} from 'react-bootstrap';
import agzoneLogo from '../static/images/agzone.png'
import { Link } from 'react-router-dom';
import authService from '../services/auth.services';
import { useNavigate } from 'react-router';


const Sign_up = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userAddress, setUserAddress] = useState('')

  const reg_func = () => {
    authService.signUp(
      userName,
      password,
      fullName,
      userEmail,
      userPhone,
      userAddress
    ).then((res) =>{
      console.log("Result after adding to cart", res)
      navigate('/');
      window.location.reload()
    }
    )
  }

  return (
    <>
    <Container fluid id='sign_up_container'>
      <Row id='reg_form_row'>
        <Col id='reg_form_left_col'>
        </Col>

        <Col id='reg_form_right_col'>
          <div className="buttonWrapper">
            <img
            src={agzoneLogo}
            width="150"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            />
          </div>

          <Form id='reg_form'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className='form_label_styler'>User Name</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className='form_label_styler'>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className='form_label_styler'>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" value={fullName} onChange={(e)=>{setFullName(e.target.value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className='form_label_styler'>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className='form_label_styler'>Telephone</Form.Label>
              <Form.Control type="text" placeholder="Enter Contact number" value={userPhone} onChange={(e)=>{setUserPhone(e.target.value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className='form_label_styler'>Address</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Enter Permanent Address" value={userAddress} onChange={(e)=>{setUserAddress(e.target.value)}}/>
            </Form.Group>

            <div className="buttonWrapper">
              <Button variant="primary" className='global_button' type='button' onClick={(e)=>{reg_func()}}>
              Sign up
              </Button>
            </div>
          </Form>

          <div className="have_an_account">
            <h6 className='auth_navigator_text'>
              Already have an account? <Link to="/">Sign in</Link>
            </h6>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Sign_up
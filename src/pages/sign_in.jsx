import React, {useState} from 'react'
import {Container,Form,Button,Row, Col} from 'react-bootstrap'
import authService from '../services/auth.services'
import AgZoneLogo from '../static/images/agzone.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import MobileBack from '../static/images/login_mob.png'
import DesktopBack from '../static/images/login_dekstop.png'
import BrandImage from '../static/images/1.png'

const Sign_in = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate();
  const login_func = () => {
    authService.login(
    userName,
    password
    ).then(() => {
      const logged_user= authService.getCurrentUser();
      const logged_user_role = logged_user.role

      if(logged_user_role==="FARMER"){
        navigate('/create_product');
      }else if(logged_user_role==="BUYER"){
        navigate('/products');
      }
      window.location.reload();
    })
  }

  return (
    <div>
        <Container fluid id='login_page_container'>
            <Row>
                <Col md={6} id='login_left_col'>
                  <div className="buttonWrapper">
                    <img
                    src={BrandImage}
                    width="650"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    />
                  </div>
                </Col>
                <Col md={6} id='login_right_col'>
                  <div className="buttonWrapper">
                    <img
                    src={AgZoneLogo}
                    width="150"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    />
                  </div>

                  <Form id='login_form'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className='form_label_styler'>Username</Form.Label>
                      <Form.Control type="text" placeholder="Enter Username" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className='form_label_styler'>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" value={password}  onChange={(e)=>{setPassword(e.target.value)}}/>
                    </Form.Group>
                  
                    <div className="buttonWrapper">
                      <Button variant="primary" className='global_button' onClick={(e)=>{login_func()}}> 
                      Sign in
                      </Button>
                    </div>
                  </Form>
                
                  <div className="sign_in_container">
                    <h6 className='auth_navigator_text'>
                      Don't have an account? <Link to="/sign_up">Sign up</Link>
                    </h6>
                  </div>

                  <div className="sign_in_mob_img">
                    <img
                    src={MobileBack}
                    width="350"
                    id='mobile_back_login'
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    />
                  </div>

                  <div className="sign_in_desktop_img">
                    <img
                    src={DesktopBack}
                    width="350"
                    id='mobile_back_login'
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    />
                  </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Sign_in
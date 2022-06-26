import React, { useEffect, useState } from 'react';
import CustomerNav from '../components/cust_nav';
import '../static/css/all_products.css'
import {Card,Button, Container, Row, Col,ListGroup,Badge} from 'react-bootstrap';
import { addToCart, getAllProducts,viewSingleProduct , deleteProduct} from '../services/products.services';
import authService from '../services/auth.services';
import { useNavigate } from 'react-router';

import SampleDress from '../static/images/dress.jpg';


const Products = () => {
  const navigate = useNavigate();

  const logged_user= authService.getCurrentUser();
  const logged_user_role = logged_user.role

  const userInfo = authService.getCurrentUser();
  // console.log(userInfo.userName)  
  const [products, setProducts] = useState([]);

  const [itemQuantity, setItemQuantity] = useState(0);

  const addToCartFunc = (prod) => {
    console.log(prod.itemName)
    // alert('this is item quantity',itemQuantity)
    let add_cart_data = {
      itemId : prod.id,
      quantity :1
    }

    addToCart(add_cart_data).then((res) =>{
      navigate('/products');
      window.location.reload()
      console.log("Result after adding to cart", add_cart_data)
    }).catch((e)=>{
      console.log("error while adding the product to cart!")
    }) 
  }

  const viewSinglItemFunc = (prod) => {
    console.log(prod.itemName) 
    const itemId = prod.id
    // alert('this is item quantity',itemQuantity)
    viewSingleProduct(itemId).then((res) =>{
      console.log("Result after adding to cart", res)
      console.log(res.itemName)
      localStorage.setItem("itemName",res.itemName)
      localStorage.setItem("itemDescription",res.description)
      localStorage.setItem("itemQty",res.quantity)
      localStorage.setItem("itemPrice",res.price)
      localStorage.setItem("url", res.url)
      
      navigate('/view', {state:res});
      
    }).catch((e)=>{
      console.log("error while adding the product to cart!")
    })
  }

  const deleteItem = (id)=>{
    deleteProduct(id).then((res)=>{
      navigate('/products', {state:res});
      window.location.reload()
    }).catch((e)=>{
      console.log("error while adding the product to cart!")
    })
  }
  
  useEffect (() => {
    getAllProducts().then((res) => {
      // console.log(res)
      setProducts(res)
    })
  },[])

  return (
    <div>
      <CustomerNav />
      <Container id='all_product_container'>
        <Row xs={1} md={4} className="g-4">
          {products.map((product, index) => (
          
          <Col>
          <Card border="success">
            <Card.Body>
              <Card.Title className="fw-bold" style={{textAlign: 'center'}}>{product.itemName}</Card.Title>
              <Col>
              <img style={{width: 225 , height:200}} src={product.url}  className='single_product_image' />
              </Col>
              <Card.Text>
                <h6 style={{marginTop: 5, marginBottom: 5}}>{product.description}</h6>
                <ListGroup as="ul">
                  <ListGroup.Item
                  as="li"
                  action variant='success'
                  className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Category</div>
                    </div>
                    <Badge bg="success" pill>
                      {product.itemType}
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item
                  as="li"
                  action variant='warning'
                  className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Available Quantity</div>
                    </div>
                    <Badge bg="warning text-dark" pill>
                      {product.quantity}
                    </Badge>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Text>
              {logged_user_role==="BUYER"?(
              <Row>
                <Col>
                  <Button 
                  variant="success" 
                  style={{width: 225, fontSize:'0.9em', fontWeight: 'bold', textTransform: 'uppercase'}}
                  onClick={()=>{
                    const logged_user= authService.getCurrentUser();
                    const logged_user_role = logged_user.role
                  
                    viewSinglItemFunc(product)
                  }}
                  >View Product</Button>
                </Col>
                <Col>
                  <Button 
                  variant="warning" 
                  style={{width: 225, fontSize:'0.9em', marginTop: 5, fontWeight: 'bold', textTransform: 'uppercase'}}
                  onClick={()=>{
                    console.log("res",product)
                    addToCartFunc(product)}}
                  >
                  Add to cart</Button>
                </Col>
              </Row>
              ):(   
              <Row>
                <Col >
                  <Button 
                  variant="success" 
                  style={{width: 225, fontSize:'0.9em', fontWeight: 'bold', textTransform: 'uppercase'}}
                  onClick={()=>{
                    const logged_user= authService.getCurrentUser();
                    const logged_user_role = logged_user.role
                    
                    viewSinglItemFunc(product)
                  }}
                  >View Product</Button>
                </Col>
                <Col >
                  <Button 
                  variant="outline-danger" 
                  style={{width: 225, fontSize:'0.9em', marginTop: 5, fontWeight: 'bold', textTransform: 'uppercase'}}
                  onClick={()=>{deleteItem(product.id)}}
                  >
                  Delete Product</Button>
                </Col>
              </Row>)}
            </Card.Body>
          </Card>
          </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Products
import React, { useState ,useEffect } from 'react';
import { Container,Row,Col, Card, ButtonGroup, Button, Form } from 'react-bootstrap';
import CustomerNav from '../components/cust_nav';
import SampleDress from '../static/images/dress.jpg';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { addToCart,updateProduct,getAllCategories } from '../services/products.services';
import authService from '../services/auth.services';

const View_single_product = () => {
  const location = useLocation();

  const [orderQuantity, setOrderQuantity] = useState(0)
  const logged_user= authService.getCurrentUser();
  const logged_user_role = logged_user.role

  const navigate = useNavigate()
  
  // update states
  const [itemName, setItemName] = useState(localStorage.getItem("itemName"))
  const [itemDescription, setItemDescription] = useState(localStorage.getItem("itemDescription"))
  const [itemPrice, setItemPrice] = useState(localStorage.getItem("itemPrice"))
  const [itemQty, setItemQty] = useState(localStorage.getItem("itemQty"))
  const [itemUrl, setItemUrl] = useState(localStorage.getItem("url"))
  const [itemCategory, setItemCategory] = useState('')
  const [itemSubCategory, setItemSubCategory] = useState('')
  
  const[categoryList , setCategoryList] = useState([])
  
  useEffect(()=>{
    getAllCategories().then((res)=>{
      setCategoryList(res)
    }).catch((e)=>{
        alert("error while adding the product!")
    })
  },[])

  const addToCartFunc = (prodid) => {
    
    let add_cart_data = {
      itemId : prodid,
      quantity :orderQuantity
    }

    addToCart(add_cart_data).then((res) =>{
      navigate('/products');
      window.location.reload()
      console.log("Result after adding to cart", res)
      
    }
    ).catch((e)=>{
      console.log("error while adding the product to cart!")
    })
  }

  const updateProdFunc = (prodid) => {

    let prsedSubCategory = parseInt(itemSubCategory)

    const update_data = {
      itemName: itemName,
      url:itemUrl,
      price: itemPrice,
      description: itemDescription,
      quantity: itemQty,
      itemType:itemCategory,
      subCategoryId:prsedSubCategory
    }

    updateProduct(prodid,update_data).then((res) =>{
      navigate('/products');
      window.location.reload()
      console.log("Result after adding to cart", res)
    }
    ).catch((e)=>{
      console.log("error while adding the product to cart!")
    })
  }

  return (
    <div>
      <CustomerNav></CustomerNav>
      {logged_user_role === 'FARMER' ? (
      <>
      <div>
        <Container>
          <Row style={{marginBottom: 25}}>
            <Col>
            <Card.Img style={{marginTop: 70, height: 555, width: 500}} variant="left" src={itemUrl} className='single_product_image' />
            </Col>
            <Col className='single_product_detail_column'>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className='form_label_styler'>Item Category</Form.Label>
                  <Form.Select aria-label="Default select example" value={itemCategory} onChange={(e)=>{setItemCategory(e.target.value)}}>
                    <option>Select Item Category</option>
                    {categoryList.map((cat)=>{
                      return <option value={cat}>{cat}</option>
                      })}
                  </Form.Select>  
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className='form_label_styler'>Item Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter email" value={itemName} onChange={(e)=>{setItemName(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className='form_label_styler'>Image URL</Form.Label>
                  <Form.Control type="text" placeholder="Enter Image URl" value={itemUrl} onChange={(e)=>{setItemUrl(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className='form_label_styler'>Item Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={itemDescription} onChange={(e)=>{setItemDescription(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className='form_label_styler'>Unit Price</Form.Label>
                  <Form.Control type="text" placeholder="Enter unit price" value={itemPrice} onChange={(e)=>{setItemPrice(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className='form_label_styler'>Quantity</Form.Label>
                  <Form.Control type="text" placeholder="Enter unit price" value={itemQty} onChange={(e)=>{setItemQty(e.target.value)}}/>
                </Form.Group>
                  
                <div className="buttonWrapper">
                  <Button style={{fontSize:'0.9em', fontWeight: 'bold', textTransform: 'uppercase'}} variant="success" id='add_to_cart_from_single_prod_btn' onClick={()=>{updateProdFunc(location.state.id)}}>update
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      </>):
      (
      <div>
        <Container>
          <Row style={{marginBottom: 25}}>
            <Col>
            <Card.Img style={{marginTop: 70, height: 555, width: 500}} variant="left" src={itemUrl} className='single_product_image' />
            </Col>
            <Col className='single_product_detail_column'>
              <h1 className='product_name_header'>{location.state.itemName}</h1>
              <br></br>
                
              <p>{location.state.description}</p>
              <br />

              <h2 className='prodecut_price_header'>LKR:{location.state.price}.00</h2>

              <h2 className='prodecut_price_header'>in Stock - {location.state.quantity} items</h2>
                
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className='form_label_styler'>Order Quantity</Form.Label>
                  <Form.Control type='number' placeholder="Enter Order Quantity" value={orderQuantity} onChange={(e)=>{setOrderQuantity(e.target.value)}}/>
              </Form.Group>
                
              <div className="buttonWrapper">
                  <Button style={{fontSize:'0.9em', fontWeight: 'bold', textTransform: 'uppercase'}} variant="success" id='add_to_cart_from_single_prod_btn' onClick={()=>{addToCartFunc(location.state.id)}}>Add to cart</Button>
                  <br />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      )}
    </div>
  )
}

export default View_single_product
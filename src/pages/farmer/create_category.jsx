import React,{ useState} from 'react';
import CustomerNav from '../../components/cust_nav';
import { Container,Form,Button, Row,Col } from 'react-bootstrap';
import { addCategory, addProduct } from '../../services/products.services';
import AddItemImage from '../../static/images/add_item.png'
import { useNavigate } from 'react-router'

const Create_category = () => {

  const navigate = useNavigate()

  const [categoryName, setItemName] = useState('')
  
  const addCategoryFunc = (e) =>{
    e.preventDefault()
    const data = {
      categoryName: categoryName,
    }
    
    addCategory(data).then((res)=>{
      console.log("res after adding the product", res)
      navigate('/create_product');
      window.location.reload()
    }).catch((e)=>{
      alert("error while adding the product!")
    })
  }

  return (
    <div>
      <CustomerNav />
      <Container id='create_product_container'>
        <Row>
          <Col md={6} className='left_column'>
            <img
            src={AddItemImage}
            width="550"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            />
          </Col>

          <Col md={6} className='right_column'>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='form_label_styler'>Category Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Category Name" value={categoryName} onChange={(e)=>{setItemName(e.target.value)}} />
              </Form.Group>
              
              <div className="buttonWrapper">
                <Button variant="primary" type="submit" onClick={(e)=>{addCategoryFunc(e)}} className='global_button'>
                  <i class="fa-solid fa-plus"></i> Add Category
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Create_category
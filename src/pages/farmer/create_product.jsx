import React,{ useState} from 'react';
import CustomerNav from '../../components/cust_nav';
import { Container,Form,Button, Row,Col } from 'react-bootstrap';
import { addProduct ,getAllCategories} from '../../services/products.services';
import AddItemImage from '../../static/images/add_item.png'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Create_product = () => {
  const navigate = useNavigate()

  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemPrice, setItemPrice] = useState(0)
  const [url,setUrl] = useState('')
  const [itemQty, setItemQty] = useState(0)
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
  
  const addProductFunc = (e) =>{
    e.preventDefault()
    let prsedSubCategory = parseInt(itemSubCategory)
    console.log("parsed cat", prsedSubCategory)
    const data = {
      itemName: itemName,
      url:url,
      price: itemPrice,
      description: itemDescription,
      quantity: itemQty,
      itemType:itemCategory,
      subCategoryId:prsedSubCategory
    }
    
    addProduct(data).then((res)=>{
      console.log("res after adding the product", res)
      navigate('/products');
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
                <Form.Label className='form_label_styler'>Item Category</Form.Label>
                <Form.Select aria-label="Default select example" value={itemCategory} onChange={(e)=>{setItemCategory(e.target.value)}}>
                  <option>Select Item Category</option>
                  {categoryList.map((cat)=>{
                    return <option>{cat}</option>
                    })}
                </Form.Select>  
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='form_label_styler'>Item Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Item Name" value={itemName} onChange={(e)=>{setItemName(e.target.value)}} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='form_label_styler'>Image URL</Form.Label>
                <Form.Control type="text" placeholder="Enter Image URL" value={url} onChange={(e)=>{setUrl(e.target.value)}}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='form_label_styler'>Item Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={itemDescription} onChange={(e)=>{setItemDescription(e.target.value)}}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='form_label_styler'>Unit Price</Form.Label>
                <Form.Control type="text" placeholder="Enter Unit Price" value={itemPrice} onChange={(e)=>{setItemPrice(e.target.value)}}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='form_label_styler'>Quantity</Form.Label>
                <Form.Control type="text" placeholder="Enter Quantity" min="0" value={itemQty} onChange={(e)=>{setItemQty(e.target.value)}}/>
              </Form.Group>
              
              <div className="buttonWrapper">
                <Button variant="primary" type="submit" onClick={(e)=>{addProductFunc(e)}} className='global_button'>
                  <i class="fa-solid fa-plus"></i> Add Product
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Create_product
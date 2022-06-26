import React,{useEffect,useState} from 'react';
import CustomerNav from '../components/cust_nav';
import { viewCart,payAmount } from '../services/products.services';
import { useNavigate } from 'react-router';
import {  Card,Table,Row,Col, Container,Form,Button,Nav } from 'react-bootstrap';


const Cart = () => {
  const navigation = useNavigate()
  const [CartItems, setCartItems] = useState([]);
  const [CartTotal,setCartTotal] = useState(0);
  const [showForm, setShowForm] = React.useState(1)
  const [CartObj, setCartObj] = React.useState([])

  // to hide and dislay dropdowns
  const [addressAvailable, setAddressAvailable] = React.useState(false)

  //cart mobile payment status
  const [mobPayMobile, setMobPayMobile] = useState()
  const [mobPayAmount, setmobPayAmount] = useState(CartTotal)
  const [mobPayAddress, setMobPayAddress] = useState()

  // cart card payment
  const [cardType, setCardType] = useState()
  const [cardNumber, setCardNumber] = useState('')
  const [cardCSV, setCardCSV] = useState('')
  const [cardHolderName, setCardHolderName] = useState('')
  const [cardAmount, setCardAmount] = useState('')
  const [cardAddress, setCardAddress] = useState('')
  
  useEffect (() => {
    viewCart().then((res) => {
      // console.log('cart item list response',res.items)
      setCartItems(res.items)
      setCartTotal(res.cartPrice)
      setCartObj(res)
    })
  },[])
  
  return (
    <div>
      <CustomerNav></CustomerNav>
      <Row style={{margin: 10}}>
        <Col>
        <Table striped bordered hover borderless>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {CartItems.map((CartItem, index) => (
            <tr>
              <td>{CartItem.itemId.itemName}</td>
              <td>{CartItem.itemId.price}</td>
              <td>{CartItem.quantity}</td>
              <td>{CartItem.itemId.price * CartItem.quantity }</td>  
            </tr> 
            ))}
          </tbody>
        </Table>

        <h6>Total = {CartTotal}</h6>
        
        </Col>
      </Row>
    </div>
  )
}

export default Cart
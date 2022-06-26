import React, {useEffect,useState} from 'react'
import { Table } from 'react-bootstrap';
import { viewCart } from '../services/products.services';

const ShoppingCart = () => {


  const [CartItems, setCartItems] = useState([]);

  useEffect (() => {
    viewCart().then((res) => {
      console.log(res.cartId)
      setCartItems(res.cartId)

    })

  })

  return (
    <div>

<Table striped bordered hover>
  <thead>
    <tr>
      
      <th>Item Name</th>
      <th>Price</th>
      <th>Quantity</th>
    </tr>
  </thead>
  <tbody>
  {CartItems.items.map((CartItem, index) => (
      <tr>
      <td>{CartItem.itemName}</td>
      <td>{CartItem.price}</td>
      <td>{CartItem.quantity}</td>
      
    </tr>
          
          ))}
    
    
  </tbody>
</Table>




        
    </div>
  )
}

export default ShoppingCart
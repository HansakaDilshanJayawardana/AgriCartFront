import React, {useState, useEffect} from 'react'
import {Table,Row,Col} from 'react-bootstrap';
import Cust_nav from '../components/cust_nav';
import { viewCartHistory } from '../services/products.services';

const PurcahseHistory = () => {

    
    const [purchaseHistory, setPurchaseHistory] = useState([]);


    useEffect (() => {
        viewCartHistory().then((res) => {
          // console.log(res)
          setPurchaseHistory(res)
    
        })
    
      },[])



  return (
    <div>
      <Cust_nav></Cust_nav>


        <Row>
            
            <Col md={4} className='left_column'>

            </Col>

            <Col md={8} className='right_column'>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>Purchase Id</th>
      <th>Purchase Status</th>
      
    </tr>
  </thead>
  <tbody>
  {purchaseHistory.map((pItem, index) => (
    <tr>
        <td>{pItem.id}</td>
        <td>{pItem.status}</td>

      
    </tr>
    ))}
  </tbody>
</Table>
            </Col>
        </Row>






    </div>
  )
}

export default PurcahseHistory
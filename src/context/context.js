import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { getAllProducts } from '../services/products.services';


const Cart = createContext('ss');


const Context = ({ children }) => {

  const cartItem = []
  
  return (
    <Cart.Provider>
      {children}                                                  
    </Cart.Provider>
  )
}

export default Context
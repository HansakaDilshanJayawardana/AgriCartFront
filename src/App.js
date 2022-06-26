import {BrowserRouter,Route,Routes,Navigate } from "react-router-dom";
import CustomerHome from './pages/customer/customer_home';
import FarmerHome from './pages/farmer/farmer_home';
import AllProducts from './pages/products';
import CreateProduct from './pages/farmer/create_product';
import SingleProduct from './pages/view_single_product';
import ShoppingCart from './pages/cart';
import LogIn from './pages/sign_in'
import SignUp from './pages/sign_up'
import './static/css/global.css'
import TestCart from './components/ShoppingCart'
import PurcahseHistory from "./pages/PurcahseHistory";
import Create_category from "./pages/farmer/create_category";
import UpdateProduct from "./pages/farmer/UpdateProduct";

function App() {
  const user = false;

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/customer" element={<CustomerHome/>}/>
        <Route exact path="/farmer" element={<FarmerHome/>}/>
        <Route exact path="/products" element={<AllProducts/>}/>
        <Route exact path="/create_product" element={<CreateProduct/>}/>
        <Route exact path="/create_category" element={<Create_category/>}/>
        <Route exact path="/update_product" element={<UpdateProduct/>}/>
        <Route exact path="/view" element={<SingleProduct/>}/>
        <Route exact path="/cart" element={<ShoppingCart/>}/>
        <Route exact path="/purchaseHistry" element={<PurcahseHistory/>}/>
        <Route exact path="/test_cart" element={<TestCart/>}/>
        <Route exact path="/" element={ user ? <Navigate  to='/products' /> : <LogIn/>}/>
        <Route exact path="/sign_up" element={ user ? <Navigate  to='/products' /> : <SignUp/>}/>
        



      </Routes>
      
          
        
      </BrowserRouter>
    </div>
  );
}

export default App;

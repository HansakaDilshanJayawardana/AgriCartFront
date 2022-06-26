import axios from 'axios'
import authHeader from './auth.header';
const host = "http://localhost:8080/api/v2";



// get all product categories
export const getProductCategories = async() => {
    try{
    const res = await axios.get(`${host}/item/itemTypes`);
    return res.data
    }
    catch(e){
        console.log(e)
    }
}


// get all product sub categories
export const getProductSubCategories = async() => {
    try{
    const res = await axios.get(`${host}/item/itemTypes`);
    return res.data
    }
    catch(e){
        console.log(e)
    }
}

// get all products
export const getAllProducts = async() => {
    try{
    const res = await axios.get(`${host}/item`);
    return res.data
    }
    catch(e){
        console.log(e)
    }
}

//getallCategories
export const getAllCategories= async()=>{

    try{
        const res = await axios.get(`${host}/item/itemTypes`);
        return res.data
        }
        catch(e){
            console.log(e)
        }

}

// add new product
export const addProduct = async(params) =>{
    console.log("sdkfkf", params)
    try{
        // let res = await axios.post(`${host}/item`,{headers: authHeader()})
        let res = await axios.post(host+ "/item",params,{headers: authHeader()})

        return res.data
    }catch(e){
        console.log("error found :", e.message)
    }
}

export const  addCategory = async(params)=>{
    try{
        // let res = await axios.post(`${host}/item`,{headers: authHeader()})
        let res = await axios.post(host+ "/item/itemTypes",params,{headers: authHeader()})

        return res.data
    }catch(e){
        console.log("error found :", e.message)
    }
}

// update existing product
export const updateProduct = async(id, params)=>{
    try{
        let res = await axios.put(`${host}/item?id=${id}`,params)
        return res.data
    }catch(e){
        console.log("error found :", e.message)
    }
}

// view existing product
export const viewSingleProduct = async(id)=>{
    try{
        let res = await axios.get(`${host}/item/viewItem/${id}`,{headers: authHeader()})
        return res.data
    }catch(e){
        console.log("error found :", e.message)
    }
}

// add to cart
export const addToCart = async(params) =>{
    console.log("cart items",params)
    try{
        let response = await axios.post(`${host}/cart/addItem`,params,{headers: authHeader()})
        return response.data
    }catch(e){
        console.log("error found :", e.message)
    }
}

// view cart
export const viewCart = async() => {
    try{
    const res = await axios.get(`${host}/cart/view`,{headers: authHeader()});
    return res.data
    }
    catch(e){
        console.log(e)
    }
}

// view cart history
export const viewCartHistory = async() => {
    try{
    const res = await axios.get(`${host}/cart/history`,{headers: authHeader()});
    return res.data
    }
    catch(e){
        console.log(e)
    }
}



// pay amount
export const payAmount = async(params) =>{
    console.log("sdkfkf", params)
    try{
        // let res = await axios.post(`${host}/item`,{headers: authHeader()})
        let res = await axios.post(host+ "/cart/pay",params,{headers: authHeader()})

        return res.data
    }catch(e){
        console.log( e.message)
    }
}


// delete existing item
export const deleteProduct = async(id, params)=>{
    try{
        let res = await axios.delete(`${host}/item?id=${id}`,params)
        return res.data
    }catch(e){
        console.log("error found :", e.message)
    }
}



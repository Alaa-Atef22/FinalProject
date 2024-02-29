import axios from "axios";
import { createContext, useState } from "react"; 

export let CartContext= createContext()
export default function CartContextProvider(props) {
    const [cartNumber,setcartNumber]=useState(0)
    let header ={
        token:localStorage.getItem('userToken')
        }
        

function addToCart(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId:id
    },
    {
    headers:header
    }
    )
    }
function addToList(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
        productId:id
    },{
headers:header
    }
    )
 }
    function search(name){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`,
    {
    productName:name
    },{
headers:header
    }
    )
 }


 function getCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
    headers:header
    }
    )
    }
 function getlist(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
    headers:header
    }
    )
    }

 function updateCart(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
        count:count
    },{
headers:header
    }
    )
 }
 function deleteCart(id,count){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
headers:header
    }
    )
 }
 function deletewishList(id,count){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
headers:header
    }
    )
 }
 function checkoutPayment(id,formData) { 
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
    {
        shippingAddress:formData
    },{
headers:header
    }
    )
  }
   function Brands(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    {
        productId:id
    },{
headers:header
    }
    )
 }
   function Categories(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    {
        productId:id
    },{
headers:header
    }
    )
 }
   function subCategories(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
{
headers:header
    }
    )
 }
 
 function deleteAllCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
headers:header
    }
    )
 }
return <CartContext.Provider value={{deletewishList,getlist,subCategories,Categories,Brands,search,addToCart,setcartNumber,cartNumber,getCart,deleteCart,updateCart,checkoutPayment,addToList,deleteAllCart}}>
{props.children}
</CartContext.Provider>
  }

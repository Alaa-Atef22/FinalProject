import React from 'react'
import { CartContext } from '../../Context/CartContext'
import { useContext, useEffect, useState } from 'react'
import { Link} from "react-router-dom";
import style from './Cart.module.scss'
export default function Cart() {
  let {getCart,cartNumber,updateCart,deleteCart,setcartNumber,deleteAllCart}=useContext(CartContext);
  const[data,setData]= useState([])
  const[cartPrice,setPrice]= useState([])
  async function getProduct() {
    let data = await getCart()
    console.log(data)
    if(data.data.status ==='success'){
    setData(data.data.data.products)
    setPrice(data.data.data.totalCartPrice)
    ;}else{
      setData([])
    }

    }

    
  useEffect(()=>{
    getProduct()
  },[])
  async function removeProduct(id) {
 let data = await deleteCart(id)
 setData(data.data.data.products)
 setPrice(data.data.data.totalCartPrice)
 setcartNumber(data.data.numOfCartItems)
//  console.log(data);
 }
  
async function updateProduct(id,count) {
  if(count ===0){
    removeProduct(id)
  }else{
 let data = await updateCart(id,count)
 setData(data.data.data.products)
 setPrice(data.data.data.totalCartPrice)
 setcartNumber(data.data.numOfCartItems)
}
 }

 async function removeAllProduct() {
  let data = await deleteAllCart()
  console.log(data);
  if(data.data.message ==='success'){
    setData([])
    setPrice(0)
    setcartNumber(0)
  }
}
  return (
    <div className='container p-4'>
      <div className="row ">
        <div className={`col-md-12 bg-main-light shadow p-5  ${style.bg} `}>
          <div className="d-flex justify-content-between my-3">
        <h2 className=' fw-bold text-main pb-5 fs-1'>Cart Shop</h2>
       <Link to='/CheckOut'> <button className='btn btn-warning text-light'> check out</button></Link></div>
         <div className="d-flex justify-content-between"> <h5 className='ps-2  fw-bold'>total price :  <span className='text-main fw-bold'> {cartPrice}</span><span className='text-muted'> EGP</span> </h5>
          <h5 className=' fw-bold ps-3'>total number of items: <span className='text-main fw-bold'> {cartNumber}</span> </h5>
          </div>
          {data.length!==0?<>{data.map((product)=>{ 
            return <div className="row border-bottom py-5" key={product._id}>
              <div className="col-md-2">
              <img src={product.product.imageCover} alt={product.title} className='w-100' />
              </div>
              <div className="col-md-10 d-flex align-items-center mt-5 justify-content-between">
                <div>
<h5 className='fw-bold'>{product.product.title}</h5>
<p className='fw-bold text-main m-3'>{product.price} <span className='text-muted'>EGP</span></p>
<button onClick={()=>{removeProduct(product.product._id)}} className='btn text-danger'><i className='fa-regular fa-trash-can text-danger'></i> Remove</button>
                </div>
                <div>
                <button onClick={()=>{updateProduct(product.product._id,product.count+1)}} className={`btn ${style.color} fw-bold`}> + </button>
                <span className='mx-2 fw-bold'>{product.count}</span>
                <button onClick={()=>{updateProduct(product.product._id,product.count-1)}} className={`btn ${style.color} fw-bold`}> - </button>
                </div>
              </div>
            </div>
          })
          }
          <div className='d-flex align-items-center mt-5 justify-content-center'><Link to='/home'> <button  onClick={()=>{removeAllProduct()}} className={`btn ${style.color} m-auto fw-bold`}> clear your cart</button></Link></div>
      </>  :
      
    <><h2 className='fw-bold'>your cart is empty</h2></>
      }
       
        </div>
      </div>
    </div>
  )
}

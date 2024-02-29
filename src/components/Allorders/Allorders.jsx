import axios from 'axios';
import React from 'react'
import { jwtDecode } from "jwt-decode";
import {  useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
export default function Allorders() {
  const userId=jwtDecode(localStorage.getItem('userToken')).id;
  const[alldata,setAllData]= useState([])
 async function getAllOrders (){
  try{
    let{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    console.log(data)
    setAllData(data)
  }catch (error){
console.log(error);
}
} 
useEffect(function(){getAllOrders ()},[])

  return (
  <div className="container p-4">
        <div className="row m-auto">
        <div className={`col-md-12 bg-main-light shadow p-5  mt-5 `}>
        <h2 className=' fw-bold text-main pb-2 fs-1'>All orders</h2>
   { alldata? alldata.map((order, index)=>{ 
      return <div className=" rounded-2" key={index}>
<div className="inner p-3 fw-bold ps-3  ">
  <div className=' float-end card p-5 m-auto bg-main  '><h5 className='fw-bold'><span className='text-light fw-bold '>details :</span>{order.shippingAddress.details}</h5>
  <h5 className='fw-bold'><span  className='text-light fw-bold '>phone :</span> {order.shippingAddress.phone}</h5>
  <h5 className='fw-bold'><span  className='text-light fw-bold '> city :</span> {order.shippingAddress.city}</h5>
  <h5  className='fw-bold'><span className='text-light fw-bold '>payment Method Type :</span> {order.paymentMethodType}</h5>
  <div className='d-flex mt-4 justify-content-center'>
  <h3 className='fw-bold'><span className='text-warning fw-bold ' >total price : </span> {order.totalOrderPrice} <span>EGP</span></h3>
  </div></div>

  <div className="row">
  {order.cartItems.map((item)=>{
   return <> <div className="col-md-2">
              <img src={item.product.imageCover} alt={item.title} className='w-100 mb-2' />
              </div>
             <div className="col-md-10 d-flex align-items-center mt-5 justify-content-between">
             <div>
 <h6 className='fw-bold'>{item.product.title}</h6>
 <p className='fw-bold text-main'>{item.price} EGP</p>
 </div> 
 </div> 
 </>
  })}
</div>
  </div>

          </div>
})
:<div className='vh-100 d-flex justify-content-center align-items-center'><BallTriangle
height={100}
width={100}
radius={5}
color="#4fa94d"
ariaLabel="ball-triangle-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/>
</div>}



</div>
        </div>
      </div>

  )
}

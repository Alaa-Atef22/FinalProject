
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
import style from "./Product.module.scss"
export default function Product() {
 let {addToCart,setcartNumber,addToList}=useContext(CartContext)
 const[productList,setProduct]= useState([])
 const[List,setList]= useState([])
   async function getProduct() {
 let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    console.log(data.data);
    setProduct(data.data);}
async function addToMyCart(id) {
 let {data} = await addToCart(id)
 if(data.status ==='success'){
  toast.success('its has been successfuly added', {
    icon: <i className="fa-solid fa-cart-plus"></i>
  });
  setcartNumber(data.numOfCartItems)
}
console.log(data);}
async function addToMyList(id) {
  let {data} = await addToList(id)
  if(data.status ==='success'){
    toast.success('its has been successfuly added', 
    {icon: <i className="fa-solid fa-heart fs-5 text-danger"></i>});
  console.log(data);
  }
    }

    let formik =useFormik({
      initialValues:{
       name:'',
}

    })
function searchByName(name){
  setList(productList.filter((product)=> product.title.toLowerCase().includes(name.toLowerCase())))
}
  useEffect(()=>{
    getProduct()
  },[])
  useEffect(()=>{
  return
  },List)
  return (
   <div className='container'>
    <div className='row pt-5'>
      {productList.length > 0 ?
      <>
      <form onSubmit={formik.handleSubmit}>
        <div className='m-5'>
    <input className="form-control w-75 m-auto " onChange={(e) => searchByName(e.target.value)} type='text' name='search' placeholder="Search...." />
</div>
</form>
{(List.length !== 0)?<>
{List.map((product) =>{
return <div className='col-md-3' key={product._id}>
<div className="product p-5">
  <Link to={`/details/${product._id}`}>
  <img src={product.imageCover} alt={product.title} className='w-100' />
<p className='text-success'>{product.category.name}</p>
<h6>{product.title}</h6>
<div className='d-flex justify-content-between '>
  <p>{product.price} EG</p>
  <p>{product.ratingsQuantity}<i className='fa-solid fa-star rating-color'></i></p>
</div>
</Link>
<button onClick={()=>{addToMyCart(product._id)}} className='btn bg-main w-75 me-2'>Add to cart </button>
<i onClick={(e)=>{addToMyList(product._id);e.target.classList.add(`${style.check}`);}}  className={`check fa-solid fa-heart fs-5 ` } ></i>
</div>
</div>
})}</>:<>{productList.map((product) =>{
  return <div className='col-md-3' key={product._id}>
  <div className="product p-5">
    <Link to={`/details/${product._id}`}>
    <img src={product.imageCover} alt={product.title} className='w-100' />
  <p className='text-main'>{product.category.name}</p>
  <h6>{product.title}</h6>
  <div className='d-flex justify-content-between '>
    <p className='text-main'>{product.price} <span className='text-muted'>EGP</span></p>
    <p>{product.ratingsQuantity}<i className='fa-solid fa-star rating-color ps-2'></i></p>
  </div>
  </Link>
  <button onClick={()=>{addToMyCart(product._id)}} className='btn bg-main w-75 me-2 text-light'>Add to cart </button>
  <i onClick={(e)=>{addToMyList(product._id);e.target.classList.add(`${style.check}`)
;
}} className={` check fa-solid fa-heart fs-5 ` } ></i>
  </div>
  </div>
  })}</>}
      </>
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
     </div>
      }
   
    </div>
    </div>
  )
}

import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import  {useContext, useEffect, useState} from 'react'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify';
import style from './Details.module.scss'

export default function Details() {
  let {addToCart,setcartNumber,addToList}=useContext(CartContext)
 let params= useParams();
 let productId= params.id
  const[productDetails,setDetails]= useState(null)

    async function getProduct() {
  let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    //  console.log(data.data);
     setDetails(data.data);
   }
   async function addToMyCart(id) {
    let {data} = await addToCart(id)
    if(data.status ==='success'){
     toast.success('its has been successfuly added', {
       icon: <i className="fa-solid fa-cart-plus"></i>
     });
     setcartNumber(data.numOfCartItems)
    }}
    async function addToMyList(id) {
      let {data} = await addToList(id)
      if(data.status ==='success'){
        toast.success('its has been successfuly added', 
        {icon: <i className="fa-solid fa-heart fs-5 text-danger"></i>});
      console.log(data);
      }
        }
        
   useEffect(()=>{getProduct()},[])
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='container'>
  <div className={`row d-flex align-items-center ${style.bg}`}>
  <div className="col-md-4">
    {productDetails?.imageCover.length > 1 ? 
      <Slider {...settings}>
      {productDetails?.images.map((image)=>{
return <img  className='w-100'src={image} alt={productDetails?.title} key={productId}/>
      })
      }
     </Slider>:
 <img src={productDetails?.imageCover} alt={productDetails?.title} className='w-100' />}
    </div>
    <div className="col-md-8">
<h2 >{productDetails?.title}</h2>
<p>{productDetails?.description}</p>
<div className='d-flex justify-content-around'><p className=' w-75 text-main fw-bold '>{productDetails?.price} <span className='text-muted '>EGP</span></p>
<span><i className='fa-solid fa-star rating-color pe-3'></i>{productDetails?.ratingsAverage}</span>
</div>
<div className='d-flex justify-content-between'>
<button onClick={()=>{addToMyCart(productDetails._id)}} className='btn bg-main w-75 m-auto text-light'> +Add </button> <i onClick={(e)=>{addToMyList(productDetails._id);e.target.classList.add(`${style.check}`);}} className="fa-solid fa-heart fs-5 m-auto"></i>
</div>

    </div>
  </div>
    </div>
  )
}

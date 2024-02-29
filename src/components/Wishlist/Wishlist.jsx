import React from 'react'
import { CartContext } from '../../Context/CartContext'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import style from "./Wishlist.module.scss"
export default function Wishlist() {
  let {addToCart,getlist,deletewishList}=useContext(CartContext);
  const[data,setData]= useState([])

  async function removeProduct(id) {
 let data= await deletewishList(id)
//  console.log(data);
  setData(data.data.data)
}
 async function addToMyCart(id) {
  let {data} = await addToCart(id)
  if(data.status ==='success'){
   toast.success('its has been successfuly added',{icon: <i className="fa-solid fa-cart-plus"></i>})
 removeProduct(id)
  }
  console.log(data)
}
  useEffect(()=>{
    (async()=>{ let data = await getlist();
     console.log(data.data.data);
     setData(data.data.data)
   })()
   },[])
  return ( <div className='container '>
  <div className="row ">
    <div className={`col-md-12 bg-main-light shadow p-5  ${style.bg}  `}>
      <div className="d-flex justify-content-between my-3">
    <h2 className=' fw-bold fs-1 text-main'> My Wish List</h2></div>
      {data.map((product,i)=>{ 
        return <div className="row border-bottom py-5" key={i}>
          <div className="col-md-2">
          <img src={product.imageCover} alt='title'className='w-100' />
          </div>
          <div className="col-md-10 d-flex align-items-center mt-5 justify-content-between">
            <div>
<h5 className='fw-bold'>{product.title}</h5>
<p className='fw-bold text-main m-3'>{product.price} <span className='text-muted'>EGP</span></p>
<button onClick={()=>{removeProduct(product._id)}} className='btn text-danger'><i className='fa-regular fa-trash-can text-danger'></i> Remove</button>
            </div>
            <div>
            <button onClick={()=>{addToMyCart(product._id)}} className='btn bg-main text-light w-100 me-2'>Add to cart </button>
            </div>
          </div>
        </div>
      })
      }
    </div>
  </div>
</div>
)
}


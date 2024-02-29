import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import { CartContext } from '../../Context/CartContext'
import  {useContext} from 'react'
import Swal from 'sweetalert2'
import style from "./Brands.module.scss"
export default function Brands() {
  let {Brands}=useContext(CartContext)
  async function addBrands(id) {
    let {data} = await Brands(id)
     if(data._id !==''){
      Swal.fire({
        title: `${data.data.name}`
        ,  showCloseButton: true
        ,cancelButtonText: "close",
        showCancelButton: true,
        showConfirmButton: false,
        imageUrl: `${data.data.image}`,
        color:'green',
      });
      console.log(data);
     }
  }

 async function getBrands(){
  return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)  
 }
let {data,isLoading}= useQuery('brands',getBrands,{
  cacheTime:5000
})

// console.log(data?.data.data);
  return (
    <div className='row g-4 m-5 '>
      <h1 className='d-flex justify-content-center align-items-center mt-4 text-main'>All Brands</h1>
      {!isLoading?<>
        {data?.data.data.map((brand)=>{
          
return <div className="col-md-3 " onClick={()=>{addBrands(brand._id)}} key={brand._id}>
  <div className={`border ${style.car }`}>
  <img className='w-100' src={brand.image} alt={brand.name}/>
  <p className='d-flex justify-content-center align-items-center'>{brand.name}</p>
  </div>
</div>
     })
     }
     
      </>:<div className='vh-100 d-flex justify-content-center align-items-center'><BallTriangle
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
  )
}

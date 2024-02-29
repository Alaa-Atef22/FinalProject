import axios from 'axios'
import React, { useState } from 'react'
import { useQuery} from 'react-query'
import Smarthome from '../Smarthome/Smarthome'
import style from "./Category.module.scss"
import { BallTriangle } from 'react-loader-spinner'
export default function Category() {
  const[subCategories,setSubCategories]= useState([])
 const[specificCategoy,setspecificCategoy]= useState([])
//  const[loading,setloading]= useState([])

 async function getCatgory() {
  return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)}

let {data,isLoading} = useQuery('categories', getCatgory,{
  cacheTime:5000})

async function getSubCategories(id) {
  // setloading(true)
let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
setSubCategories(data?.data)
getSpecificCategories(id)
// setloading(false)
}

async function getSpecificCategories(id) {
let specificCategoriesForName = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
setspecificCategoy(specificCategoriesForName.data.data.name)}

  return (<div className='container'><div className='row g-0 w-100 mt-5'>
    <title className='mt-5'>Categories</title> 
{data?.data.data.map((product) =>
<div className=" p-5 col-md-4 " >
<div className={`${style.car } border`} onClick={()=>{getSubCategories(product._id)}} key={product._id} >
<img src={product.image} alt={product.name} className='card-img-top w-100 'style={{height:'250px'}} />
<div className="card-body d-flex justify-content-center ">
<h6 className='text-main fw-bold p-3'>{product.name}</h6></div>
</div>
</div>
)}
  
</div> 
{isLoading?
       <div className='vh-100 d-flex justify-content-center align-items-center top-0 bottom-0'><BallTriangle
     height={100}
     width={100}
     radius={5}
     color="#4fa94d"
     ariaLabel="ball-triangle-loading"
     wrapperStyle={{}}
     wrapperClass=""
     visible={true} 
     />
     </div>:<div className=' m-auto'> 
     <Smarthome SubCategories={subCategories} specificCategoy={specificCategoy}></Smarthome></div>}
        
        
        
        </div>
        
)
}


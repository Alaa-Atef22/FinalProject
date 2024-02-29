import React from 'react'
import style from "./Smarthome.module.scss"
export default function Smarthome({SubCategories,specificCategoy}) {
  return<>
<h2 className='text-main text-center fw-bold p-4 m-4'>{specificCategoy.length > 0 ?( specificCategoy +'   Subcategories') :''}</h2>
{SubCategories?<div className='row g-5 mb-5'>

{SubCategories.map((product,index)=>{
return<div className='col-md-4' key={index}>
<div className={`${style.car } layer p-3 rounded-3 d-flex justify-content-center border`}>
  <span className='fw-bold text-center text-muted'>{product.name}</span>

</div>
</div>}
)

}

</div>:''}



    </>

}

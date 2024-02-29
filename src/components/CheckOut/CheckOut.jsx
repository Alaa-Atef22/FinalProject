
import { useFormik } from 'formik'
import React, { useContext, useState, useEffect} from 'react'
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';

export default function CheckOut() {
let {checkoutPayment,getCart}=useContext(CartContext)
    const [errMsg,setErr]=useState(null)
    let validationSchema = Yup.object({
    details:Yup.string().required(' details is required').min(3,'minlength is 3'),
    city:Yup.string().required(' city is required'),
    phone:Yup.string().required(' phone is required').matches(/^01[0125][0-9]{8}$/, 'invaild phone'),})
    const [cartId,setCartId]=useState('')
    useEffect(()=>{
        (async()=>{ let data =await getCart();
         setCartId(data.data.data._id)
        //  console.log(data.data.data._id);
       })()
       },[])
    async function payment(val) {
 let data = await checkoutPayment(cartId,val)
 console.log(data.data);
  if (data.data.status === 'success'){
    console.log('hi');
    window.location=data.data.session.url}}
    let formik =useFormik({
    initialValues:{
      details:'',
      city:'',
      phone:''}
    ,
    validationSchema:validationSchema,
    onSubmit:payment})
    return (
        <div className='container mt-5 pt-5'>
          <h1 className='text-main text-center my-5'>payment Form</h1>
          <form onSubmit={formik.handleSubmit}>
    <div className="row  gy-4">
    <div className="col-md-8 m-auto bg-light shadow p-4">
    <div className="row">
    <div className="col-md-12">
    <label htmlFor='userDetails' className='text-main mb-2'>details</label>
    <input type='text'id='userDetails' name ='details' value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control'></input></div>
    {formik.errors.details && formik.touched.details?<p className='text-danger'>{formik.errors.details}</p>:''}
    <div className="col-md-12">
<label htmlFor='userPhone' className='text-main mb-2'>phone</label>
<input type='tel'id='userPone' name ='phone' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control'></input></div>
{formik.errors.phone && formik.touched.phone?<p className='text-danger'>{formik.errors.phone}</p>:''}
    <div className="col-md-12">
    <label htmlFor='userCity' className='text-main mb-2'>city</label>
    <input type='text'id='userCity' name ='city' value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control'></input></div>
    {formik.errors.city && formik.touched.city?<p className='text-danger'>{formik.errors.city}</p>:''}
    {errMsg!==null?<p className='text-danger text-center'>{errMsg}</p>:''}
    <div className="col-md-12 text-center m-3"><button disabled={!(formik.isValid && formik.dirty)} type='submit'className='btn bg-main text-light'>Pay now
    </button></div>
    </div>
    </div>
    </div>
        </form>
        </div>
      )
  }
  
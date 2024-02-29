import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Signup() {
const [isloading,setloading]=useState(false)
const [errMsg,setErr]=useState(null)
let navigate=useNavigate()
let validationSchema = Yup.object({
name:Yup.string().min(3,'minlength is 3').max(10,'maxlength is 10').required('This name is required'),
email:Yup.string().required('This email is required').email('enter availd email'),
phone:Yup.string().required('This phone is required').matches(/^01[0125][0-9]{8}$/, 'This phone is required'),
password:Yup.string().required('This password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'this password is required'),
rePassword:Yup.string().required('This confirm password is required').oneOf([Yup.ref('password')],'not matched'),})

async function signUp(val) {
setloading(true)
let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).catch((err)=>{
setErr(err.response.data.message)
setloading(false)})
  console.log(data)
  if(data.message === 'success'){
    navigate('/signin')
    setloading(false)}}

let formik =useFormik({
initialValues:{
  name:'',
  email:'',
  password:'',
  rePassword:'',
  phone:''}
,
validationSchema:validationSchema,
onSubmit:signUp})
return (
    <div className='container mt-3 pt-1 '>
      <h1 className='text-main text-center my-5'>Register Form</h1>
      <form onSubmit={formik.handleSubmit}>
<div className="row  gy-4">
<div className="col-md-8 m-auto bg-light shadow p-4">
<div className="row gy-1">
<div className="col-md-12">
<label htmlFor='userName'className='text-main'>name</label>
<input type='text'id='userName' name ='name'onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control'></input></div>
{formik.errors.name && formik.touched.name?<p className='text-danger'>{formik.errors.name}</p>:''}
<div className="col-md-12">
<label htmlFor='userEmail' className='text-main'>email</label>
<input type='email'id='userEmail' name ='email'onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control'></input></div>
{formik.errors.email && formik.touched.email?<p className='text-danger'>{formik.errors.email}</p>:''}
<div className="col-md-12">
<label htmlFor='userPhone'className='text-main'>phone</label>
<input type='tel'id='userPone' name ='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control'></input></div>
{formik.errors.phone && formik.touched.phone?<p className='text-danger'>{formik.errors.phone}</p>:''}
<div className="col-md-12">
<label htmlFor='userPassword' className='text-main'>password</label>
<input type='password'id='userPassword' name ='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control'></input></div>
{formik.errors.password && formik.touched.password?<p className='text-danger'>{formik.errors.password}</p>:''}
<div className="col-md-12">
<label htmlFor='userConfirm' className='text-main' >rePassword</label>
<input type='password'id='userConfirm' name ='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control'></input></div>
{formik.errors.rePassword && formik.touched.rePassword?<p className='text-danger'>{formik.errors.rePassword}</p>:''}
{errMsg!==null?<p className='text-danger text-center'>{errMsg}</p>:''}
<div className="col-md-12 text-center m-3"><button disabled={!(formik.isValid && formik.dirty)} type='submit'className='btn bg-main text-light'>Register
{isloading?<span><i className='fa-solid fa-spinner fa-spin text-light mx-2 '></i></span>:''}
</button></div>
</div>
<div className="col-md-12 text-center m-0 "><p>I Have Account <Link className='text-main' to="/signin">Login</Link></p></div>
</div>
</div>
    </form>
    </div>
  )
}

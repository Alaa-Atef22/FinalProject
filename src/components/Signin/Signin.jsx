
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { userContext } from '../../Context/TokenContext';

export default function Signin() {
let {setToken}= useContext(userContext)
  const [isloading,setloading]=useState(false)
  const [errMsg,setErr]=useState(null)
  let navigate=useNavigate()
  let validationSchema = Yup.object({
  email:Yup.string().required('This email is required').email('enter availd email'),
  password:Yup.string().required('This password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, ' enter availd  password'),})
  
  async function signIn(val) {
  setloading(true)
  let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).catch((err)=>{
  setErr(err.response.data.message)
  setloading(false)})
    console.log(data)
    if(data.message === 'success'){
      navigate('/home')
      localStorage.setItem('userToken',data.token)
      setToken(data.token)
      setloading(false)}}
  
  let formik =useFormik({
  initialValues:{
    email:'',
    password:''}
  ,
  validationSchema:validationSchema,
  onSubmit:signIn})
  return (
    <div className=' container mt-5 pt-3'>
        <h1 className='text-main text-center my-5'>login Form</h1>
        <form onSubmit={formik.handleSubmit}>
  <div className="row  gy-4">
  <div className="col-md-8 m-auto bg-light shadow p-4">
  <div className="row">
  <div className="col-md-12">
  <label htmlFor='userEmail' className='text-main pt-3'>email</label>
  <input type='email'id='userEmail' name ='email'onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control'></input></div>
  {formik.errors.email && formik.touched.email?<p className='text-danger'>{formik.errors.email}</p>:''}
  <div className="col-md-12">
  <label htmlFor='userPassword' className='text-main pt-3' >password</label>
  <input type='password'id='userPassword' name ='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control'></input></div>
  {formik.errors.password && formik.touched.password?<p className='text-danger'>{formik.errors.password}</p>:''}
  {errMsg!==null?<p className='text-danger text-center'>{errMsg}</p>:''}

 <Link to='/forgetpassword'><p>forget your password ?</p></Link>

  <div className="col-md-12 text-center m-3"><button disabled={!(formik.isValid && formik.dirty)} type='submit'className='btn bg-main text-light'>login
  {isloading?<span><i className='fa-solid fa-spinner fa-spin text-light mx-2 '></i></span>:''}
  </button></div>
  </div>
  <div className="col-md-12 text-center m-3 "><p>I Have Account <Link className='text-main' to="/signup">Register</Link></p></div>
  </div>
  </div>
      </form>
      </div>
    )
}

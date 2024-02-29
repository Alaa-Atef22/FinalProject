import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import style from './Navbar.module.scss';
import { userContext } from '../../Context/TokenContext';
import { useEffect} from 'react'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {
  let {cartNumber,getCart,setcartNumber}=useContext(CartContext)
let {userToken,setToken}=useContext(userContext)
let navigate=useNavigate()
function Logout() {
  localStorage.removeItem('userToken');
  setToken(null);
  navigate('/Signin')
}

useEffect(()=>{
  ( async function(){
   let {data }= await getCart();
   setcartNumber(data.numOfCartItems)
})()
},[])

  return (
    <div> 
    <nav className={`navbar navbar-expand-sm  ${style.nav} fixed-top bg-light `}>
      <div className="container">
        <Link className={`navbar-brand  pe-3` } to=""  ><i className="fa-solid fa-cart-shopping text-main pe-2"></i><span>FreshCart</span></Link>
        <button className="navbar-toggler d-lg-none" type="button"data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
        {userToken !==null?  <ul className={`navbar-nav d-flex justify-content-end mt-2 mt-lg-0 ${style.navb} w-75 nav-pills flex-column flex-sm-row `}>
            <li className="nav-item">
              <Link className={`navbar-brand font-sm ${style.active} nav-link` } to="home">Home</Link>
            </li>
            <li className="nav-item">
                <Link className={`navbar-brand font-sm ${style.active} nav-link` } to="cart">Cart</Link>
            </li>
            <li className="nav-item">
                <Link className={`navbar-brand font-sm ${style.active} nav-link` } to="Wishlist">wish List</Link>
            </li>
            <li className="nav-item">
              <Link className={`navbar-brand font-sm ${style.active} nav-link` } to="product">Product</Link>
            </li>
            <li className="nav-item">
                <Link className={`navbar-brand font-sm ${style.active} nav-link` } to="category">Categories</Link>
            </li>
            <li className="nav-item">
                <Link className={`navbar-brand font-sm ${style.active} nav-link` } to="brands">Brands</Link>
            </li>
            <li className="nav-item">
                <Link className={`navbar-brand font-sm ${style.active} nav-link` } to="allorders">Allorders</Link>
            </li>
           
          </ul>:''}
        
          <ul className={`navbar-nav ms-auto mt-2 mt-lg-0 ${style.navb} nav-pills flex-column flex-sm-row `}>
          {userToken ==null?<>
          <li className="nav-item">
                <Link className={`navbar-brand ${style.test} ${style.active} nav-link` } to="signup">Register</Link>
            </li>
            <li className="nav-item">
                <Link className={`navbar-brand ${style.test} ${style.active} nav-link` } to="signin">Login</Link>
            </li></>:''}
            {userToken!==null?
           <>
            <li className="nav-item">
              <Link className='nav-link pe-4' to="cart">
            <i className="fa-solid fa-cart-shopping fs-5 "></i>
            <span className="badge bg-main text-light ">{cartNumber}</span>
            </Link>
            </li>
            <li onClick={()=>{Logout()}} className="nav-item mt-1">
                <Link className={`navbar-brand font-sm ${style.active} btn bg-main text-light ` } to="brands">Logout</Link>
            </li></>:''
             }
          </ul>
        </div>
      </div>
    </nav>
    </div>)
}

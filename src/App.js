
import './App.css';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Product from './components/Product/Product'
import Brands from './components/Brands/Brands'
import Category from './components/Category/Category'
import Cart from './components/Cart/Cart'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import Notfound from './components/Notfound/Notfound'
import UserContextProvider from './Context/TokenContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Details from './components/Details/Details';
import CartContextProvider from './Context/CartContext';
import { ToastContainer } from 'react-toastify';
import CheckOut from './components/CheckOut/CheckOut';
import Wishlist from './components/Wishlist/Wishlist';
import Allorders from './components/Allorders/Allorders';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Smarthome from './components/Smarthome/Smarthome';




 const router=createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {path:'',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'product',element:<ProtectedRoute><Product/></ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'category',element:<ProtectedRoute><Category/></ProtectedRoute>,children:[
      {path:'smarthome',element:<ProtectedRoute><Smarthome/></ProtectedRoute>}]},
    {path:'details/:id',element:<ProtectedRoute><Details/></ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'Wishlist',element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'CheckOut',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'signin',element:<Signin/>},
    {path:'forgetpassword',element:<ForgetPassword/>},
    {path:'resetpassword',element:<ResetPassword/>},
    {path:'signup',element:<Signup/>},
    {path:'*',element:<Notfound/>},
  ]}
])
function App() {
  return (
  <CartContextProvider>
  <UserContextProvider>
<RouterProvider router={router}></RouterProvider>
<ToastContainer theme='colored'/>
</UserContextProvider>
</CartContextProvider>
  );
}

export default App;

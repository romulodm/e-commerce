import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AdminHome from "./pages/admin/AdminHome"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminOrders from "./pages/admin/AdminOrders"
import { useSelector } from "react-redux";

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path="/products/:category" element={<ProductList />}/>
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/profile" element={user ? <Profile/> : <Navigate to="/" />} />

        <Route path="/login" element={user ? <Navigate to="/profile" />  : <Login />}/>
        <Route path="/register" element={user ? <Navigate to="/profile" />  : <Register />}/>
        <Route path="/reset-password" element={user ? <Navigate to="/profile" />  : <ResetPassword />}/>

        <Route path="/admin" element={user && user.isAdmin === true ? <AdminHome/> : <Navigate to="/" />} />
        <Route path="/admin/users" element={user && user.isAdmin === true ? <AdminUsers/> : <Navigate to="/" />} />
        <Route path="/admin/products" element={user && user.isAdmin === true ? <AdminProducts/> : <Navigate to="/" />} />
        <Route path="/admin/orders" element={user && user.isAdmin === true ? <AdminOrders/> : <Navigate to="/" />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
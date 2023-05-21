import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  //console.log("user", user)
  //const user = false
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path="/products/:category" element={<ProductList />}/>
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/profile" element={<Profile />}/>

        <Route path="/login" element={user ? <Navigate to="/profile" />  : <Login />}/>
        <Route path="/register" element={user ? <Navigate to="/profile" />  : <Register />}/>
        <Route path="/reset-password" element={user ? <Navigate to="/profile" />  : <ResetPassword />}/>


      </Routes>
    </BrowserRouter>
  );
};

export default App;
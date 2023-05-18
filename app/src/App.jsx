import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App = () => {
  //const user = useSelector((state) => state.user.currentUser);
  const user = false
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path="/products/:category" element={<ProductList />}/>
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/cart" element={<Cart />}/>

        <Route path="/login" element={user ? <Navigate to="/" />  : <Login />}/>
        <Route path="/register" element={user ? <Navigate to="/" />  : <Register />}/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
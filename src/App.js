import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import "./style.scss";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import { useSelector } from "react-redux";
import Profile from "./pages/profile/Profile";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Reviews from "./pages/reviews/Reviews";
import Register from "./pages/register/Register";
import Orders from "./pages/orders/Orders";
import Order from "./pages/order/Order";
import Success from "./pages/success/Success";

function App() {

  const user = useSelector((state) => state.user.currentUser)

  const Layout = () => {
    return(
      <div className="appContainer"
      style={{
        display: "flex",
        flexDirection: "column"
    }}>

        

          <Navbar />
          <Outlet />

      
      </div>
    )
  }

  const ProtectedRoutes = ({children}) => {
    if(user === null) {
      return <Navigate to="/" />;
    }

    return children
  }

  const router = createBrowserRouter([
    {path: "/", element: <Layout />, children: [

      {path: "/login", element: <Login />},
      {path: "/register", element: <Register />},
   
    {
      path: "/", 
      element: <Home />     
    },
    {
      path: "/products", 
      element: <Products />     
    },
    {
      path: "/orders/:userId", 
      element: 
        <ProtectedRoutes >
          <Orders />   
        </ProtectedRoutes>,      
    },
    {
      path: "/order/:id", 
      element: 
        <ProtectedRoutes >
          <Order />   
        </ProtectedRoutes>,    
    },
    {
      path: "/products/:category", 
      element: <Products />     
    },
    {
      path: "/product/:id", 
      element: <Product />     
    },
    {
      path: "/cart", 
      element: <Cart />     
    },
    {
      path: "/reviews", 
      element: <Reviews />     
    },
    {
      path: "/profile/:id", 
      element:   
        <ProtectedRoutes >
          <Profile />   
        </ProtectedRoutes>,

        
    },
    {
      path: "/success/:id", 
      element:   
        
          <Success />   
    
    },

    ]},


    
   
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import "./orders.scss";
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import { userRequest } from '../../requestMethods';
import { useSelector } from 'react-redux';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState(false)

    const user = useSelector(state => state.user.currentUser);
    useEffect( () => {

        const fetchOrders = async() => {
            try {
                const res = await userRequest.get(`orders/find/${user._id}`);
                setOrders(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        }

        fetchOrders();
    }, [])

    const notify = () => {
       
          
          toast.error("Netwokr Error", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    
        
      };

    console.log(orders)


  return (
    <div className='orders'>
            <ToastContainer />
        
                    <div className="container display">
                        <div className="heading">
                            <h1 className="title">Your Orders</h1>
                            <p className="desc">
                            All your orders and puchase history is found here
                            </p>
                        </div>

                        {
                             loading ?   <Stack sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}  width={"100%"} height={"70px"} spacing={2} direction="row">
                                            <CircularProgress sx={{color: "#8363ac"}} />
                                        </Stack>
                
                                    :
                                    orders && orders.length > 0 ? <div className="orderList">

                                        <div className="labels">
                                            <span className='id'>OrderID</span>
                                            <span className="count">Items</span>
                                            <span className="amount">Amount</span>
                                            <span className="status">Status</span>
                                            <span className="actions">Actions</span>
                                        </div>
                                        
                                        {orders.length > 0 && orders.map((order) => (
                                            <div className="listItem">
                                                <span className="id">{order._id}</span>
                                                <span className="count"><ShoppingBagOutlinedIcon  className='icon'/>{order.quantity}</span>
                                                <span className="amount">${order.amount.toFixed(2)}</span>
                                                <div className="status pending">
                                                    <span className={order.status}>{order.status}</span>
                                                </div>
                                                <div className="action">
                                                    
                                                    <Link style={{textDecoration: "none", color: "inherit"}} to={`/order/${order._id}`}><button>View Order</button></Link>
                                                </div>
                                            </div>
                                        ))}

                                        
                                    </div>

                                    : <span style={{
                                        width: "100%", 
                                        textAlign : "center",
                                        fontSize: "16px",
                                        color: "lightgray",
                                        fontWeight: "bold",
                                    }}>You have no orders in your history</span>
                        }

                    </div>


        <Footer />
    </div>
  )
}

export default Orders
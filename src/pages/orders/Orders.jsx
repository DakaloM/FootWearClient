import React, { useEffect, useState } from 'react';
import "./orders.scss";
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import { userRequest } from '../../requestMethods';
import { useSelector } from 'react-redux';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const user = useSelector(state => state.user.currentUser);
    useEffect( () => {

        const fetchOrders = async() => {
            try {
                const res = await userRequest.get(`orders/find/${user._id}`);
                setOrders(res.data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchOrders();
    }, [])

    console.log(orders)


  return (
    <div className='orders'>
        <div className="container display">
            <div className="heading">
                <h1 className="title">Your Orders</h1>
                <p className="desc">
                  All your orders and puchase history is found here
                </p>
            </div>

            <div className="orderList">

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
                        <span className="amount">${order.amount}</span>
                        <div className="status pending">
                            <span className={order.status}>{order.status}</span>
                        </div>
                        <div className="action">
                            
                            <Link style={{textDecoration: "none", color: "inherit"}} to={`/order/${order._id}`}><button>View Order</button></Link>
                        </div>
                    </div>
                ))}

                
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default Orders
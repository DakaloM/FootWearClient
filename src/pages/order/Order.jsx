import React, { useEffect, useState } from 'react';
import "./order.scss";
import Footer from '../../components/footer/Footer';
import { userRequest } from '../../requestMethods';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Order = () => {

    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true)
    const orderId = useParams().id
    const user = useSelector(state => state.user.currentUser)

    console.log("orderId: ", typeof(orderId))
    console.log("UserId: " ,typeof(user._id))

    

    
    useEffect(() => {
        const fetchOrder = async() => {
            try {
                const res = await userRequest.get(`orders/${user._id}/${orderId}`);
                setOrder(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        fetchOrder();
    }, [user.id, orderId])

    console.log(order)
  return (
    <div className='order'>
        <div className="container display">
            <div className="heading">
                <h1 className="title">Order Detals</h1>
                <p className="desc">
                  See all details about this order
                </p>
            </div>
            {
                loading ?  <Stack sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}  width={"100%"} height={"70px"} spacing={2} direction="row">
                                    <CircularProgress sx={{color: "#8363ac"}} />
                            </Stack>

                            :
            order?
            <div className="order">
                <div className="top">
                    <span className="header">Order Summary</span>
                    <span className="id">Order Id: <span>{order._id}</span></span>
                    <span className="count">Number of Items: <span>{order.quantity}</span></span>
                    <span className="amount">Amount: <span>${parseFloat(order.amount).toFixed(2)}</span></span>
                    <div className="status">
                        <span className="statusKey">Status: <span className={order.status}>{order.status}</span></span>
                    </div>
                </div>

                <div className="bottom">
                    <span className="header">Order Products</span>

                    <div className="labels">
                        <span className="product">Product</span>
                        <span className="quantity">Quantity</span>
                        <span className="subTotal">Subtotal</span>
                    </div>
                    <div className="productsList">
                        
                        {
                            order.products && order.products.map((product) => (

                                <div className="listItem">
                                    <div className="product">
                                        <div className="imgContainer">
                                            <img src={product.image} alt="" />
                                        </div>
                                        <div className="info">
                                            <span className="name">{product.title}</span>
                                            <span className="price">${product.price.toFixed(2)}</span>
                                        </div>
                                        
                                    </div>

                                    <span className="quantity"><ShoppingBagOutlinedIcon  className='icon'/>{product.quantity}</span>
                                    <span className="subTotal">${(product.price * product.quantity).toFixed(2)}</span>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div> 
            : "No Orders made Yet"
            }

            
        </div>

        <Footer />
    </div>
  )
}

export default Order
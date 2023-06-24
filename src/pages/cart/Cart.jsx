import React, { useEffect, useState } from 'react';
import "./cart.scss";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, increaseCount, decreaseCount } from '../../redux/cartRedux';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { publicRequest, userRequest } from '../../requestMethods';
import { resertCart } from '../../redux/cartRedux';
import axios, { Axios } from 'axios';
const Cart = () => {


  const [addShippingInfo, setAddShippingInfo] = useState(false)
  const [stripeToken, setStripeToken] = useState(null);
  const KEY = process.env.REACT_APP_STRIPE_KEY;

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const user =useSelector(state => state.user.currentUser);
  const navigate = useNavigate();


  const increase =  (product) => {
    dispatch(increaseCount(product))
  }
  const decrease =  (product) => {
    if(product.quantity >= 2){

      dispatch(decreaseCount(product))
    }
  }
  const remove =  (product) => {
    dispatch(removeProduct(product))
  }

  const handleCheckout = () => {
    if(user !== null) {
      setAddShippingInfo(true);
    } else {
      navigate("/login?reditect");
    }
  }

  const onToken = (token) => {
    setStripeToken(token)
  }

  useEffect(() => {
    const makePayment = async () => {
      try {
        const res = await userRequest.post(`checkout/payment`, {
            tokenId: stripeToken.id,
            amount: cart.total * 100
        })

        try {
          const res = await userRequest.post('orders', {
            userId: user._id,
            products: cart.products,
            amount: cart.total,
            address: {
              streetAddress: user.streetAddress,
              city: user.city,
              state: user.state,
              country: user.country,
              zip: user.zip
            },
            status: "complete",
            quantity: cart.quantity
          })

          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
        dispatch(resertCart())
        navigate(`/success/${user._id}`)
      } catch (error) {
        console.log("error: ", error)
      }
    }

    makePayment()

    
  }, [stripeToken])


  return (
    <div className='cart'>
       <div className="heading">
            <h1 className="title">Manage your Shoppiong Cart Here</h1>
            <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam
            </p>
        </div>
        <div className="container display">
            

            <div className="cartContainer">
                <div className="cartList">
                  <div className="cartListHeading">
                      <span className="item">Item</span>
                      <span className="quantity">Quatity</span>
                      <span className="subtotal">Subtotal</span>
                  </div>
                  {
                    cart && cart.products.map(product => (

                    
                    <div className="cartListItem">
                      <div className="product">
                        <img src={product.image} alt="" />
                        <div className="info">
                          <span className="name">{product.title}</span>
                          <span className="price">R {product.price.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="quantity">
                        <span onClick={() => increase(product)}><AddIcon  className='icon'/></span>
                        <span className="count">{product.quantity}</span>
                        <span onClick={() => decrease(product)}><RemoveIcon  className='icon'/></span>
                        <DeleteOutlineIcon  className='icon delete' onClick={() => remove(product)}/>
                        
                      </div>

                      <div className="total">
                        <span className="total">R {(product.price * product.quantity).toFixed(2)}</span>
                      </div>
                    </div>

                    ))
                  }
                  
                </div>
                <div className="rightSide">
                    <div className="totals">
                      <span className="title">Total</span>
                      <div className="item">
                        <span className="key">Items:</span>
                        <span className="value">{cart.quantity}</span>
                      </div>
                      <div className="item">
                        <span className="key">Total (R):</span>
                        <span className="value">R {cart.total.toFixed(2)}</span>
                      </div>
                      <button onClick={handleCheckout}>Checkout</button>
                    </div>

                    <Link style={{textDecoration: "none"}} to={"/products"}><span className="link"><KeyboardArrowLeftIcon className='icon'/>Continue Shopping</span></Link>

                    <div className="extras">
                      <div className="item">
                        <LockIcon className='icon'/>
                        <span>Secured Transaction</span>
                      </div>
                      <div className="item">
                        <LocalShippingIcon className='icon'/>
                        <span>Fast Delivery</span>
                      </div>
                      <div className="item">
                        <CreditCardIcon className='icon'/>
                        <span>Multiple Payment Options</span>
                      </div>
                    </div>

                    <div className={addShippingInfo? "shippingInfo open" : "shippingInfo"}>
                      <span className="header">Shipping Address</span>
                      

                      <div className="address">
                        <span>
                          <LocationOnOutlinedIcon className='icon'/>
                          {
                            user !== null &&
                            <span>
                              {user.streetAddress} {user.city} {user.state} {user.country} {user.zipCode}
                            </span>
                          }
                        </span>
                      </div>
                        <StripeCheckout
                          name="FootWear" // the pop-in header titler subtitle
                          amount={cart.total * 100} // cents
                          currency="USD"
                          billingAddress={false}
                          token={onToken} // submit callback
                          stripeKey={KEY}
                        
                          >
                          <button className="btn btn-primary">
                            Continue With Payment
                          </button>
                        </StripeCheckout>
                    </div>

                </div>
              </div>
        </div>
        <Footer />
    </div>
  )
}

export default Cart
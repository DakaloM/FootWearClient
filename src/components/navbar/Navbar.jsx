import React, { useState , useEffect, useRef} from 'react';
import "./navbar.scss";

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import CancelIcon from '@mui/icons-material/Cancel';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import EditIcon from '@mui/icons-material/Edit';
import {userRequest} from "../../requestMethods"
import { fetchAddress } from '../../redux/apiCalls';
import { logout } from '../../redux/userRedux';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
const Navbar = () => {

    

    const [profileOpen, setProfileOpen] = useState(false);
    const [address, setAddress] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);

    const cart = useSelector(state => state.cart);

    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();
    const navbarRef = useRef()

    
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    }

    useEffect(() => {
    window.addEventListener("scroll", handleScroll, {passive: true});

    return () => {
        window.removeEventListener("scroll", handleScroll)
    }
    }, [])

    


  return (
    <div className={scrollPosition > 0 ? 'navbar scrolled' : 'navbar'} ref={navbarRef}>
        <div className="container">
            <div className="logo">
                <Link style={{textDecoration: "none", color: "inherit"}} to="/"><h1>FootWear</h1></Link>
                <span onClick={() => setOpenMenu(!openMenu)}><MenuOutlinedIcon  className='icon'/></span>
            </div>

            <div className={openMenu ? "menu-user-wrapper active" : "menu-user-wrapper"}>

                
                    <div className="menu">
                        <ul>
                            <Link className='link' onClick={() => setOpenMenu(false)}  style={{textDecoration: "none", color: "inherit"}}to="/"><li>Home</li></Link>
                            <Link className='link' onClick={() => setOpenMenu(false)} style={{textDecoration: "none", color: "inherit"}}to="/products"><li>Shoes</li></Link>
                            <Link className='link' onClick={() => setOpenMenu(false)} style={{textDecoration: "none", color: "inherit"}}to="/cart"><li><ShoppingCartOutlinedIcon className='icon' /><span>{cart.quantity}</span></li></Link>
                            {user !== null && <Link className='link' onClick={() => setOpenMenu(false)} style={{textDecoration: "none"}}to={`orders/${user._id}`}><li>Orders</li></Link>}
                        </ul>
                    </div>

                    {
                        user === null?
                        <div className="user">
                        
                            <Link onClick={() => setOpenMenu(false)} style={{textDecoration: "none", color: "inherit"}} to="/register"><span>Register</span></Link>
                            <Link onClick={() => setOpenMenu(false)} style={{textDecoration: "none", color: "inherit"}} to="/login"><span>Login</span></Link>
                        
                        </div>

                        :(
                            <div className="user">
                        
                                <img src={user.image? user.image : "/img/avatar.jpg"} alt="" onClick={() => {setProfileOpen(true); setOpenMenu(false)}}/>
                        
                            </div>
                        )
                    }

            </div>
            
        </div>
        
        {user !== null && <div className={profileOpen? "profilebar active" : "profilebar "}>
        <span className='close' onClick={() => setProfileOpen(false)}><CancelIcon  className='icon'/></span>
            <div className="wrapper">
                
                <img src={user.image ? user.image : "/img/avatar.jpg"} alt="" />

                <div className="info">
                    <span className="title">Personal Info</span>
                    <span className="name"> <BadgeOutlinedIcon className='icon'/>{user.firstname} {user.lastname}</span>
                    <span className="email"><EmailOutlinedIcon className='icon'/>{user.email}</span>
                    <span className="phone"><PhoneInTalkOutlinedIcon className='icon'/>{user.phone}</span>
                </div>
                <div className="info">
                    <span className="title">Shipping address</span>

                    { 
                    user.streetAddress && user.city && user.state && user.country && user.zip ?
                    <span className="address">
                        <LocationOnOutlinedIcon className='icon'/>
                        <span>{user.streetAddress} {user.city} {user.state} {user.country} {user.zip}</span>
                    </span>
                    :
                    <span>Address details not complete</span>
                    
                    }
                    
                </div>

                <div className="actions">
                    <Link to={`/profile/${user._id}`} style={{textDecoration: "none", color: "inherit"}}>
                        <button onClick={() => setProfileOpen(false)}><EditIcon className='icon' />Profile</button>
                    </Link>
                    <button onClick={() => dispatch(logout())}><LogoutOutlinedIcon className='icon' />Logout</button>
                </div>
            </div>
        </div>}
       
    </div>
  )
}

export default Navbar
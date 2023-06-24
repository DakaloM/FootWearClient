import React from 'react';
import "./footer.scss";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
const Footer = () => {

    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
  return (
    <div className='footer'>
        <div className="footerContainer">
            <div className="top">
                <div className="left">
                    <div className="logo">
                        
                        <h1>FootWear</h1>
                        
                    </div>

                    <div className="contactInfo">
                        <span>
                            <LocalPhoneOutlinedIcon className='icon'/>
                            +27 60 225 3658 / +27 72 336 4769
                        </span>
                        <span>
                            <MailOutlineOutlinedIcon className='icon'/>
                            customercare@futware.com
                        </span>
                    </div>

                    <div className="socialIcons">
                        <ul>
                            <li><FacebookOutlinedIcon className='icon' /></li>
                            <li><TwitterIcon className='icon' /></li>
                            <li><InstagramIcon className='icon' /></li>
                            <li><YouTubeIcon className='icon' /></li>
                        </ul>
                    </div>
                </div>
                <div className="center">
                    <div className="quickLinks">
                        <span className='title'>Quick links</span>
                        <ul>
                            <li>Contact Us</li>
                            <li>Log a Return</li>
                            <li>Gift Cards</li>
                            <li>Sign In</li>
                            <li>Wishlist</li>
                            <li>Payment Options</li>
                        </ul>
                    </div>
                    <div className="legal">

                        <span  className='title'>Legal</span>
                        <ul>
                            <li>Refund Policy</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    <span className='title'>Subscribe to ourNewsletter</span>
                    <p>Sign up to stay in the loop. Receive updates, access to exclusive deals, and more.</p>
                    <form action="">
                        <input type="email" placeholder='Email address' />
                        <button>Subscribe</button>
                    </form>
                </div>
            </div>
            
        </div>
        <div className="bottom">
                <span className='text'>&#169; FutWear. All Rights Reserved. Web Design by dakalo Mbulaheni</span>
                
            </div>
    </div>
  )
}

export default Footer
import React from 'react';
import "./success.scss";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Footer from '../../components/footer/Footer';
import { Link, useParams } from 'react-router-dom';

const Success = () => {

    const userId = useParams().id
  return (
    <div className='success'>

        <div className="wrapper">
            <div className="top">
                <span className='iconContainer'><CheckCircleIcon className='icon' /></span>
                <span className="text">Transaction Successful</span>
            </div>
            <div className="bottom">
                <Link  style={{textDecoration: "none"}} to="/products"><span><KeyboardArrowLeftIcon className='icon left'/>Continue shopping</span></Link>
                <Link  style={{textDecoration: "none"}} to={`/orders/${userId}`}><span>View your orders<KeyboardArrowRightIcon className='icon'/></span></Link>
                
            </div>
        </div>

        
    </div>
  )
}

export default Success
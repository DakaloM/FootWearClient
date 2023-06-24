import React, { useEffect, useState } from 'react';
import "./carousel.scss";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { latestProducts } from '../../productData';
import { publicRequest } from '../../requestMethods';
import { Link } from 'react-router-dom';


const MultiCarousel = () => {

    const [list , setList] = useState([]);

    useEffect(() => {
      const fetchdata = async () => {
        const res = await publicRequest.get(`products?new=new`)
        setList(res.data);
      }

      fetchdata();
    })

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    
  return (
    <div className='carousel'>
        
        <Carousel  
            responsive={responsive}
            showDots={true}
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={3000}
            
        >
            
                <div className='card first' >
                    
                    <div className="imgContainer first">
                        <img src="/img/bg1.jpg"
                        alt="" />
                       
                        
                        
                    </div>
                    
                    <div className="info  alignCenter">

                        <div className="infoWrapper">
                          <span className="title">Latest Arrivals</span>
                          <p className="desc">Get the best and newest trends in the market</p>
                          <Link style={{textDecoration: "none"}} to="/products"><span className="button">Browse Collection</span></Link>
                        </div>
                        
                        
                    </div>

                </div>
                <div className='card first' >
                    
                    <div className="imgContainer second">
                       
                        <img src="/img/bg5.jpg"
                        alt="" />
                        
                       
                        
                        
                    </div>
                    
                    <div className="info second alignCenter">
                        <div className="infoWrapper">
                          <span className="title">Best Sneakers</span>
                          <p className="desc">We are the best at finding the most exclussive and trending Sneakers</p>
                          <Link style={{textDecoration: "none"}} to="/products/sport"><span className="button">Browse Collection</span></Link>
                        </div>
                        
                        
                    </div>

                </div>
                <div className='card third' >
                    
                    
                    
                    <div className="info  alignCenter">

                        <div className="infoWrapper">
                          <span className="title">Special Offers</span>
                          <p className="desc">Find out if you qualify for any special treatment from us</p>
                          <Link style={{textDecoration: "none"}} to="/products/popular"><span className="button">Browse Collection</span></Link>
                        </div>
                        
                        
                    </div>

                    <div className="imgContainer first">
                        <img src="/img/bg4.jpg"
                        alt="" />
                       
                        
                        
                    </div>

                </div>
                
            
            
            
        </Carousel>
    </div>
  )
}

export default MultiCarousel
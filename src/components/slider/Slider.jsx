import React, { useEffect, useState } from 'react';
import "./slider.scss";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { sliderData } from '../../productData';
import { publicRequest } from '../../requestMethods';

const Slider = ({product}) => {

  const [productImages, setProductImages] = useState([])

  useEffect(() => {
    const fetProductReviews = async () => {
      try {
        const res = await publicRequest.get(`images/${product._id}`);
        setProductImages(res.data.images)
      } catch (error) {
        console.log(error)
      }
    }
    fetProductReviews();

    
  }, [product._id])



  
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
    
        <Carousel  
            responsive={responsive}
            showDots={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            containerClass="carousel-container"
            
        >
            
                <div className='card' key={product._id}>
                    
                    <img src={product.image} 
                    alt="" />
                  
                   
                    
                </div>
                
                {
                  productImages && productImages.length > 0 && productImages.map((image) => (

                    <div className='card' key={image}>                   
                        <img src={image} 
                        alt="" />
                  
                    </div>
                  ))
                }
            
            
            
        </Carousel>
   
  )
}

export default Slider
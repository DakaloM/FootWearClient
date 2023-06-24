import React, { useEffect, useState } from 'react';
import "./product.scss";
import { Link, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { publicRequest } from '../../requestMethods';

const Product = ({product}) => {
  const [rating, setRating ] = useState(0);
  const [productRating, setProductRating] = useState([])

  useEffect(() => {
    const fetProductReviews = async () => {
      try {
        const res = await publicRequest.get(`/reviews/find/product/${product._id}`);
        setProductRating(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetProductReviews();

    
  }, [])

  useEffect(() => {
    if (productRating.length > 0){
      const total = productRating[0].total;
      const count = productRating[0].count;
      setRating((Math.floor(total / count)).toFixed(0))
    } else {
      setRating(0)
    }
  }, [])

  return (
    <div className="item" key={product._id}>
        <div className="imgContainer">
          <img src={product.image} alt="" />
        </div>

        <div className="info">
        <span className="title">{product.title}</span>
        <div className="stars">

          {Array(5).fill().map((_, index) => (

            rating >= index + 1 ? (
              <StarIcon className='icon' />
            ): (
              <StarBorderOutlinedIcon  className='icon'/>
            )
            
          ))}
          
        </div>
        
        {/* <span className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit
        </span> */}
        <span className="price">$ {product.price.toFixed(2)}</span>
        <Link style={{textDecoration: "none", color: "inherit"}} to={`/product/${product._id}`}><span className="button">View Shoe</span></Link>
        </div>
  
    </div>
  )
}

export default Product
import React, { useEffect, useState } from 'react';
import "./review.scss";
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { publicRequest, userRequest } from '../../requestMethods';
import { useSelector } from 'react-redux';
const Review = ({review, user}) => {

    

    
  return (


    <div className='Review'>

        <div className="top">
            <img src={user ?  review[0].image :  review.image } alt="" />
            <span className="name">{user ?  review[0].name :  review.name }</span>
            
            
        </div>

        <div className="bottom">
            {
                user? 
                (
                    <div className="stars">

                        {Array(5).fill().map((_, index) => (
        
                        review[0].rating >= index + 1 ? (
                            <StarIcon className='icon' key={index}/>
                        ): (
                            <StarBorderOutlinedIcon  className='icon' key={index}/>
                        )
                        
                        ))}
    
                    </div>
                ) : 
                (
                    <div className="stars">

                        {Array(5).fill().map((_, index) => (
        
                        review.rating >= index + 1 ? (
                            <StarIcon className='icon' key={index}/>
                        ): (
                            <StarBorderOutlinedIcon  className='icon'key={index}/>
                        )
                        
                        ))}
    
                    </div>
                )
            }
            <p style={{marginBottom: user ? "25px" :" 10px"}}>
                {user? review[0].message : review.message}
            </p>

            {user && user === true && <span className={`status ${review[0].status}`}>{review[0].status}</span>}
        </div>
        
                 
    </div>
  )
}

export default Review
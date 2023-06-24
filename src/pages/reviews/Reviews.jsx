import React from 'react';
import "./reviews.scss";
import Footer from '../../components/footer/Footer';

const Reviews = () => {
  return (
    <div className='reviews '>
        <div className="reviewsContainer display">
            <div className="heading">
                <h1 className="title">Top Customer Reviews</h1>
                <p className="desc">
                    Welcome to Footwear Customer feedbacks, here you can see how other customers feel about your favourate product
                </p>
            </div>
            
            <div className="reviewList">
                <div className="item">
                    <div className="imgContainer">
                        <img src="/img/formal2.jpeg" alt="" />
                    </div>

                    <div className="info">
                        <div className="productInfo">
                            <span className="name">Nike Presto</span>
                            <p className="message">I love this shoe</p>
                        </div>

                        <div className="userInfo">
                            <div className="left">
                                <img src="/img/avatar.jpg" alt="" />
                                <span className="name">Dakalo</span>
                            </div>

                            <div className="right">
                                <span className="rating">9.7</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="imgContainer">
                        <img src="/img/formal2.jpeg" alt="" />
                    </div>

                    <div className="info">
                        <div className="productInfo">
                            <span className="name">Nike Presto</span>
                            <p className="message">I love this shoe</p>
                        </div>

                        <div className="userInfo">
                            <div className="left">
                                <img src="/img/avatar.jpg" alt="" />
                                <span className="name">Dakalo</span>
                            </div>

                            <div className="right">
                                <span className="rating">9.7</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="imgContainer">
                        <img src="/img/formal2.jpeg" alt="" />
                    </div>

                    <div className="info">
                        <div className="productInfo">
                            <span className="name">Nike Presto</span>
                            <p className="message">I love this shoe</p>
                        </div>

                        <div className="userInfo">
                            <div className="left">
                                <img src="/img/avatar.jpg" alt="" />
                                <span className="name">Dakalo</span>
                            </div>

                            <div className="right">
                                <span className="rating">9.7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>

        <Footer />
    </div>
  )
}

export default Reviews
import React, { useEffect, useState } from 'react';
import "./home.scss";
import Navbar from '../../components/navbar/Navbar'
import MultiCarousel from '../../components/carousel/Carousel'
import { categories } from '../../productData'
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import { latestProducts } from '../../productData';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useSelector } from 'react-redux';
import { publicRequest } from '../../requestMethods';
const Home = () => {

  const [specialOffer, setSpecialOffer] = useState(false)
  const [number, SetNumber] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  
  const rating = 4;

  useEffect(() => {
    const fetchProducts = async () =>{
      try {
        const res = await publicRequest.get(`products?new=true`)
        setProducts(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts();
  }, [])

  return (
    <div className='home'>
        
        <MultiCarousel />

        {loading === false && <div className="featuredProducts display">
          <div className="heading">
              <h1 className="title">Featured Shoes</h1>
              <hr className="hline" />
          </div>
          <div className="wrapper">
              {products.map((product) => (
                <div className="card" key={product.id}>
                  <div className="imgContainer">
                    <img src={product.image} alt="" />
                  </div>

                  <div className="info">
                    <span className="title">{product.title}</span>
                    <div className="stars">

                        {Array(5).fill().map((_, index) => (

                          rating >= index + 1 ? (
                            <StarIcon className='icon' key={Date.now() + index}/>
                          ): (
                            <StarBorderOutlinedIcon  className='icon' key={Date.now() + index}/>
                          )
                          
                        ))}
                        
                      </div>
                    
                    <span className="price">R {product.price}</span>
                    <Link style={{textDecoration: "none", color: "inherit"}} to={`/product/${product._id}`}><span className="button">View</span></Link>
                  </div>
                </div>
              ))}

              <div className="buttonContainer">
                <Link style={{textDecoration: "none", color: "inherit"}} to="/products"><span className="button">More Shoes<KeyboardArrowRightIcon className='icon'/></span></Link>
              </div>
          </div>
        </div>}

        <div className="categories display">
          <div className="heading right">
            <h1 className="title">Browse Categories</h1>
            <hr className="hline" />
          </div>

          <div className="wrapper">
                <div className="left">
                    <div className="imgContainer" onMouseEnter={() => setSpecialOffer(true)} onMouseLeave={() => setSpecialOffer(false)}>
                      <img src="/img/categories.jpeg" alt="" />

                      
                    </div>
                    <div className= "specialOffer" onMouseEnter={() => setSpecialOffer(true)} onMouseLeave={() => setSpecialOffer(false)}>
                        <div className="blank">
                          
                        </div>
                        <div className="container">

                        
                          <div className={specialOffer? "wrapper active" : "wrapper"}>
                              <span className="title">Popular Shoes</span>
                              <p className="desc">Take a quick look at our most rated Shoes</p>
                              <Link style={{textDecoration: "none", color: "inherit"}} to="/products"><span className="button">Shop Now</span></Link>
                          </div>
                        </div>
                    </div>

                    

                   
                </div>

                <div className="right">
                  <div className="wrapper">

                    <div className="item sport">
                      <img src="/img/one.avif" alt="" />
                      <img src="/img/two.avif" alt="" />
                      <img src="/img/three.avif" alt="" />
                      <img src="/img/four.avif" alt="" />

                      <div className="info">
                        <span className="title">Sport</span>
                        <Link style={{textDecoration: "none", color: "inherit"}} to="/products/sport"><span className="button">Shop Now</span></Link>
                      </div>
                    </div>
                    <div className="item boots">
                      <img src="/img/boots.webp" alt="" />
                      <img src="/img/boots2.jpeg" alt="" />
                      <img src="/img/boots3.jpeg" alt="" />
                      <img src="/img/boots4.jpeg" alt="" />

                      <div className="info">
                        <span className="title">Boots</span>
                        <Link style={{textDecoration: "none", color: "inherit"}} to="/products/boots"><span className="button">Shop Now</span></Link>
                      </div>
                    </div>
                    <div className="item kids">
                      <img src="/img/kids.webp" alt="" />
                      <img src="/img/kids2.webp" alt="" />
                      <img src="/img/kids3.jpeg" alt="" />
                      <img src="/img/kids4.jpeg" alt="" />

                      <div className="info">
                        <span className="title">Kids</span>
                        <Link style={{textDecoration: "none", color: "inherit"}} to="/products/kids"><span className="button">Shop Now</span></Link>
                      </div>
                    </div>
                    <div className="item summer">
                      <img src="/img/summer1.webp" alt="" />
                      <img src="/img/summer2.jpeg" alt="" />
                      <img src="/img/summer3.jpeg" alt="" />
                      <img src="/img/summer4.jpeg" alt="" />

                      <div className="info">
                        <span className="title">Summer</span>
                        <Link style={{textDecoration: "none", color: "inherit"}} to="/products/summer"><span className="button">Shop Now</span></Link>
                      </div>
                    </div>
                    <div className="item indoor">
                      <img src="/img/indoor1.jpeg" alt="" />
                      <img src="/img/indoor2.webp" alt="" />
                      <img src="/img/indoor3.jpeg" alt="" />
                      <img src="/img/indoor4.jpeg" alt="" />

                      <div className="info">
                        <span className="title">In-door</span>
                        <Link style={{textDecoration: "none", color: "inherit"}} to="/products/indoor"><span className="button">Shop Now</span></Link>
                      </div>
                    </div>
                    <div className="item formal">
                      <img src="/img/formal1.jpeg" alt="" />
                      <img src="/img/formal2.jpeg" alt="" />
                      <img src="/img/formal3.jpeg" alt="" />
                      <img src="/img/formal4.jpeg" alt="" />

                      <div className="info">
                        <span className="title">Formal</span>
                        <Link style={{textDecoration: "none", color: "inherit"}} to="/products/formal"><span className="button">Shop Now</span></Link>
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

export default Home
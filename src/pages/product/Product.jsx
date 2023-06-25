import React, { useEffect, useState } from 'react';
import "./product.scss";
import Navbar from '../../components/navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/footer/Footer';
import Slider from '../../components/slider/Slider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, useParams } from 'react-router-dom';
import { publicRequest, userRequest } from '../../requestMethods';
import { addProduct } from '../../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Review from '../../components/review/Review';
import Message from '../../components/message/Message';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Product = () => {

  const [file, setFile] = useState("");
  const [openReviewForm, setOpenReviewForm] = useState(false)
  const [number, SetNumber] = useState(0)
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const [color, setColor] = useState("");
  const [colorMissing, setColorMissing] = useState(false)
  const [sizeMissing, setSizeMissing] = useState(false)
  const [size, setSize] = useState("");
  const [message, setMessage] = useState("")
  const [userReview, setUserReview] = useState()
  const [productReviews, setProductReviews] = useState([])
  const [complete, setComplete] = useState(false);
  const [completeMessage, setCompleteMessage] = useState("");
  const [completeType, setCompleteType] = useState("");
  const [tracker, setTracker] = useState(0);
  const [displayUserReview, setDisplayUserReview] = useState(false)
  const [reviewHeight, setReviewHeight] = useState('fit-content');
  const [formHeight, setFormHeight] = useState(0);
  const [rating, setRating ] = useState(0);
  const [productRating, setProductRating] = useState([])
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart)
  const productId = useParams().id;
  const user = useSelector(state => state.user.currentUser);
  const userId = user? user._id : null;

  

  useEffect(() => {
    if(complete === true){
      notify();
    }
  }, [complete])
  
  const notify = () => {
    if(completeType === "success"){
      
      toast.success(completeMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    } else if(completeType === "error"){
      toast.error(completeMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };


  console.log("COLOR: ", color)

  useEffect(() => {
    if(userReview) {
      setDisplayUserReview(true)
    }
  }, [userReview])



  const handleCartAdd = () => {

      
      const exist = cart.products.find(product => product._id === productId)? true : false

      
        
     
      if(color !== "" && size !== "") {

        if (!exist) {
          const { desc, categories, inStock, rating, __v, createdAt, updatedAt, color, quantity, size,...others} = product
          dispatch(addProduct({...others, quantity: count, color, size }));
          setComplete(true)
          setCompleteType("success")
          setCompleteMessage("Product added to cart")
        }
        else {
          setComplete(true)
          setCompleteType("error")
          setCompleteMessage("Product already in cart")
        }
  
        window.setTimeout(() => {
          setComplete(false)
        }, 7000)
      }
      else {
        if(color === "") {
          setColorMissing(true)
        }
        else if(size === "") {
          setSizeMissing(true)
        }
      }

      

      
      
  }



  const handleRating = async (e) => {
    e.preventDefault();
    try {
      const name = user.firstname !== "" ? user.firstname + user.lastname !== "" ? user.lastname : "" : user.username 
      const image = user !== null ? user.image : "https://www.pngarts.com/files/3/Avatar-Free-PNG-Image.png"
      const res = await userRequest.post(`reviews`, {productId,image:image ,name:name  , userId, rating: number,  message});

      setComplete(true)
      setCompleteType("success")
      setCompleteMessage("Review added successfully")
      setTracker(tracker + 1)
      window.setTimeout(() => {
        closeAddReview()
        setComplete(false)
      }, 4000)
    } catch (error) {
      setComplete(true)
      setCompleteType("error")
      setCompleteMessage("Something went wrong, try again later")
      console.log(error)
    }
}
  const handleRatingUpdate = async (e) => {
    e.preventDefault();
    try {
      const name = user.firstname !== "" ? user.firstname + user.lastname !== "" ? user.lastname : "" : user.username 
      const image = user !== null ? user.image : "https://www.pngarts.com/files/3/Avatar-Free-PNG-Image.png" 
      const res = await userRequest.put(`reviews/${user._id}?reviewId=${userReview[0]._id}`, {
        productId,image:image ,name:name  , userId, rating: number,  message, status: "pending"
      });
      console.log(res.data)
      setComplete(true)
      setCompleteMessage("Review added successfully")
      setTracker(tracker + 1)
      window.setTimeout(() => {
        closeAddReview()
        setComplete(false)
      }, 4000)
    } catch (error) {
      console.log(error)
    }
}

  useEffect(() => {

    const fetProductReviews = async () => {
      try {
        const res = await publicRequest.get(`/reviews`);
        const reviews = res.data.filter(review => review.productId === productId)
        const approvedReviews = reviews.filter(review => review.status === "approved");
        setProductReviews(user === null ? approvedReviews : approvedReviews.filter(review => review.userId !== userId))
        setUserReview(user !== null ? reviews.filter(review => review.userId === user._id): [])
      } catch (error) {
        console.log(error)
      }
    }
    fetProductReviews();

  }, [user !== null && user._id, tracker])

  useEffect(() => {

    const fetProductReviews = async () => {
      try {
        const res = await publicRequest.get(`/reviews/find/product/${productId}`);
        setProductRating(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetProductReviews();

  }, [tracker])

  useEffect(() => {
    if(productRating.length > 0) {
      const total = productRating[0].total
      const count = productRating[0].count
      setRating((Math.floor(total / count)).toFixed(0))
    }else {
      setRating(0)
    }
  }, [productRating])

  
  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const res = await publicRequest.get(`products/${productId}`);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }

    fetchProduct();
  },[])

  const openAddReview = () => {
    setDisplayUserReview(false);
    window.setTimeout(()=>{
      setReviewHeight(0)
      setFormHeight("fit-content")
    },300)
    window.setTimeout(()=>{
      setOpenReviewForm(true)
    },400)
  }
  const closeAddReview = () => {
    setOpenReviewForm(false);

    window.setTimeout(()=>{
      setReviewHeight("fit-content")
      setFormHeight(0)
    },300)
    window.setTimeout(()=>{
      setDisplayUserReview(true)
    },400)
  }




  return (
    <div className='product'>
      {product ?<>
        <ToastContainer />
        <div className="heading">
            <h1 className="title">Customise Your Product</h1>
            <p className="desc">
            Tell us how you like your product
            </p>
        </div>

        {
                  loading ? <Stack sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                }}  width={"100%"} height={"70px"} spacing={2} direction="row">
                                <CircularProgress sx={{color: "#8363ac"}} />
                          </Stack>

                          :

            
                    <div className="container display">
                        <div className="productContainer">
                          
                            <div className="left">
                              <div className="imageContainer">
                                <img src={product.image} alt="" />
                              </div>
                            </div>
                          

                          <div className="right">
                              <span className="name">{product.title}</span>
                              <p className="desc">
                                {product.desc}
                              </p>
                              {rating > 0 && <div className="stars">

                                      {Array(5).fill().map((_, index) => (

                                        rating >= index + 1 ? (
                                          <StarIcon className='icon' key={index}/>
                                        ): (
                                          <StarBorderOutlinedIcon  className='icon' key={index}/>
                                        )
                                        
                                      ))}
                                      
                              </div>}
                              <span className="price">$ {product.price}</span>

                              <select style={{ marginBottom:colorMissing === false? "20px" : " 5px"}} name="color" id="" onChange={e => setColor(e.target.value)}>
                                <option selected disabled>Choose Color</option>
                                {
                                  product.color && product.color.map((c) => (
                                    <option value={c} key={c}>{c}</option>
                                  ))
                                }
                              </select>
                              {colorMissing && <span className="erroMessage">Chose color</span>}

                              <select style={{ marginBottom:sizeMissing === false? "20px" : " 5px"}} name="size" id="" onChange={e => setSize(e.target.value)}>
                                <option selected disabled>Choose Size</option>
                                {
                                  product.size && product.size.map((size) => (
                                    <option value={size} key={size}>{size}</option>
                                  ))
                                }
                              </select>
                              {sizeMissing && <span className="erroMessage">Chose size</span>}

                              <div className="quantity">
                                <span className="title">Qauntity</span>
                                <div className="qItem">
                                  <span className='qLeft' onClick={() => setCount(count > 1?count - 1 : 1)}><RemoveIcon  className='icon'/></span>
                                  <span className="count">{count}</span>
                                  <span className='qRight' onClick={() => setCount(count + 1)}><AddIcon  className='icon right'/></span>
                                </div>
                              </div>

                              <span className="button" onClick={handleCartAdd}>Add to cart</span>

                              
                          </div>
                        </div>
                        <div className="links">

                                <Link style={{textDecoration: "none"}} to="/products"><span><ChevronLeftIcon className='icon' />Continue Shopping</span></Link>
                                <Link style={{textDecoration: "none"}} to="/cart"><span>Proceed to cart<ChevronRightIcon className='icon' /></span></Link>

                              </div>
                        <div className="banner">
                          <span className="title">Reviews</span>
                          {user !== null && <span className='add' onClick={openAddReview}><AddIcon className='icon'/> {userReview && userReview.length !== 0 ? "Edit Review" : "Add Review"}</span>}
                        </div>
                        <div className="reviews">
                        
                        <div className="left">
                          
                              <div className="heading review">
                                <span className="title">What they say about this product</span>
                              
                              </div>
                            

                            <div className="rewiewList">

                              

                              {
                                productReviews.length > 0 ? 
                                productReviews.map((r) =>(
                                  <Review review={r} key={r._id}/>
                                ))
                                
                                : "No reviews yet for this product"
                              }

                            </div>
                        </div>

                        <div className="right">
                            <div className="userReviewContainer" style={{height: `${reviewHeight}`}}>
                              {
                                userReview && userReview.length !== 0 ?
                                <div className={displayUserReview? "userReview active" : " userReview"}>
                                  <span className="title">Your review</span>
                                  <Review review={userReview} user={true} />
                                </div>

                                : user === null ? <span className='noUserMessage'>You must be logged in to add a review</span> : <span className='noUserMessage'>You have not yet added a review for this product</span>
                              }
                            </div>
                          <div className={openReviewForm? "reviewForm open" : "reviewForm"} style={{height: `${formHeight}`}}>

                            <span className="title">Review Form</span>
                            <p className="desc">Kindly fill the form below and let us know how you feel about this product</p>

                            <form action="">

                                <div className="inputGroup poster">
                                  {product.image &&  <img src={product.image} alt="" />}
                                </div>

                                <div className="inputGroup poster">
                                  <span className="evaluate">Evaluate</span>

                                    <div className="stars">

                                      {Array(5).fill().map((_, index) => (

                                        number >= index + 1 ? (
                                          <StarIcon className='icon' onClick={() => SetNumber(index +1)} key={index}/>
                                        ): (
                                          <StarBorderOutlinedIcon  className='icon'onClick={() => SetNumber(index +1)} key={index}/>
                                        )
                                        
                                      ))}
                                      
                                  </div>

                                  <span className="feedback">
                                    {
                                      number === 1 ? "Not Satisfied" : number === 2? "Almost Satisfied": number === 3? "Satisfied"
                                      : number === 4? "Very Satisfied" : number === 5 ? "Excellent Product" : ""
                                    }
                                  </span>

                                </div>
                                <div className="inputGroup">
                                  <textarea name="" id="message" cols="30" rows="10" placeholder='Write your review message here'
                                    onChange={e => setMessage(e.target.value)} value={message}
                                  ></textarea>
                                </div>
                                

                                <button onClick={userReview && userReview.length !== 0 ? handleRatingUpdate : handleRating}>Send</button>

                                
                                <span className="close" onClick={closeAddReview}><CancelIcon className='icon'/></span>
                            </form>
                          </div>
                        </div>
                        </div>
                    </div>
        }


        <Footer />
      </> : "Loading.."}
    </div>
  )
}

export default Product
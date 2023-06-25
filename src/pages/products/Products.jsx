import React, { useEffect, useState } from 'react';
import "./products.scss";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Slider from '../../components/slider/Slider';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { colors, categories } from '../../productData';
import { publicRequest } from '../../requestMethods';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartRedux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Product from '../../components/product/Product';
import Pagination from '../../components/pagination copy/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Products = () => {

  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState([])
  const [sort, setSort] = useState("");
  const [displayList, setDisplayList] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const category = useParams().category

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSearch("")
    setSort("")
  }



  useEffect(() => {

    const fetchProducts = async() => {
      try {
        const res =  category? await publicRequest.get(`products?category=${category}`) : await publicRequest.get(`products`);
        setProductList(res.data);
        setDisplayList(res.data)
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts();
  }, [category]);

  useEffect(() => {
      
      if(category) {
       
        if(search !== ""){
          setDisplayList(productList.filter(product => product.title.toLowerCase().includes(search.toLowerCase())));
        } else {
          setDisplayList(productList);
        }
        
        
      }
      else if(filter){
       
        setDisplayList(productList.filter(product => product.categories.includes(filter)))
        
      }
      else if(search){
        
          setDisplayList(productList.filter(product => product.title.toLowerCase().includes(search.toLowerCase())))
        
      }

      else {
        setDisplayList(productList)
      }
      
  }, [filter, sort, search, category])
  

  
  // Get current Post
  const indexOfLastProduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;
  const currentProducts = displayList.slice(indexOfFirstProduct, indexOfLastProduct);
  
  
  
  return (
    <div className='products'>
        

        <div className="productList display">
            <div className="heading">
                <h1 className="title">We have the best Products on sale</h1>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                  molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
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


                      <div className="wrapper">

                        {displayList && displayList.length > 0 ? <div className={category ? "fiterSection category": "fiterSection "}>
                          
                            <div className="filterItem category">


                                {!category && <select name="categories" id=""
                                    onChange={handleFilterChange}
                                  >
                                  <option selected disabled >Category</option>
                                  <option value="formal">Formal</option>
                                  <option value="summer">summer</option>
                                  <option value="kids">kids</option>
                                  <option value="indoor">indoor</option>
                                  <option value="boots">boots</option>
                                  <option value="sport">sport</option>
                                </select>}
                              

                            </div>

                            <div className=" search">
                              <SearchIcon className='icon' />
                              <input type="text" placeholder='Search...' onChange={e => setSearch(e.target.value)}
                                value={search}
                              />
                            </div>
                            


                          
                        </div> : "Loading..."}

                        <div className="productsList ">
                            <div className="wrapper">

                              {
                                currentProducts.map((product) => (
                                  <Product product={product} key={product._id} />
                                ))
                              }

                            </div>
                        </div>

                        <Pagination productsPerPage={perPage} currentPage={currentPage} 
                            totalProducts={displayList.length}  setCurrentPage={setCurrentPage}/>
                      </div>
          }

          
        </div>
        <Footer />
    </div>
  )
}

export default Products
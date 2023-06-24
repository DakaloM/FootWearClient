import React, { useEffect, useState } from 'react';
import "./popular.scss";
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

const Products = () => {

  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState([])
  const [sort, setSort] = useState("");
  const [displayList, setDisplayList] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(18);
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
        setDisplayList(productList);
        if(search !== ""){
          setDisplayList(productList.filter(product => product.title.toLowerCase().includes(search.toLowerCase())));
        }
        
        
      }
      else if(filter){
        setFilteredList(productList.filter(product => product.categories.includes(filter)));
        setDisplayList(productList.filter(product => product.categories.includes(filter)))
        
      }
      else if(search){
        if(filter) {
          setDisplayList(filteredList.filter(product => product.title.toLowerCase().includes(search.toLowerCase())));
          setSort("")
        }
        else {
          setDisplayList(productList.filter(product => product.title.toLowerCase().includes(search.toLowerCase())))
        }
      }
      else if(sort){
        if(filter && search === ""){
          setDisplayList(filteredList.sort(
            sort === "highest"? ((a, b) => (a.price > b.price)) : ((a, b) => (a.price < b.price))
          ));
        }
        else if(filter == "" && search){
          setDisplayList((productList.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))).sort({createdAt: parseInt(sort)}).limit(5));
        }
        else if(filter && search){
          setDisplayList((filteredList.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))).sort({createdAt: parseInt(sort)}).limit(5));
        }
      }
      else {
        setDisplayList(productList)
      }
      
  }, [filter, sort, search, category])
  

  console.log("category: " + category)
  console.log("filter: " + filter)
  console.log("search: " + search)
  console.log("sort: " + sort)
  console.log("list" ,displayList)
  
  // Get current Post
  const indexOfLastProduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;
  const currentProducts = displayList.slice(indexOfFirstProduct, indexOfLastProduct);
  
  
  
  return (
    <div className='popular'>
        

        <div className="productList display">
            <div className="heading">
                <h1 className="title">We have the best Products on sale</h1>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                  molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                </p>
            </div>
          <div className="wrapper">

            <div className={category ? "fiterSection category": "fiterSection "}>
              
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
                
                    

                <div className="filterItem price">
                  
                    <select  name="price" id="" onChange={e => setSort(e.target.value)}>
                          <option selected disabled>Sort By Price</option>
                          <option value="highest">Highest</option>
                          <option value="lowest">Lowest</option>
                    </select>

                </div>

              
            </div>

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

          
        </div>
        <Footer />
    </div>
  )
}

export default Products
import './App.css';
import React,{useState} from "react";
//o tambien podemos importar solo el useState asi import React,{useState} from "react"; y usamos no React.useState sino solo useState
import Category from "./components/category.js";
import { getCategories } from "./functions/fetcher.js"; 
//import CategoryProduct from "./components/categoryProduct.js";
//import { Outlet } from "react-router-dom";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ProductDetail from "./components/productDetail";
import Basket from './components/basket'; 
import  Checkout  from './components/checkout';
import Layout from './components/layout';
import Home from './components/home.js';
import OrderConfirmation from "./components/ordenConfirmation";
import SearchResults from './components/searchResults';
function App() {
  const [categories, setCategories] = useState({errorMessage: "" ,data: []});
 // const [products, setProducts] = useState({errorMessage: "" ,data: []});

  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      
      setCategories(responseObject);
    }
    fetchData();
    
  },[])

  // const handleCategoryClick = id => {

  //   const fetchData = async () => {
  //     const responseObject = await getProducts(id);
  //     debugger;
  //     setProducts(responseObject);
  //   }
  //   fetchData();
    
  // }

  // const renderCategories = () => {
    
  //   return categories.data.map(c => 
  //     <li key={c.id}>
  //       <Link to={`/categories/${c.id}`}>{c.title}</Link>
  //     </li>
  //     //<Category key={c.id} id={c.id} title={c.title} onCategoryClick ={()=>handleCategoryClick(c.id)} /> //La hemos reemplazado por el link de arriba para evitar que llene toda la pantalla
  //   )
  // }
  // const renderProducts = () => {
  //   return products.data.map(p=><CategoryProduct key={p.id} {...p}>{p.title}</CategoryProduct>

  //   )
  // }
  return (
    <>
    <BrowserRouter> 
        <Routes>
              <Route path="/" element={<Layout categories={categories}/>}>  
                      <Route index element={<Home/>} />
                      <Route path='basket' element={<Basket/>} />
                      <Route path='checkout' element={<Checkout />}/>
                      <Route path="orderConfirmation" element={<OrderConfirmation />}/>
                      <Route path="search" element={<SearchResults/>}></Route>
                      <Route path ='products/:productId' element ={<ProductDetail/>}/>
                      <Route path='categories/:categoryId' element={<Category/>}/>
              </Route>
        </Routes>
    
    </BrowserRouter> 
    </>
  );
}
//El Outlet se usa para determinar adonde va a empezar a renderizar nuestras rutas en este caso en la app principal
export default App;

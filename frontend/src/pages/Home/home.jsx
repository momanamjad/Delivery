import React, { useState } from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import './home.css'
import Appdownload from '../../components/AppDownload/Appdownload'
import Header from '../../components/Header/header'
import ExplaoreMenu  from '../../components/ExplaoreMenu/ExplaoreMenu'

const Home = () => {
const[category,setcategory]=useState("All");

  return (
    <>
    <Header/>
    <ExplaoreMenu category={category}setcategory={setcategory}/>
    <FoodDisplay category={category}/>
    <Appdownload/>
    
    </>
  )
}

export default Home
import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const getProducts = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/list-products/')
    console.log(response.data.products)
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <>
      
    </>
  )
}

export default App

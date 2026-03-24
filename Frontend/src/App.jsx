import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CategoryIndex from './pages/CategoryIndex'
import CategoryCreate from './pages/CategoryCreate'
import ProductIndex from './pages/ProductIndex'

function App() {
  

  return (
    <>
    
      <CategoryCreate></CategoryCreate>
      <CategoryIndex></CategoryIndex>
      <ProductIndex></ProductIndex>
    </>
  )
}

export default App

import { useLayoutEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import Createblog from './pages/Createblog.jsx'
import Nopage from './pages/Nopage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/blog/:id' element={<Blog />}></Route>
          <Route path='/create' element={<Createblog />}></Route>
          <Route path='*' element={<Nopage />}></Route>
        </Route>

      </Routes>
    </>
  )
}

export default App;

import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
// import { useNavigate} from 'react-router-dom'
import Login from './componants/auth/Login.jsx'
import Protectedroute from './protectedroute.jsx'
import Signup from './componants/auth/Signup.jsx'
import  Dash  from './componants/dashboard/Dash.jsx'
import './App.css'
import Dish from './componants/dashboard/Dish.jsx'
import Resturant from './componants/dashboard/Resturant.jsx'
import Cart from './componants/dashboard/Cart.jsx'
function App() {


  return (
  
       <>
    <div className="app">
      <Routes>
 <Route path='/' element={<Signup/>}/>
 <Route path='/dish' element={<Dish/>}/>
 <Route path="/resturant/:id" element={<Resturant/>} />
 <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dash'
      element={
      <Protectedroute>
      <Dash/>
      </Protectedroute>
      }/>

      </Routes>
    
    </div>
    </>
   
   
  )
}

export default App

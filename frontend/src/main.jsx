import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Newreg from './Newreg.jsx'
import Product from './Product.jsx'
import Int from './Interest.jsx'
import Con from './Contact.jsx'
import Len from './Lend.jsx'
import Pro from './Profile.jsx'
import Si from './PaymentPage.jsx'


import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App></App>
  
  },
  {
    path:'/ck',
    element:<Si></Si>
  },
  {
    path:'/interest/:id',
    element:<Int></Int>
  },
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:'/reg',
    element:<Newreg></Newreg>
  },
  {
    path:'/product/:id',
    element:<Product></Product>
  },
  {
    path:'/Contact',
    element:<Con></Con>
  },
  {
    path:'/lend/:id',
    element:<Len></Len>
  },
  {
    path:'/profile/:id',
    element:<Pro></Pro>
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
 </StrictMode>
)

import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'

const App = () => {
  return (
    <div className='flex flex-col'>
      <Navbar/>
      <Admin/>
      
    </div>
  )
}

export default App

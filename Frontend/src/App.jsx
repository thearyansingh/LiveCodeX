import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Room from './Pages/Room'
import Editor from './Pages/Editor'
import { ShopContext } from './Context/Roomcontext'

const App = () => {
  const { joined } = useContext(ShopContext);

  console.log(joined)
  
return(

     <div className="min-h-screen bg-[#2E3440] text-[#D8DEE9]">
      <Routes>
        <Route path="/login" element={<Room />} />
        <Route path="/editor/:roomid" element={<Editor />} />
      </Routes>
    </div>
)



}

export default App;

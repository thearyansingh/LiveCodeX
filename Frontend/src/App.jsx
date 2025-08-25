import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Room from './Pages/Room'
import Editor from './Pages/Editor'

const App = () => {
  return (
 
   <div className="min-h-screen bg-[#2E3440] text-[#D8DEE9]">
 <Routes>
        <Route path="/" element={<Room/>} />
        <Route path="/editor:roomid" element={<Editor/>} />

        
      </Routes>
</div>

  
  )
}

export default App

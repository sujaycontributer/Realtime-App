import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import Admin from "./components/Admin";



export default function App() {
  
  return (
   <div>
      <BrowserRouter>
      <Routes>
        <Route path="/join" element={<Lobby />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      </BrowserRouter>
   </div>
  )
}



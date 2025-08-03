import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import Admin from "./components/Admin";
import ProblemSet from "./components/ProblemSet";



export default function App() {
  
  return (
   <div>
      <BrowserRouter>
      <Routes>
        <Route path="/join" element={<Lobby />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/problemset" element={<ProblemSet />} /> 
      </Routes>
      </BrowserRouter>
   </div>
  )
}



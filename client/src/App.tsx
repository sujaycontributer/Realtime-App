import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import Admin from "./components/Admin";
import ProblemSet from "./components/ProblemSet";
import AdminLobby from "./components/AdminLobby";
import Quiz from "./components/Quiz";



export default function App() {
  
  return (
   <div>
      <BrowserRouter>
      <Routes>
        <Route path="/join" element={<Lobby />} />
        <Route path="/admin" element={<AdminLobby />} />
        <Route path="/problemset" element={<ProblemSet />} /> 
        <Route path="/quiz" element={<Quiz/> } />
      </Routes>
      </BrowserRouter>
   </div>
  )
}



import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import ProblemSet from "./components/ProblemSet";
import AdminLobby from "./components/AdminLobby";
import Quiz from "./components/Quiz";
import Admin from "./components/Admin";
import ClinetLobby from "./components/ClinetLobby";
import CreateProblem from "./components/CreateProblem";
import CreateSet from "./components/CreateSet";
import Leaderboad from "./components/Leaderboad";



export default function App() {
  
  return (
   <div>
      <BrowserRouter>
      <Routes>
        <Route path="/join" element={<Lobby />} />
        <Route path="/join/:roomId" element={<ClinetLobby />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/:roomId" element={<AdminLobby />} />
        <Route path="/sets" element={<ProblemSet />} /> 
        <Route path="/createset" element={<CreateSet/>} />
        <Route path="/set/:setId" element={<CreateProblem />} />
        <Route path="/quiz" element={<Quiz/> } />
        <Route path="/lead" element={<Leaderboad  />}/>
      </Routes>
      </BrowserRouter>
   </div>
  )
}



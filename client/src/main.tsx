import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import QuizDataProvider from './context/QuizDataProvider.tsx'
import SocketProvider from './context/SocketContext.tsx'

createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <QuizDataProvider>
     <App />
  </QuizDataProvider>
  </SocketProvider>
  
   
  
)

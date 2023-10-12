import {Routes, Route, Navigate} from 'react-router-dom';
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NavBar from './components/NavBar';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <ChatContextProvider user = {user}>
      <NavBar />
      <div className='container mx-auto px-4'>
        <Routes>
          <Route path='/' element={user ? <Chat/> : <Login/>} />
          <Route path='/login' element={user ? <Chat/> : <Login/>} />
          <Route path='/register' element={user ? <Chat/> : <Register/>} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </ChatContextProvider>
  )
}

export default App

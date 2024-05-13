import { Routes, Route, Navigate } from 'react-router-dom';
import { Chat, Register, Login } from './components';
import { useAuth } from './context/authContaxt';
import { ChatContextProvider } from './context/chatContext';

const App = () => {

  const { user } = useAuth();

  return (
    <ChatContextProvider user={user}>
      <div className=' bg-gray-900 h-screen w-full'>
        <Routes>
          <Route path='/' element={user ? <Chat/> : <Login/>}/>
          <Route path='/login' element={user ? <Chat/> : <Login/>}/>
          <Route path='/register' element={user ? <Chat/> : <Register/>}/>
          <Route path='*' element={<Navigate to="/" />}/>
        </Routes>
      </div>
    </ChatContextProvider>
  )
}

export default App
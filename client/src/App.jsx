import { Routes, Route, Navigate } from 'react-router-dom';
import { Chat, Register, Login } from './components';
import { useAuth } from './context/authContaxt';

const App = () => {

  const { user } = useAuth();

  return (
    <div className=' bg-gray-900 h-screen w-full'>
      <Routes>
        <Route path='/' element={user ? <Chat/> : <Login/>}/>
        <Route path='/register' element={user ? <Chat/> : <Register/>}/>
        <Route path='/login' element={user ? <Chat/> : <Login/>}/>
        <Route path='*' element={<Navigate to="/" />}/>
      </Routes>
    </div>
  )
}

export default App
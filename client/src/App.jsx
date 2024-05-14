import { Routes, Route, Navigate } from 'react-router-dom';
import { Chat, Register, Login } from './components';
import { getCookie } from './utils/cookie';
import { loginUserAsync } from './utils/asyncThunkMethods';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const email = getCookie('email');
      if (email) {
        // Agar username cookie-da mavjud bo'lsa, foydalanuvchini avtomatik ravishda kirita olasiz
        dispatch(loginUserAsync({ email }));
      }
    };

    checkUserLoggedIn();
  }, [dispatch]);

  return (
      <div className=' bg-gray-900 h-screen w-full'>
        <Routes>
          <Route path='/' element={user ? <Chat/> : <Login/>}/>
          <Route path='/login' element={user ? <Chat/> : <Login/>}/>
          <Route path='/register' element={user ? <Chat/> : <Register/>}/>
          <Route path='*' element={<Navigate to="/" />}/>
        </Routes>
      </div>
  )
}

export default App
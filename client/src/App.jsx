import { Routes, Route, useNavigate } from 'react-router-dom';
import { Chat, Register, Login } from './components';
import { useEffect } from 'react';
import { getCookie } from './api/api';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      navigate('/login'); // Token yo'q bo'lsa login sahifasiga yo'naltiramiz
    }
  }, [navigate]);

  return (
    <div className=' bg-gray-900 h-screen w-full'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/home" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;

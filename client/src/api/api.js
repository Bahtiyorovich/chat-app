import axios from 'axios';

// Interceptor funksiyasi
export const interceptor = axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await axios.post('/refresh-token');
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
          originalRequest.headers['Authorization'] = 'Bearer ' + res.data.token;
          return axios(originalRequest);
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    }
  );

// Cookie ma'lumotini olish
export const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName.trim() === name) {
      return cookieValue;
    }
  }
  return null;
};


// Cookie ga ma'lumot qo'shish
export const setCookie = (name, value, expirationDays) => {
  const date = new Date();
  date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

// Cookie ichidagi ma'lumotni o'chirib tashlash
export const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

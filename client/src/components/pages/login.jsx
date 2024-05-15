import { useState, useEffect, useCallback } from "react";
import { Card, Input, Checkbox, Button, Typography, CardBody, Alert, Spinner } from "@material-tailwind/react";
import { SignIn } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from "../../utils/authSlices/authSlice"; // LoginSlice'dan loginUser va clearState o'zgaruvchilarini chaqirish
import { loginUser } from "../../utils/asyncThunkFunctions/asyncThunkFunctions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.user // loginSlice dan kerakli ma'lumotlarni olish
  );

  const [formData, setFormData] = useState({ // form ma'lumotlarini saqlash uchun state
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)); // loginUser funktsiyasini ishga tushirish
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate('/home'); // Tizimga kirish muvaffaqiyatli bo'lganida /home sahifasiga yo'naltirish
    }
  }, [isError, isSuccess, dispatch, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPass = useCallback(() => {
    setShowPassword((prevShow) => !prevShow);
  }, []);

  return (
    <Card className="flex flex-row items-center justify-start  rounded-none h-full">
      <CardBody>
        <img src={SignIn} alt="register page"/>
      </CardBody>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to login.
        </Typography>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          { errorMessage && <ErrMessage/>}
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              type="email"
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type={showPassword ? "text" : "password"}
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Checkbox
            onChange={handleShowPass}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                {showPassword ? "Hide password" : "Show password"}
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6 flex items-center justify-center" fullWidth>
            {isFetching ? <Spinner className="h-4 w-4" /> : "Sign In"}
          </Button>
        </form>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <Link to="/register">Sign Up</Link>
        </Typography>
      </CardBody>
    </Card>
  );
};

export default Login;

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
 
function ErrMessage() {

  const { errorMessage } = useSelector(
    (state) => state.login // loginSlice dan kerakli ma'lumotlarni olish
  );

  return (
    <Alert
      icon={<Icon />}
      className="rounded-none border-l-4 border-red-500 bg-red-50 font-medium text-red-500"
    >
      {errorMessage.message}
    </Alert>
  );
} 
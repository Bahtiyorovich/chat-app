import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardBody,
  Alert
} from "@material-tailwind/react";
import { SignIn } from "../../assets";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
 
const Login = () => {

  const [show, setShow] = useState(false);
  const handleShowPass = useCallback(() => {
    setShow(prev => !prev)
  }, [show]);

  return (
    <Card className="flex flex-row items-center justify-start  rounded-none h-full">
      <CardBody>
        <img src={SignIn} alt="register page"/>
      </CardBody>
      <CardBody  >
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to login.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <ErrMessage/> 
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type={show ? "password" : "text"}
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
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
              {show ? "Show password" : "hidden password"}
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth>
          sign in
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
        <Link to={'/register'}>
          SignUp
        </Link>
        </Typography>
      </form>
      </CardBody>
    </Card>
  );
}

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
  return (
    <Alert
      icon={<Icon />}
      className="rounded-none border-l-4 border-red-500 bg-red-50 font-medium text-red-500"
    >
      Sorry, something went wrong please try again.
    </Alert>
  );
}
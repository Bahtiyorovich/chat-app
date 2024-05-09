import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardBody,
  Alert,
  Spinner
} from "@material-tailwind/react";
import { SignUp } from "../../assets";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContaxt";
 
const Register = () => {

  const { registerInfo, handleRegister, isLoading, registerError, registerUser } = useAuth();

  const [show, setShow] = useState(false);
  const handleShowPass = useCallback(() => {
    setShow(prev => !prev)
  }, [show]);

  return (
    <Card className="flex flex-row rounded-none h-full">
      <CardBody>
        <img src={SignUp} alt="register page" />
      </CardBody>
      <CardBody  >
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form onSubmit={registerUser} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          {registerError?.error && <ErrMessage/> }
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            display Name
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) => handleRegister({...registerInfo, displayName: e.target.value})}
          />
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
            onChange={(e) => handleRegister({...registerInfo, email: e.target.value})}
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
            onChange={(e) => handleRegister({...registerInfo, password: e.target.value})}
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
        <Button type="submit" className="mt-6 flex items-center justify-center" fullWidth >
          {isLoading ? <Spinner className="h-4 w-4"/> : "Sign Up"}
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
        <Link to={'/login'}>
          SignIn
        </Link>
        </Typography>
      </form>
      </CardBody>
    </Card>
  );
}

export default Register;

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
  const { registerError } = useAuth();
  return (

    <Alert
      icon={<Icon />}
      className="rounded-none border-l-4 border-red-500 bg-red-50 font-medium text-red-500"
    >
      { registerError?.message}
    </Alert>
  );
}
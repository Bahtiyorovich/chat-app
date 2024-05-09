import {
  Card,
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
  Badge,
} from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";
import { Logo } from "../../assets";
import { Link } from "react-router-dom";
 
const NavbarDark = () => {
  return (
      <Navbar
        variant="gradient"
        color="blue-gray"
        className="col-span-8 row-span-1 mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-4 text-white">
          <Link to={'/'}>
            <img src={Logo} alt=""/>
          </Link>
          <div className="ml-auto flex gap-1 md:mr-4">
            <Badge content="5">
              <IconButton variant="text" color="white" className="bg-gray-700">
                <BellIcon className="h-4 w-4" />
              </IconButton>
            </Badge>
          </div>
         
          <div className=" flex w-full gap-2 md:w-max">
            <Link to="/login">
              <Button 
                size="sm"
                color="white"
                className="rounded">
                  SignIn
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                size="sm"
                color="white"
                className="rounded">
                  SignUp
              </Button>
            </Link>
          </div>
        </div>
      </Navbar>
  );
}

export default NavbarDark;
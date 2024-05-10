import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Badge,
} from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";
import { Logo } from "../../assets";
import { Link } from "react-router-dom";
import { useAuth } from './../../context/authContaxt';
 
const NavbarDark = () => {

  const { user, logout } = useAuth();

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
          {
            user 
           ? <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full flex items-center justify-center font-semibold text-2xl bg-gray-700">{user?.displayName.at(0)}</div>
          <div>
            <Typography variant="h6">{user?.displayName}</Typography>
            <Typography variant="small" color="cyan" className="font-normal">
              {user?.email}
            </Typography>
          </div>
          <Link onClick={() => logout()} to="/login">
            <Button 
                size="sm"
                color="white"
                className="rounded"
                >
                  Logout
            </Button>
          </Link>
            </div>
           : <div className=" flex w-full gap-2 md:w-max">
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
          }
        </div>
      </Navbar>
  );
}

export default NavbarDark;
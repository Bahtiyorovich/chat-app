import React, { useEffect } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Badge,
  Button,
} from "@material-tailwind/react";
import { FiMessageSquare } from "react-icons/fi";
import { Logo } from "../../assets";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData, logoutUser } from "../../utils/asyncThunkFunctions/asyncThunkFunctions";

const NavbarDark = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.user);
  
  useEffect(() => {
    if (token) {
        dispatch(fetchUserData(token));
    }
}, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser()); // Logout işlemi için redux action dispatch edilir
  };

  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="col-span-8 row-span-1 mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3"
    >
      <div className="flex items-center justify-between gap-4 text-white">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="flex items-center gap-1 md:mr-4">
          <Badge content="5">
            <IconButton variant="text" color="white" className="bg-gray-700">
              <FiMessageSquare className="h-4 w-4" />
            </IconButton>
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full flex items-center justify-center font-semibold text-2xl bg-gray-700">
            {user && user.name.charAt(0)}
          </div>
          <div>
            <Typography variant="h6">{user && user.name}</Typography>
            <Typography variant="small" color="cyan" className="font-normal">
              {user && user.email}
            </Typography>
          </div>
          <Button
            size="sm"
            color="white"
            className="rounded"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
      
    </Navbar>
    
  );
};

export default NavbarDark;

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../userContext";
import { enqueueSnackbar } from "notistack";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import Hamburger from 'hamburger-react';
import 'animate.css'; // Import the animate.css library

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  console.log('API URL:', apiUrl);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${apiUrl}logout`, {}, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserInfo(null);
        localStorage.removeItem('token');
        navigate("/login");
        enqueueSnackbar("Logout Successful", { variant: "success" });
      } else {
        enqueueSnackbar("Failed to logout", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Network error", { variant: "error" });
      console.error("Network error:", error.message);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`https://apartment-backend-1.onrender.com/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          const userData = response.data;
          setUserInfo(userData);
        } else {
          console.error("Failed to fetch user profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserInfo();
  }, [apiUrl, setUserInfo]);

  const username = userInfo?.firstName;
  const role = userInfo?.role;

  return (
    <>
      <nav className="bg-slate-900">
        <ul>
          <div className="flex items-center justify-between p-2 text-white">
            <li>
              <div className="flex items-center justify-center gap-1">
                <PiBuildingApartmentDuotone className="w-10 h-16 hover:text-yellow-300 cursor-pointer" />
                <Link to="/" className="md:text-xl block font-bold uppercase hover:text-yellow-300">
                  LuxeLivingLofts
                </Link>
              </div>
            </li>

            <div className="flex gap-3">
              <li className="hidden md:block">
                <Link to="/" className="text-xl font-bold uppercase hover:text-yellow-300">
                  Home
                </Link>
              </li>
              <li className="hidden md:block">
                <Link to="/feature" className="text-xl font-bold uppercase hover:text-yellow-300 ">
                  Feature
                </Link>
              </li>
              {role === "Seller" && (
                <>
                  <li className="hidden md:block">
                    <Link to="/post" className="text-xl font-bold uppercase hover:text-yellow-300">
                      Post
                    </Link>
                  </li>
                </>
              )}
              {username && (
                <>
                
                  <li className="hidden md:block">
                    <Link to="/show" className="text-xl font-bold uppercase hover:text-yellow-300">
                      Show Post
                    </Link>
                  </li>
                  <li className="hidden md:block">
                    <button
                      onClick={handleLogout}
                      className="text-xl font-bold uppercase hover:text-yellow-300"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!username && (
                <>
                  <li className="hidden md:block">
                    <Link to="/login" className="text-xl font-bold uppercase hover:text-yellow-300">
                      Login
                    </Link>
                  </li>
                  <li className="hidden md:block">
                    <Link to="/register" className="text-xl font-bold uppercase hover:text-yellow-300">
                      Register
                    </Link>
                  </li>
                </>
              )}
              <div className="md:hidden block">
                <Hamburger toggled={isOpen} toggle={setOpen} />
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="absolute top-20 left-0 w-full bg-slate-800 z-50 flex flex-col gap-3 p-2 items-center justify-center transition-all ease-in-out animate__animated animate__fadeInDown">
              <div>
                <Link to="/" className="text-xl font-bold uppercase hover:text-yellow-300" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </div>
              <div>
                <Link to="/feature" className="text-xl font-bold uppercase hover:text-yellow-300" onClick={() => setOpen(false)}>
                  Feature
                </Link>
              </div>
              {role === "Seller" && (
                <Link to="/post" className="text-xl font-bold uppercase hover:text-yellow-300" onClick={() => setOpen(false)}>
                  Post
                </Link>
              )}
              {username && (
                <>
                  <Link to="/show" className="text-xl font-bold uppercase hover:text-yellow-300" onClick={() => setOpen(false)}>
                    Show Post
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="text-xl font-bold uppercase hover:text-yellow-300"
                  >
                    Logout
                  </button>
                </>
              )}
              {!username && (
                <>
                  <Link to="/login" className="text-xl font-bold uppercase hover:text-yellow-300" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="text-xl font-bold uppercase hover:text-yellow-300" onClick={() => setOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;

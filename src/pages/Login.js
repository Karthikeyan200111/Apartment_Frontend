import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import "animate.css";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (response.ok) {
            setLoading(false)
            enqueueSnackbar(
                "Login Successful...",
                { variant: "success" },
                { autoHideDuration: 1000 }
            );

            //console.log(responseData);
            navigate("/");
        } else {
            setLoading(false)
            enqueueSnackbar(
                "Error Occurred...",
                { variant: "error" },
                { autoHideDuration: 1000 }
            );
        }
    };
    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        );
      }
    return (
        <div className="flex md:flex-row flex-col items-center justify-center p-10 md:h-[41rem]  ">
            <div className="flex items-center flex-col gap-10 md:h-full md:w-[25rem] w-72  reg border-solid border-4 rounded-lg  bg-yellow-300 border-black  animate__animated animate__fadeInUp transition-all ">
                <div className="flex items-center justify-center md:mt-3">
                    <PiBuildingApartmentDuotone className="md:w-28 w-20 h-16 md:h-24" />
                    <p className="font-bold md:text-xl uppercase">LuxeLivingLofts</p>
                </div>

                <div className="">
                    <h1 className="text-xl uppercase font-bold text-center">
                        {" "}
                        Login Page
                    </h1>
                </div>
                <div className="flex flex-col p-3   ">
                    <form onSubmit={handleSubmit}>
                        <div className="p-2 flex items-center justify-center">
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                className=" border-2 border-slate-600 rounded-md md:p-2 px-2 py-1 md:w-72 w-64"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="p-2 flex items-center justify-center">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className=" border-2 border-slate-600 rounded-md md:p-2 md:w-72 w-64 px-2 py-1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex gap-4 my-3">
                            <button
                                type="submit"
                                className=" w-full px-2 py-1  md:px-4 md:py-2 uppercase bg-black text-white border-2 border-slate-600 rounded-md hover:bg-white hover:text-black hover:font-bold"
                            >
                                Login
                            </button>

                        </div>
                        <button className=" w-full md:px-4 px-2 md:py-2 py-1 uppercase bg-black text-white border-2 border-slate-600 rounded-md hover:bg-white hover:text-black hover:font-bold">
                            <Link to="/send-otp">Login Using Otp</Link>
                        </button>
                        <div className="md:mt-7 mt-2 p-2">
                            <span>
                                Don't have an account?
                                <Link to='/register' >
                                    <p><span className=" text-blue-500">  Register Here...</span></p>
                                </Link>
                                </span>

                        </div>


                    </form>
                </div>
            </div>
            <div className=" hidden w-[25rem] h-full bg-black rounded-lg md:flex items-center justify-center border-white border-2 text-white animate__animated animate__flipInX transition-all">
                <div className=" flex  flex-col  gap-2 text-center">
                    <p className="font-bold text-xl">Welcome to Your New Home</p>
                    <p className="font-semibold">Explore Our Exclusive Apartment Listings Today</p>
                    <div className="font-semibold">
                        <h1>We are more than just a company</h1>
                        <p>Discover your dream apartment: luxury, comfort, and convenience await.</p>
                        <p>Find your perfect space today and start living your best life!</p>

                    </div>


                </div>

            </div>
        </div>
    );
};

export default Login;

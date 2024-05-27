import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { enqueueSnackbar } from "notistack";
import "animate.css";
import { TailSpin } from 'react-loader-spinner';


const SendOtp = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState();

    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        setLoading(true)
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}send-otp`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (response.ok) {
            
            const responseData = await response.json();
            setLoading(false)
            enqueueSnackbar(
                "OTP SEND  Successful...",
                { variant: "success" },
                { autoHideDuration: 2000 }
            );
            setMessage(responseData.msg);
        
            navigate(`/verify-otp/${email}`)

        } else {
            setLoading(false)
            enqueueSnackbar(
                "Enter a valid  Email Id...",
                { variant: "error" },
                { autoHideDuration: 2000 }
            );
            setMessage('Error In Sending OTP');
        }
    };
    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#FFFF00"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        );
      }

    return (
        <div className='flex items-center flex-col justify-center mt-4 p-5'>
            <div className="flex items-center flex-col gap-10 md:h-full w-72  md:w-[25rem] reg border-solid border-4 rounded-lg  bg-yellow-300 border-black  animate__animated animate__fadeInUp transition-all ">
                <div className="flex items-center justify-center mt-3">
                    <PiBuildingApartmentDuotone className="md:w-28 md:h-24 w-14 h-20" />
                    <p className="font-bold md:text-xl uppercase">LuxeLivingLofts</p>
                </div>

                <div className="">
                    <h1 className="text-xl uppercase font-bold text-center">
                        {" "}
                       Enter Email Id
                    </h1>
                </div>
                <div className="flex flex-col p-3  ">
                    <form onSubmit={handleSendOtp}>
                        <div className="p-2">
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                className=" border-2 border-slate-600 rounded-md p-2 md:w-72"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="w-full flex flex-col gap-4 my-3">
                            <button
                                type="submit"
                                className=" w-full px-4 py-2 uppercase bg-black text-white border-2 border-slate-600 rounded-md"
                            >
                                Send OTP
                            </button>
                            {message && <p className='font-bold '>{message}</p>}

                        </div>



                    </form>
                </div>
            </div>


        </div>
    );
};

export default SendOtp;

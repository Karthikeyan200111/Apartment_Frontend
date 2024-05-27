import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from "notistack";
import { TailSpin } from 'react-loader-spinner';

const VerifyOtp = () => {
    
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {email}=useParams()
    const [loading, setLoading] = useState(false);
    console.log(email)

    const handleVerifyOtp = async (e) => {
        setLoading(true)
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}verify-otp`, {
            method: 'POST',
            body: JSON.stringify({email, otp }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (response.ok) {
            const responseData = await response.json();
            setLoading(false)
            setMessage(responseData.msg);
            if (response.status === 200) {
                enqueueSnackbar(
                    "Login Successful...",
                    { variant: "success" },
                    { autoHideDuration: 1000 }
                );
                navigate('/');
            }
        } else {
            setMessage('Invalid OTP');
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
        <div className='flex items-center justify-center h-full  p-5 mt-7 mx-auto '>
        <div className='className="flex items-center flex-col gap-10 h-full w-[25rem] reg border-solid border-4 rounded-lg  bg-yellow-300 border-black  animate__animated animate__fadeInUp transition-all'>
            <div className='p-4'>
                <h1 className='text-xl uppercase font-bold text-center'>Verify OTP</h1>
            </div>
            <div className='flex flex-col p-5'>
                <form onSubmit={handleVerifyOtp}>
                    
                    <div className='p-2'>
                        
                        <input
                            type='number'
                            required
                            placeholder='OTP'
                            className=" border-2 border-slate-600 rounded-md p-2 w-full my-3"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-4'>
                        <button type='submit' className=" w-full px-4 py-2 uppercase bg-black text-white border-2 border-slate-600 rounded-md">Verify OTP</button>
                        {message && <p className='font-bold'>{message}</p>}
                    </div>
                </form>
                
            </div>
        </div>
        </div>
    );
};

export default VerifyOtp;

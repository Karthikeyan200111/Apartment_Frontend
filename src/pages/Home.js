// Home.js
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { FaArrowRight } from "react-icons/fa";
import 'animate.css';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';




const Home = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:3001/profile', {
                    credentials: 'include',
                    method: 'GET'
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                    
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch user info on mount or when userInfo is not already set
        if (!userInfo || Object.keys(userInfo).length === 0) {
            fetchUserInfo();
        } else {
            setLoading(false);
        }
    }, [userInfo, setUserInfo]);

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
        <>
        <div>
            <div className='text-white p-3'>
                {userInfo?.firstName && (
                    <div>
                        <h1 className='font-semibold text-xl'>Welcome, {userInfo.firstName}!</h1>
                        {/* Add more user details as needed */}
                    </div>
                )}
            </div>
            <div>
                <div className='z-0 flex flex-col items-center justify-center text-white gap-6 h-96 animate__animated animate__fadeIn'>
                    <h1 className='font-bold md:text-6xl uppercase text-center '>WelCome To LuxeLivingLofts</h1>
                    <p className='font-semibold md:text-lg uppercase text-center '>Discover Your Dream Home in the Heart of the City!</p>
                </div>
                <div className='flex items-center justify-center h-full animate__animated animate__fadeIn'>
                    <Link to='/feature'>
                    <button className='text-center uppercase font-bold md:text-xl bg-yellow-400  items-center justify-center gap-2 flex px-2 py-1 md:px-4 md:py-2 rounded-md text-black transition-all hover:bg-orange-600 '>Get Started <FaArrowRight className='h-7' /></button>
                    </Link>
                </div>
            </div>
        </div>
        
        </>
    );
};

export default Home;

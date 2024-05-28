import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import 'animate.css'; // Import the animate.css library
import { UserContext } from "../userContext";
import { enqueueSnackbar } from "notistack";
import {  TailSpin } from 'react-loader-spinner'


const SinglePost = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userInfo } = useContext(UserContext);
  const [role, setRole] = useState();


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}get/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setData(responseData.currentPost);
        setLoading(false);
      } catch (error) {

        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    setRole(userInfo.role);
  }, [userInfo]);

  const handleSubmit = async (postId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}senddetails/${postId}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });

      if (response.ok) {
        console.log("Email sent successfully...");
        setLoading(false);
        enqueueSnackbar(
          "Email sent Successful...",
          { variant: "success" },
          { autoHideDuration: 1000 }
        );
      } else {
        console.error('Failed to send email');
        enqueueSnackbar(
          "Error Occurred...",
          { variant: "error" },
          { autoHideDuration: 1000 }
        );
      }
    } catch (err) {
      console.error('Network error:', err.message);
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


  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;


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
    <div className="p-7 flex flex-col gap-4">
      <div className="slide">
        <h1 className="text-3xl font-bold uppercase text-center text-white">
          Post Details
        </h1>
      </div>
      <div className="flex flex-col md:flex-row w-full mt-8 animate__animated animate__fadeIn">
        <div className="md:w-1/2 w-full mb-4 md:mb-0">
          <img
            src={`${process.env.REACT_APP_API_URL}uploads/${data.place}`}
            alt="place"
            className="w-full h-full mb-2 rounded-lg"
          />
        </div>
        <div className="flex text-white flex-col p-4 justify-center gap-3 uppercase md:w-1/2 w-full animate__animated animate__fadeInRight">
          <h1 className="md:text-2xl font-semibold">{data.area}</h1>
          <p className="md:text-xl">Bedrooms: {data.noOfBedrooms}</p>
          <p className="md:text-xl">Bathrooms: {data.noOfBathrooms}</p>
          <p className="md:text-xl">Rent: {data.rent}</p>
          <p className="flex items-center md:text-xl">
            <span className="uppercase font-semibold">Ratings: </span>
            <span className="ml-2 flex">{renderStars(data.ratings)}</span>
          </p>
          {role && role === 'Buyer' && (
            <div className='flex flex-col justify-between items-start space-y-3'>
              <button className='px-4 py-2 uppercase bg-black text-white border-2 border-slate-600 rounded-md hover:bg-white hover:text-black hover:font-bold' onClick={() => handleSubmit(data._id)}>I am interested</button>
              <p className="md:text-sm text-xs">Note:  If You click this button your details will send it to the seller and you will get the seller details</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 border-white border-solid border-2 rounded-xl flex flex-col items-start justify-center  gap-3 md:gap-y-4 animate__animated animate__fadeInUp text-white  ">

        <p className="md:text-xl flex    flex-col">
          <span className="uppercase font-semibold text-yellow-300">Hospital Nearby: </span>
          <span className="md:ml-20"> {data.hospital ? "Yes, there is a hospital nearby." : "No, there isn't a hospital nearby."}</span>
        </p>
        <p className="md:text-xl flex    flex-col">
          <span className="uppercase font-semibold text-yellow-300">College Nearby: </span>
          <span className="md:ml-20">{data.collegeNearBy ? "Yes, there is a college nearby." : "No, there isn't a college nearby."}</span>
        </p>
        <p className="md:text-xl flex    flex-col">
          <span className="uppercase font-semibold text-yellow-300">Furnished: </span>
          <span className="md:ml-20">{data.furnished ? "This property is fully furnished." : "This property is not furnished."}</span>
        </p>
        <p className="md:text-xl flex    flex-col">
          <span className="uppercase font-semibold text-yellow-300">Parking: </span>
          <span className="md:ml-20">{data.parking ? "Parking is available." : "No parking available."}</span>
        </p>
        <p className="md:text-xl flex    flex-col">
          <span className="uppercase font-semibold text-yellow-300">Pet Friendly: </span>
          <span className="md:ml-20">{data.pet ? "Pets are allowed in this property." : "Pets are not allowed in this property."}</span>
        </p>
        <p className="md:text-xl flex    flex-col">
          <span className="uppercase font-semibold text-yellow-300">Description: </span>
          <span className="md:ml-20">{data.description}</span>
        </p>
      </div>
    </div>
  );
};

export default SinglePost;

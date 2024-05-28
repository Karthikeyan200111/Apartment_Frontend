import React from "react";
import feature from "../Images/feature.webp";
import "animate.css";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiModernCity } from "react-icons/gi";
import { BsFillHouseUpFill } from "react-icons/bs";
import { MdSafetyCheck } from "react-icons/md";

const Feature = () => {
 
    return (
        <>
            <div className="flex  items-center justify-center gap-10  p-10">
                <div className="text-white max-w-xl w-full flex flex-col items-center justify-center">
                    <div className="mb-6 flex flex-col">
                        <h1 className="md:text-4xl text-lg font-bold mb-4">Why Choose Us</h1>
                        <p className="md:text-lg ">
                            Discover the perfect blend of comfort, convenience, and community
                            in our modern urban apartments.
                        </p>
                    </div>
                    <div className="flex items-center flex-col justify-center gap-7 animate__animated animate__fadeInDown">
                        <div className="space-y-4 flex md:flex-row flex-col gap-16 items-center justify-between">
                            <div className="flex flex-col items-center gap-2 md:w-52 hover:text-yellow-300  hover:duration-100 hover:-translate-y-10 hover:ease-in-out transition-all">
                                <FaMapLocationDot className="w-36 h-28" />
                                <h2 className="md:text-lg uppercase font-semibold">
                                    Prime Location
                                </h2>
                            </div>
                            <div className="flex flex-col items-center gap-2 w-52 hover:text-yellow-300 hover:animate__animated hover:animate__zoomIn transition-all hover:duration-100 hover:-translate-y-10 hover:ease-in-out">
                                <GiModernCity className="w-36 h-28" />
                                <h2 className="md:text-lg uppercase font-semibold">
                                    Modern Amenities
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center md:flex-row flex-col justify-between gap-16">
                            <div className="flex flex-col items-center gap-2 w-52 hover:text-yellow-300 hover:animate__animated hover:animate__zoomIn transition-all hover:duration-100 hover:-translate-y-10 hover:ease-in-out">
                                <BsFillHouseUpFill className="w-36 h-28" />
                                <h2 className="md:text-lg uppercase font-semibold text-center">
                                    Spacious and Stylish Interiors
                                </h2>
                            </div>
                            <div className="flex flex-col items-center gap-2 w-52 hover:text-yellow-300 hover:animate__animated hover:animate__zoomIn transition-all hover:duration-100 hover:-translate-y-10 hover:ease-in-out">
                                <MdSafetyCheck className="w-36 h-28" />
                                <h2 className="md:text-lg uppercase font-semibold text-center">
                                    Community and Security
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-6 items-center hidden  md:flex justify-center animate__animated animate__slideInRight ">
                    <img src={feature} alt="feature" className="rounded shadow-lg transition-all hover:duration-100  " />
                </div>
            </div>
        </>
    );
};

export default Feature;

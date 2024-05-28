import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Make sure to import the CSS file
import "animate.css";
import StarRating from './StarRating'; // Import the StarRating component
import { useSnackbar } from "notistack"; // Import useSnackbar from notistack
import { TailSpin } from 'react-loader-spinner';

const ShowPost = () => {
    const [data, setData] = useState([]);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${token}`,

                }
            });

            if (response.ok) {
                setLoading(false)
                enqueueSnackbar("Deleted Successfully", { variant: "info", autoHideDuration: 1000 });
                setData(data.filter(post => post._id !== id));
                navigate('/show');
            } else {
                setLoading(false)
                enqueueSnackbar("Error Occurred", { variant: "error", autoHideDuration: 1000 });
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_API_URL}getpost`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

                if (response.ok) {
                    setLoading(false)
                    const responseData = await response.json();
                    setData(responseData.post);
                    setRole(responseData.role);
                } else {
                    setLoading(false)
                    console.error('Failed to fetch posts');
                }
            } catch (error) {
                console.error('Network error:', error);
            }

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_API_URL}profile`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setEmail(responseData.email);
                } else {
                    console.error('Failed to fetch profile');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        fetchDetails();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data.filter(post =>
        post.area.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
        <div className="p-5">
            <div className='my-4'>
                <h1 className="text-3xl uppercase font-bold text-center text-white">All Posts</h1>
            </div>

            <div className="my-4">
                <input
                    type="text"
                    placeholder="Search by area"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full p-2 border-2 rounded-lg border-black"
                />
            </div>

            <div className="flex flex-col md:gap-y-12 gap-5 md:items-start items-center justify-between w-full p-8">
                {filteredData.length > 0 ? (
                    filteredData.map((post) => (
                        
                            <div className='flex md:flex-row flex-col items-center md:w-[80rem] md:gap-0 gap-2 w-72 p-4 md:h-96 justify-center hover:border-2 hover:border-white hover:border-solid rounded-xl '>
                                
                                <div
                                    key={post._id}
                                    className="transition-all  md:w-1/2 md:h-80 h-44 hover:duration-100 hover:-translate-y-10 hover:ease-in-out flex flex-col animate__animated animate__fadeInUp border-solid rounded-lg md:p-5 "
                                ><Link key={post._id} to={`/post/${post._id}`}>
                                    {post.place && (
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}uploads/${post.place}`}
                                            alt="place"
                                            className="md:w-full md:h-80 w-96 h-56 mb-2 rounded-lg"
                                        />
                                    )}
                                    </Link>
                                </div>
                                
                                <div className='md:w-1/2 md:p-0 p-3 text-white flex flex-col items-start justify-center gap-3'>
                                    <Link key={post._id} to={`/post/${post._id}`}>
                                    <h1 className="text-lg font-bold uppercase text-white">{post.area}</h1>
                                    <StarRating rating={post.ratings} />
                                    <p><span className='font-semibold uppercase mr-2'>Rent:</span>{post.rent}</p>
                                    <p className='text-justify'><span className='font-semibold uppercase mr-2 '>DESCRIPTION:</span>{post.description}</p>
                                    </Link>
                                    {role && role.toLowerCase() === 'seller' && email === post.email && (
                                        <div className='flex  gap-7 items-center'>
                                            <Link to={`/edit/${post._id}`} className='w-24 text-center px-4 py-2 uppercase bg-black text-white border-2 border-slate-600 rounded-md'>Edit</Link>
                                            <button onClick={() => handleDelete(post._id)} className='w-24 text-cente px-4 py-2 uppercase bg-black text-white border-2 border-slate-600 rounded-md'>Delete</button>
                                        </div>
                                    )}
                                </div>
                            </div>

            ))
            ) : (
            <p>No posts available</p>
                )}
        </div>
        </div >
    );
};

export default ShowPost;

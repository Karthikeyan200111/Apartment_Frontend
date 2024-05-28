import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from "notistack";

const Edit = () => {
    const [area, setArea] = useState('');
    const [hospital, setHospital] = useState('');
    const [collegeNearBy, setCollegeNearBy] = useState('');
    const [noOfBedrooms, setNoOfBedrooms] = useState('');
    const [noOfBathrooms, setNoOfBathrooms] = useState('');
    const [place, setPlace] = useState(null);
    const [placePreview, setPlacePreview] = useState(null);
    const [rent, setRent] = useState('');
    const [furnished, setFurnished] = useState('');
    const [parking, setParking] = useState('');
    const [pet, setPet] = useState('');
    const [description, setDescription] = useState('');
    const [ratings, setRatings] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_API_URL}get/${id}`, {
                    method: 'GET',  
                    credentials: 'include',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                      }
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const currentPost = responseData.currentPost;
                   
                    setArea(currentPost.area);
                    setHospital(currentPost.hospital);
                    setCollegeNearBy(currentPost.collegeNearBy);
                    setNoOfBedrooms(currentPost.noOfBedrooms);
                    setNoOfBathrooms(currentPost.noOfBathrooms);
                    setRent(currentPost.rent);
                    setFurnished(currentPost.furnished);
                    setParking(currentPost.parking);
                    setPet(currentPost.pet);
                    setDescription(currentPost.description);
                    setRatings(currentPost.ratings);
                    setPlacePreview(`${process.env.REACT_APP_API_URL}uploads/${currentPost.place}`);
                } else {
                    console.error('Error fetching data');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        fetchDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('area', area);
        formData.append('hospital', hospital);
        formData.append('collegeNearBy', collegeNearBy);
        formData.append('noOfBedrooms', noOfBedrooms);
        formData.append('noOfBathrooms', noOfBathrooms);
        formData.append('rent', rent);
        formData.append('furnished', furnished);
        formData.append('parking', parking);
        formData.append('pet', pet);
        formData.append('description', description);
        formData.append('ratings', ratings);
        if (place) {
            formData.append('place', place);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}edit/${id}`, {
                method: 'PUT',
                body: formData,
                credentials: 'include',
                 headers: {
            "Authorization": `Bearer ${token}`,
           
          }
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                enqueueSnackbar(
                    "Edited Sucessfull...",
                    { variant: "success" },
                    { autoHideDuration: 1000 }
                );
                navigate('/show');
            } else {
                console.error('Error submitting form');
                enqueueSnackbar(
                    "Error Occurred...",
                    { variant: "error" },
                    { autoHideDuration: 1000 }
                );

            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handlePlaceChange = (e) => {
        const file = e.target.files[0];
        setPlace(file);
        setPlacePreview(URL.createObjectURL(file));
    };

    return (
        <div className='p-3 flex flex-col items-center justify-center w-full '>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col w-[18rem] sm:w-[20rem]  md:w-full border-solid border-4 rounded-lg bg-yellow-300 border-black p-4 gap-y-3 justify-center'>
                    <h1 className='text-2xl uppercase font-bold text-center'>Edit Post</h1>
                  
                    <input
                        type="text"
                        value={area}
                        placeholder='Area'
                        onChange={(e) => setArea(e.target.value)}
                        required
                        className="border-2 border-slate-600 rounded-md p-2 w-full"
                    />

                    <label className='font-bold uppercase text-lg'>Hospital</label>
                    <div className='flex gap-3 w-full'>
                        <input
                            type='radio'
                            id='hospitalYes'
                            value='Yes'
                            checked={hospital === 'Yes'}
                            onChange={() => setHospital('Yes')}
                            className="border-2 border-slate-600 rounded-md p-2 w-4 font-bold"
                        />
                        <label className='font-bold mr-2' htmlFor='hospitalYes'>YES</label>

                        <input
                            type='radio'
                            id='hospitalNo'
                            value='No'
                            checked={hospital === 'No'}
                            onChange={() => setHospital('No')}
                            className="border-2 border-slate-600 w-4 rounded-md p-2"
                        />
                        <label className='font-bold' htmlFor='hospitalNo'>NO</label>
                    </div>

                    <input
                        type="number"
                        placeholder='No of Bedrooms'
                        value={noOfBedrooms}
                        onChange={(e) => setNoOfBedrooms(e.target.value)}
                        required
                        className="border-2 border-slate-600 rounded-md p-2 w-full"
                    />

                    <input
                        type='number'
                        placeholder='No of Bathrooms'
                        value={noOfBathrooms}
                        onChange={(e) => setNoOfBathrooms(e.target.value)}
                        required
                        className="border-2 border-slate-600 rounded-md p-2 w-full"
                    />

                    <label className='font-bold text-lg uppercase'>College Nearby</label>
                    <div className='p-1 flex  items-center w-full gap-1'>
                        <input
                            type="radio"
                            id="collegeYes"
                            value="Yes"
                            checked={collegeNearBy === 'Yes'}
                            onChange={(e) => setCollegeNearBy(e.target.value)}
                            required
                            className="border-2 border-slate-600 w-5 h-8 rounded-md p-2"
                        />
                        <label htmlFor="collegeYes" className='font-bold uppercase mr-2'>Yes</label>

                        <input
                            type="radio"
                            id="collegeNo"
                            value="No"
                            checked={collegeNearBy === 'No'}
                            onChange={(e) => setCollegeNearBy(e.target.value)}
                            required
                            className="border-2 border-slate-600 rounded-md  w-5 h-8 p-2"
                        />
                        <label htmlFor="collegeNo" className='font-bold uppercase'>No</label>
                    </div>
                    
                    <input
                        type="number"
                        placeholder='Rent'
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                        required
                        className="border-2 border-slate-600 rounded-md p-2"
                    />

                    <label className='font-bold uppercase text-lg'>Furnished</label>
                    <div className='p-1 flex  items-center w-full gap-1'>
                        <input
                            type="radio"
                            id="furnishedYes"
                            value="Yes"
                            checked={furnished === 'Yes'}
                            onChange={() => setFurnished('Yes')}
                            required
                            className="border-2 border-slate-600 rounded-md p-2  w-5 h-8"
                        />
                        <label htmlFor="furnishedYes" className='mr-3 font-bold uppercase'>Yes</label>
                        <input
                            type="radio"
                            id="furnishedNo"
                            value="No"
                            checked={furnished === 'No'}
                            onChange={() => setFurnished('No')}
                            required
                            className="border-2 border-slate-600 rounded-md p-2  w-5 h-8"
                        />
                        <label className='font-bold uppercase' htmlFor="furnishedNo">No</label>
                    </div>

                    <label className='font-bold uppercase text-lg'>Parking</label>
                    <div className='p-1 flex  items-center w-full gap-1'>
                        <input
                            type="radio"
                            id="parkingYes"
                            value="Yes"
                            checked={parking === 'Yes'}
                            onChange={() => setParking('Yes')}
                            required
                            className='border-b-2 border-black p-2 w-5 h-8'
                        />
                        <label htmlFor="parkingYes" className='font-bold uppercase mr-3'>Yes</label>
                        <input
                            type="radio"
                            id="parkingNo"
                            value="No"
                            checked={parking === 'No'}
                            onChange={() => setParking('No')}
                            required
                            className="border-2 border-slate-600 rounded-md p-2 w-5 h-8"
                        />
                        <label className='font-bold uppercase' htmlFor="parkingNo">No</label>
                    </div>

                    <label className='font-bold uppercase text-lg'>Pet</label>
                    <div className='p-1 flex  items-center w-full gap-1'>
                    
                        <input
                            type="radio"
                            id="petYes"
                            value="Yes"
                            checked={pet === 'Yes'}
                            onChange={() => setPet('Yes')}
                            required
                            className="border-2 border-slate-600 rounded-md p-2 w-5 h-8"
                        />
                        <label className='font-bold uppercase mr-3' htmlFor="petYes">Yes</label>
                        <input
                            type="radio"
                            id="petNo"
                            value="No"
                            checked={pet === 'No'}
                            onChange={() => setPet('No')}
                            required
                            className="border-2 border-slate-600 rounded-md p-2 w-5 h-8"
                        />
                        <label className='font-bold uppercase' htmlFor="petNo">No</label>
                    </div>
                    
                    <textarea
                        value={description}
                        placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}
                        className="border-2 border-slate-600 rounded-md p-2"
                    />

                    <input
                        type="number"
                        placeholder='Ratings'
                        value={ratings}
                        onChange={(e) => setRatings(e.target.value)}
                        className="border-2 border-slate-600 rounded-md p-2 w-full"
                    />

                    <input
                        type='file'
                        placeholder='Place Photo'
                        accept="image/jpeg, image/png, image/gif"
                        onChange={handlePlaceChange}
                        className="border-2 border-slate-600 rounded-md p-2 w-full"
                    />
                    {placePreview && <img src={placePreview} alt='place' className='mt-2' />}

                    <div className='my-2'>
                        <button type='submit' className="w-full px-4 py-2 uppercase bg-black text-white border-2 border-slate-600 rounded-md">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Edit;

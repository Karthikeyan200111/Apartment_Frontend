import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css'; // Import the animate.css library
import { enqueueSnackbar } from "notistack";

const Post = () => {
    const [area, setArea] = useState('');
    const [hospital, setHospital] = useState('');
    const [collegeNearBy, setCollegeNearBy] = useState('');
    const [noOfBedrooms, setNoOfBedrooms] = useState('');
    const [noOfBathrooms, setNoOfBathrooms] = useState('');
    const [place, setPlace] = useState(null);
    const [rent, setRent] = useState('');
    const [furnished, setFurnished] = useState('');
    const [parking, setParking] = useState('');
    const [pet, setPet] = useState('');
    const [description, setDescription] = useState('');
    const [ratings, setRatings] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!area) newErrors.area = 'Area is required';
        if (!hospital) newErrors.hospital = 'Please select if there is a hospital nearby';
        if (!collegeNearBy) newErrors.collegeNearBy = 'Please select if there is a college nearby';
        if (!noOfBedrooms) newErrors.noOfBedrooms = 'Number of bedrooms is required';
        if(noOfBedrooms<0) newErrors.noOfBedrooms="Number of bedrooms should be positive"
        if(noOfBathrooms<0) newErrors.noOfBathrooms="Number of Bathrooms should be positive"
        if (!noOfBathrooms) newErrors.noOfBathrooms = 'Number of bathrooms is required';
        if (!rent) newErrors.rent = 'Rent is required';
        if (rent<0) newErrors.rent = 'Rent should be positive';
       
        if (!furnished) newErrors.furnished = 'Please select if the place is furnished';
        if (!parking) newErrors.parking = 'Please select if there is parking available';
        if (!pet) newErrors.pet = 'Please select if pets are allowed';
        if (!description) newErrors.description = 'Description is required';
        if (!ratings) newErrors.ratings = 'Ratings are required';
        if (ratings<0) newErrors.ratings = 'Ratings Should be positive ';
        if (ratings>5) newErrors.ratings = 'Ratings Should be between 1 and 5 ';
        if (!place) newErrors.place = 'Place photo is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            enqueueSnackbar("Please fill in all required fields", { variant: "error" });
            return;
        }

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
        formData.append('place', place);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}post`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                enqueueSnackbar("Posted Successfully", { variant: "success" }, { autoHideDuration: 2000 });
                navigate('/');
            } else {
                console.error('Error submitting form');
                enqueueSnackbar("Error Occurred", { variant: "error" }, { autoHideDuration: 2000 });
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className='p-3 flex flex-col items-center justify-center w-full '>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col md:w-[35rem] border-solid border-4 rounded-lg animate__animated animate__slideInUp  bg-yellow-300 border-black  p-4  gap-y-3 justify-center'>
                    <h1 className='text-2xl uppercase font-bold text-center'>Post Page</h1>
                    <input
                        type="text"
                        value={area}
                        placeholder='Area'
                        onChange={(e) => setArea(e.target.value)}
                        required
                        className="border-2 border-slate-600 rounded-md p-2 w-full"
                    />
                    {errors.area && <span className='text-red-600'>{errors.area}</span>}

                    <label className='font-bold uppercase text-lg'>Hospital</label>
                    <div className='flex gap-3 w-full'>
                        <input
                            type='checkbox'
                            id='yes'
                            value='Yes'
                            checked={hospital === 'Yes'}
                            onChange={() => setHospital('Yes')}
                            className="border-2 border-slate-600 rounded-md p-2 w-4 font-bold"
                        />
                        <label className='font-bold mr-2' htmlFor='yes'>YES</label>
                        <input
                            type='checkbox'
                            id='no'
                            value='No'
                            checked={hospital === 'No'}
                            onChange={() => setHospital('No')}
                            className="border-2 border-slate-600 w-4 rounded-md p-2"
                        />
                        <label className='font-bold' htmlFor='no'>NO</label>
                    </div>
                    {errors.hospital && <span className='text-red-600'>{errors.hospital}</span>}

                    <input
                        type="number"
                        placeholder='No of Bedrooms'
                        value={noOfBedrooms}
                        onChange={(e) => setNoOfBedrooms(e.target.value)}
                        required
                        className="border-2 border-slate-600 rounded-md p-2 w-full"
                    />
                    {errors.noOfBedrooms && <span className='text-red-600'>{errors.noOfBedrooms}</span>}

                    <input
                        type='number'
                        placeholder='No of Bathrooms'
                        value={noOfBathrooms}
                        onChange={(e) => setNoOfBathrooms(e.target.value)}
                        required
                        className="border-2 border-slate-600 rounded-md p-2 w-full"
                    />
                    {errors.noOfBathrooms && <span className='text-red-600'>{errors.noOfBathrooms}</span>}

                    <label className='font-bold text-lg uppercase '>College Nearby</label>
                    <div className='p-1'>
                        <input
                            type="radio"
                            id="collegeYes"
                            value="Yes"
                            checked={collegeNearBy === 'Yes'}
                            onChange={(e) => setCollegeNearBy(e.target.value)}
                            required
                            className="border-2 border-slate-600 w-4 rounded-md p-2"
                        />
                        <label htmlFor="collegeYes" className='font-bold uppercase mr-2'>Yes</label>
                        <input
                            type="radio"
                            id="collegeNo"
                            value="No"
                            checked={collegeNearBy === 'No'}
                            onChange={(e) => setCollegeNearBy(e.target.value)}
                            required
                            className="border-2 border-slate-600 rounded-md p-2"
                        />
                        <label htmlFor="collegeNo" className='font-bold uppercase'>No</label>
                    </div>
                    {errors.collegeNearBy && <span className='text-red-600'>{errors.collegeNearBy}</span>}

                    <input
                        type="number"
                        placeholder='Rent'
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                        required
                        className="border-2 border-slate-600 rounded-md p-2"
                    />
                    {errors.rent && <span className='text-red-600'>{errors.rent}</span>}

                    <label className='font-bold uppercase text-lg'>Furnished</label>
                    <div className='p-1'>
                        <input
                            type="radio"
                            id="furnishedYes"
                            value="Yes"
                            checked={furnished === 'Yes'}
                            onChange={() => setFurnished('Yes')}
                            required
                            className="border-2 border-slate-600 rounded-md p-2"
                        />
                        <label htmlFor="furnishedYes" className='mr-3 font-bold uppercase'>Yes</label>
                        <input
                            type="radio"
                            id="furnishedNo"
                            value="No"
                            checked={furnished === 'No'}
                            onChange={() => setFurnished('No')}
                            required
                            className="border-2 border-slate-600 rounded-md p-2"
                        />
                        <label className='font-bold uppercase' htmlFor="furnishedNo">No</label>
                    </div>
                    {errors.furnished && <span className='text-red-600'>{errors.furnished}</span>}

                    <label className='font-bold uppercase text-lg'>Parking</label>
                    <div className='p-1'>
                        <input
                            type="radio"
                            id="parkingYes"
                            value="Yes"
                            checked={parking === 'Yes'}
                            onChange={() => setParking('Yes')}
                            required
                            className='border-b-2 border-black p-2'
                        />
                        <label htmlFor="parkingYes" className='font-bold uppercase mr-3'>Yes</label>
                        <input
                            type="radio"
                            id="parkingNo"
                            value="No"
                            checked={parking === 'No'}
                            onChange={() => setParking('No')}
                            required
                            className="border-2 border-slate-600 rounded-md p-2"
                        />
                        <label className='font-bold uppercase' htmlFor="parkingNo">No</label>
                    </div>
                    {errors.parking && <span className='text-red-600'>{errors.parking}</span>}

                    <label className='font-bold uppercase text-lg'>Pet</label>
                    <div className='p-1'>
                        <input
                            type="radio"
                            id="petYes"
                            value="Yes"
                            checked={pet === 'Yes'}
                            onChange={() => setPet('Yes')}
                            required
                            className="border-2 border-slate-600 rounded-md p-2"
                        />
                        <label className='font-bold uppercase mr-3' htmlFor="petYes">Yes</label>
                        <input
                            type="radio"
                            id="petNo"
                            value="No"
                            checked={pet === 'No'}
                            onChange={() => setPet('No')}
                            required
                            className="border-2 border-slate-600 rounded-md p-2"
                        />
                        <label className='font-bold uppercase' htmlFor="petNo">No</label>
                    </div>
                    {errors.pet && <span className='text-red-600'>{errors.pet}</span>}

                    <textarea
                        value={description}
                        placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}
                        className="border-2 border-slate-600 rounded-md p-2"
                    />
                    {errors.description && <span className='text-red-600'>{errors.description}</span>}

                    <input
                        type="number"
                        placeholder='Ratings'
                        value={ratings}
                        onChange={(e) => setRatings(e.target.value)}
                        className="border-2 border-slate-600 rounded-md p-2 w-full"
                    />
                    {errors.ratings && <span className='text-red-600'>{errors.ratings}</span>}

                    <input
                        type='file'
                        placeholder='Place Photo'
                        accept="image/jpeg, image/png, image/gif"
                        onChange={(e) => setPlace(e.target.files[0])}
                        required
                        className="border-2 border-slate-600 rounded-md p-2 w-full"
                    />
                    {errors.place && <span className='text-red-600'>{errors.place}</span>}
                    {place && <img src={URL.createObjectURL(place)} alt='place' className='mt-2' />}

                    <div className='my-2'>
                        <button type='submit' className="w-full px-4 py-2 uppercase bg-black text-white border-2 border-slate-600 rounded-md">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Post;

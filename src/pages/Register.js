import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { enqueueSnackbar } from 'notistack';
import "animate.css";
import { TailSpin } from 'react-loader-spinner';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: yup.string().required('Phone Number is required').matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    role: yup.string().oneOf(['Seller', 'Buyer'], 'Role is required').required('Role is required')
});

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setLoading(true)
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (response.ok) {
            setLoading(false)
            const responseData = await response.json();
            console.log(responseData);
            enqueueSnackbar("Registered Successfully...", { variant: 'success', autoHideDuration: 2000 });
            navigate('/login');
        } else {
            setLoading(false)
            enqueueSnackbar("Error Occurred...", { variant: 'error', autoHideDuration: 2000 });
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
        <div className='flex items-center justify-center md:w-full min-w-72 gap-10 md:p-4 p-8 md:mt-4'>
            <div className='md:h-[35rem] flex md:flex-row flex-col item-center border-transparent border-2'>
                <div className='md:p-4 md:h-full h-[30rem] md:w-[25rem] w-[18rem] drop-shadow-2xl shadow-black shadow-right border-solid border-4 rounded-lg bg-yellow-300 border-black animate__animated animate__fadeInDown transition-all'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex items-center justify-center gap-2 p-4 md:p-0'>
                        <div className='flex flex-col justify-between md:w-96 w-52 md:space-y-4 space-y-3 md:p-2'>
                            <h1 className='md:text-xl uppercase font-bold text-center'>Register Page</h1>
                            
                            <input
                                type="text"
                                placeholder='First Name'
                                {...register('firstName')}
                                className='border-2 border-slate-600 rounded-md md:p-2 px-2 py-1 md:w-full'
                            />
                            {errors.firstName && <span>{errors.firstName.message}</span>}

                            <input
                                type="text"
                                placeholder='Last Name'
                                {...register('lastName')}
                                className='border-2 border-slate-600 rounded-md md:p-2 px-2 py-1 w-full'
                            />
                            {errors.lastName && <span>{errors.lastName.message}</span>}

                            <input
                                type="email"
                                placeholder='Email'
                                {...register('email')}
                                className='border-2 border-slate-600 rounded-md md:p-2 px-2 py-1 w-full'
                            />
                            {errors.email && <span>{errors.email.message}</span>}

                            <input
                                type="password"
                                placeholder='Password'
                                {...register('password')}
                                className='border-2 border-slate-600 rounded-md md:p-2 px-2 py-1 md:w-full'
                            />
                            {errors.password && <span>{errors.password.message}</span>}

                            <input
                                placeholder='Phone Number'
                                type="tel"
                                {...register('phoneNumber')}
                                className='border-2 border-slate-600 rounded-md md:p-2 px-2 py-1 md:w-full'
                            />
                            {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}

                            <div className='text-lg'>
                                <label>Role</label>
                                <input
                                    type="radio"
                                    id="seller"
                                    value="Seller"
                                    {...register('role')}
                                    className='border-b-2 border-black ml-2 px-2 py-1'
                                />
                                <label htmlFor="seller" className='mr-3'>Seller</label>

                                <input
                                    type="radio"
                                    id="buyer"
                                    value="Buyer"
                                    {...register('role')}
                                    className='border-b-2 border-black p-2'
                                />
                                <label htmlFor="buyer">Buyer</label>
                                {errors.role && <span>{errors.role.message}</span>}
                                <div className='md:mt-6 mt-3 flex flex-col items-center'>
                                    <button type='submit' className='text-md md:text-lg w-full rounded-lg md:px-4 md:py-2 px-2 py-1 uppercase bg-black text-white hover:duration-100 hover:-translate-y-5 hover:bg-white hover:text-black font-bold hover:ease-in-out transition-all'>
                                        Register
                                    </button>
                                    <h1 className='text-sm mt-3'>Already Have an Account<span className='text-blue-600'><Link to='/login'> Login Here</Link></span></h1>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="hidden md:w-[25rem] h-full bg-black rounded-lg md:flex items-center justify-center border-white border-2 text-white animate__animated animate__flipInX transition-all">
                    <div className="flex flex-col gap-2 text-center">
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
        </div>
    );
};

export default Register;

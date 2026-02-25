import { useState } from "react";
import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL;

export const Signup = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const validate = () => {
        let allError = {};
        if(formData.firstName === '') {
            allError.firstName = 'First Name is required';
        }
        if(formData.lastName === '') {
            allError.lastName = 'Last Name is required';
        }
        if(formData.email === '') {
            allError.email = 'Email is required';
        } 
        if (formData.password === '') {
            allError.password = 'Password is required'
        }

        setError(allError);

        return Object.keys(allError).length === 0;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validate()) {
            // alert('Success');
            try {
                const response = await axios.post(`${baseUrl}/api/auth/signup`, formData );
                console.log(response.data.messsage);
            } catch (err) {

            } finally {

            }
            
               
        }   
    }
    return (
        <div className="flex flex-col mt-40 w-full max-w-md gap-4 bg-white">

            <h1 className="text-red-500 font-semibold">Signup Page</h1>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-2 "
            >
                <input 
                    type="text" 
                    name="firstName"
                    placeholder="First Name" 
                    onChange={handleChange}
                    className="border border-gray-200 p-2 rounded-md"
                />
                {error.firstName && <p style={{color: 'red'}}>{error.firstName}</p>}
               
                <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name" 
                    onChange={handleChange}
                    className="border border-gray-200 p-2 rounded-md"
                />
                {error.lastName && <p className="text-red-500">{error.lastName}</p>}
              
                <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    onChange={handleChange}
                    className="border border-gray-200 p-2 rounded-md"
                />
                {error.email && <p className="text-red-500">{error.email}</p>}
              
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    onChange={handleChange}
                    className="border border-gray-200 p-2 rounded-md"
                />
                {error.password && <p className="text-red-500">{error.password}</p>}
                
                <button 
                type="submit"
                className="border border-gray-200 p-2 rounded-md bg-blue-500 text-white"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
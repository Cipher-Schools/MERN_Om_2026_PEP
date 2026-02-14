import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupComponent() {
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [dob, setDob] = useState('');

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dob: ''
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
        if (formData.dob === '') {
            allError.dob = 'Date of Birth is required';        
        }

        setError(allError);

        return Object.keys(allError).length === 0;

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()) {
            alert('Success');
            console.log('Your Form Data', formData);
            navigate('/cart');
        }   
    }
        
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="firstName"
                    placeholder="First Name" 
                    onChange={handleChange}
                />
                {error.firstName && <p style={{color: 'red'}}>{error.firstName}</p>}
                <br />
                <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name" 
                    onChange={handleChange}
                />
                {error.lastName && <p style={{color: 'red'}}>{error.lastName}</p>}
                <br />
                <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    onChange={handleChange}
                />
                {error.email && <p style={{color: 'red'}}>{error.email}</p>}
                <br />
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    onChange={handleChange}
                />
                {error.password && <p style={{color: 'red'}}>{error.password}</p>}
                <br />
                <input 
                    type="date"
                    name="dob" 
                    placeholder="Date of Birth" 
                    onChange={handleChange}
                />
                {error.dob && <p style={{color: 'red'}}>{error.dob}</p>}
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignupComponent;
import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: '', password:""})
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
			method: 'post',

			headers: {
				'Content-Type': 'application/json',
			},
            body: JSON.stringify({email: credentials.email,password: credentials.password})
		});
		const json = await response.json();
        console.log(json)
        if(json.success){
            // redirect
            localStorage.setItem('token', json.authToken)
            navigate('/')
			props.showAlert("Account Created Successfully", "success")
        }else{
            props.showAlert("Invalid details", "danger")
        }
    }

    const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<form onSubmit={handleSubmit}>
            <h2 className='mt-5'>Login to your account</h2>
			<div className='my-3'>
				<label
					htmlFor='email'
					className='form-label'>
					Email address
				</label>
				<input
					type='email'
					className='form-control'
					id='email'
                    autoComplete='username'
                    name='email'
					aria-describedby='emailHelp'
                    onChange={onChange}
				/>
				<div
					id='emailHelp'
					className='form-text'>
					We'll never share your email with anyone else.
				</div>
			</div>
			<div className='mb-3'>
				<label
					htmlFor='password'
					className='form-label'>
					Password
				</label>
				<input
					type='password'
					className='form-control'
					id='password'
                    name='password'
                    autoComplete
                    onChange={onChange}
				/>
			</div>
			<button
				type='submit'
				className='btn btn-primary'
                >
				Login
			</button>
		</form>
	);
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: '',email: '', password: '', cPassword: ''})

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
			method: 'post',

			headers: {
				'Content-Type': 'application/json',
			},
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
		});
		const json = await response.json();
        console.log(json)
            if(json.success){
                localStorage.setItem('token', json.authToken)
                navigate('/')
				props.showAlert("Account Created Successfully", "success")
            }
			else{
				props.showAlert("Invalid Credentils", "danger")
			}
            // redirect
    }


	return (
		<form onSubmit={handleSubmit}>
			<h2 className='mt-5'>Create an account</h2>
			<div className='my-3'>
				<label
					htmlFor='name'
					className='form-label'>
					Name 
				</label>
				<input
					type='text'
					className='form-control'
					id='name'
                    name='name'
                    onChange={onChange}
					aria-describedby='emailHelp'
				/>
			</div>
			<div className='mb-3'>
				<label
					htmlFor='email'
					className='form-label'>
					Email 
				</label>
				<input
					type='email'
					className='form-control'
					id='email'
                    name='email'
                    onChange={onChange}
					aria-describedby='emailHelp'
					autoComplete='username'
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
                    onChange={onChange}
                    required
					autoComplete='password'
                    minLength={5}
				/>
			</div>
			<div className='mb-3'>
				<label
					htmlFor='cPassword'
					className='form-label'>
					Confirm Password
				</label>
				<input
					type='password'
					className='form-control'
					id='cPassword'
                    name='cPassword'
                    onChange={onChange}
                    required
					autoComplete='password'
                    minLength={5}
				/>
			</div>
			<button
				type='submit'
				className='btn btn-primary'>
				Signup
			</button>
		</form>
	);
};

export default Signup;

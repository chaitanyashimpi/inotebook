import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
	let location = useLocation();
	let navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('token')
		navigate('/login')
	} 

	return (
		<nav className='navbar navbar-expand-lg  navbar-dark bg-dark'>
			<div className='container-fluid'>
				<Link
					className='navbar-brand'
					to='/'>
					iNoteBook
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='collapse navbar-collapse'
					id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link
								className={`nav-link ${
									location.pathname === '/' ? 'active' : ''
								}`}
								aria-current='page'
								to='/'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className={`nav-link ${
									location.pathname === '/about' ? 'active' : ''
								}`}
								to='/about'>
								About Us
							</Link>
						</li>
					</ul>
					<div
						className='d-flex'
						role='search'>
							{!localStorage.getItem('token')?<><Link
							to='/login'
							className='btn btn-primary mx-1'
							>
							Login
						</Link>
						<Link
							to='/signup'
							className='btn btn-primary mx-1'
							>
							Signup
						</Link></>: <><button className='btn btn-danger mx-1' onClick={logout}>Logout</button></>}
						
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

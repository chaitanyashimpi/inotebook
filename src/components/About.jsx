import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
	const navigate = useNavigate();
  useEffect(()=>{
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    // eslint-disable-next-line
  },[])


	return (
		<div>
			<h1>This is about page</h1>
		</div>
	);
};

export default About;

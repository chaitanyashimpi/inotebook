import React from 'react';

const Alert = (props) => {

	const capitalize = (word)=> {
		if(word === 'danger') word = 'error';

		const lower = word.toLowerCase();
		return lower.charAt(0).toUpperCase() + lower.slice(1)
	}

	return (
		props.alert && (
			<div
				className={`alert alert-${props.alert.type} alert-dismissible fade show`}
				role='alert'
				style={{ position: 'fixed', top: '60px', right: '0' }}>
				<strong>
					{capitalize(props.alert.type)}
				</strong>
				: {props.alert.msg}
				{/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
			</div>
		)
	);
};

export default Alert;

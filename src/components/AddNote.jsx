import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
	const context = useContext(noteContext);
	const { addNote } = context;

	const [note, setNote] = useState({ title: '', description: '', tag: '' });

	const handleClick = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
		
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<div className='container my-3'>
			<h1>Add a Note</h1>
			<form>
				<div className='mb-3'>
					<label
						htmlFor='title'
						className='form-label'>
						Title
					</label>
					<input
						type='email'
						className='form-control'
						id='title'
						name='title'
						aria-describedby='emailHelp'
						minLength={5}
						required
						onChange={onChange}
						value={note.title}
					/>
				</div>
				<div className='mb-3'>
					<label
						htmlFor='description'
						className='form-label'>
						Description
					</label>
					<input
						type='text'
						className='form-control'
						onChange={onChange}
						name='description'
						id='description'
						minLength={5}
						required
						value={note.description}
					/>
				</div>
				<div className='mb-3'>
					<label
						htmlFor='tag'
						className='form-label'>
						Tag
					</label>
					<input
						type='text'
						className='form-control'
						onChange={onChange}
						name='tag'
						id='tag'
						value={note.tag}
					/>
				</div>
				<button
					type='submit'
					className='btn btn-primary'
					onClick={handleClick}
					disabled={note.title.length<5 || note.description.length<5}>
					Add Note
				</button>
			</form>
		</div>
	);
};

export default AddNote;

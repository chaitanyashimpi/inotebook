import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
	const context = useContext(noteContext);
	const { notes, getAllNotes, editNote } = context;
	const { showAlert } = props.showAlert;
	const navigate = useNavigate();


	const ref = useRef(null);
	const refClose = useRef(null);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			getAllNotes();
		} else {
			navigate('/login');
		}
		// eslint-disable-next-line
	}, []);
	const [note, setNote] = useState({
		id: '',
		etitle: '',
		edescription: '',
		etag: 'default',
	});

	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({
			id: currentNote._id,
			etitle: currentNote.title,
			edescription: currentNote.description,
			etag: currentNote.tag,
		});
	};

	const handleClick = (e) => {
		editNote(note.id, note.etitle, note.edescription, note.etag);
		refClose.current.click();
		e.preventDefault();
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<>
			<AddNote showAlert={props.showAlert} />

			<button
				type='button'
				ref={ref}
				className='btn btn-primary d-none'
				data-bs-toggle='modal'
				data-bs-target='#exampleModal'>
				Launch demo modal
			</button>

			<div
				className='modal fade'
				id='exampleModal'
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1
								className='modal-title fs-5'
								id='exampleModalLabel'>
								Edit a Note
							</h1>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<form>
								<div className='mb-3'>
									<label
										htmlFor='etitle'
										className='form-label'>
										Title
									</label>
									<input
										type='email'
										className='form-control'
										id='etitle'
										name='etitle'
										value={note.etitle}
										minLength={5}
										required
										aria-describedby='emailHelp'
										onChange={onChange}
									/>
								</div>
								<div className='mb-3'>
									<label
										htmlFor='edescription'
										className='form-label'>
										Description
									</label>
									<input
										type='text'
										className='form-control'
										onChange={onChange}
										name='edescription'
										minLength={5}
										required
										value={note.edescription}
										id='edescription'
									/>
								</div>
								<div className='mb-3'>
									<label
										htmlFor='etag'
										className='form-label'>
										Tag
									</label>
									<input
										type='text'
										className='form-control'
										onChange={onChange}
										name='etag'
										value={note.etag}
										id='etag'
									/>
								</div>
							</form>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
								ref={refClose}>
								Close
							</button>
							<button
								type='button'
								className='btn btn-primary'
								onClick={handleClick}
								disabled={
									note.etitle.length < 5 || note.edescription.length < 5
								}>
								Update Notes
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='row my-3'>
				<h1>Your Notes</h1>
				<div className='container'>
					{notes.length === 0 && 'No Notes to display'}
				</div>
				{notes.map((note, key) => {
					return (
						<NoteItem
							note={note}
							key={key}
							updateNote={updateNote}
							showAlert={showAlert}
						/>
					);
				})}
			</div>
		</>
	);
};

export default Notes;

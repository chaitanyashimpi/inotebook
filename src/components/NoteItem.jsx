import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
	const { note, updateNote } = props;

	const context = useContext(noteContext);
	const { deleteNote } = context;

	return (
		<div className='col-md-3 my-2'>
			<div
				className='card'
				style={{ width: 'fit-content' }}>
				<div className='card-body my-3'>
					<div className='d-flex align-items-center'>
						<h5 className='card-title'>{note.title}</h5>
						<i
							className='far fa-trash-alt mx-2'
							onClick={() => {
								deleteNote(note._id);
								
							}}></i>
						<i
							className='far fa-edit mx-2'
							onClick={() => {
								updateNote(note);
							}}></i>
					</div>
					<p className='card-text'>{note.description}</p>
				</div>
			</div>
		</div>
	);
};

export default NoteItem;

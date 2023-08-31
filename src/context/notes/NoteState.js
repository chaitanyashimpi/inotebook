import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
	const host = 'http://localhost:5000';

	const note = [];

	const [notes, setNotes] = useState(note);

	// Add a note
	const getAllNotes = async () => {
		// TODO: API Call

		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: 'GET',

			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					localStorage.getItem('token'),
			},
		});
		const json = await response.json();
		setNotes(json);
	};
	const addNote = async (title, description, tag) => {
		// TODO: API Call
		
		if(tag === ''){
			tag = 'default'
		}

		const response = await fetch(`${host}/api/notes/addNote`, {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					localStorage.getItem('token'),
			},

			body: JSON.stringify({
				title: title,
				description: description,
				tag: tag,
			}),
		});
		let note = await response.json();
		setNotes(notes.concat(note))
		props.showAlert ("Note has been added successfully", "success")
		
	};

	// Delete a note
	const deleteNote = async (id) => {
		// TODO: API Call
		const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
			method: 'DELETE',

			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					localStorage.getItem('token'),
			},

			body: JSON.stringify({ notes }),
		});
		const json = await response.json();
		console.log(json);

		let newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
		props.showAlert ("Note has been deleted successfully", "success")

	};

	// Edit a note
	const editNote = async (id, title, description, tag) => {
		// TODO: API Call
		const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
			method: 'PUT',

			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					localStorage.getItem('token'),
			},

			body: JSON.stringify({ title, description, tag }),
		});
		const json = await response.json();
		console.log(json);

		props.showAlert ("Note has been updated successfully", "success")

		// Logic to edit in client
		let newNotes = JSON.parse(JSON.stringify(notes));
		for (let index = 0; index < notes.length; index++) {
			const element = notes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
	};

	return (
		<NoteContext.Provider
			value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;


import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
	
	const note = [
		{
		  "_id": "64ec3a4ec397e5a477802016",
		  "user": "64e4bcff2516cf33b4cef2e3",
		  "title": "My Title",
		  "description": "This is description",
		  "tag": "default",
		  "date": "2023-08-28T06:10:22.255Z",
		  "__v": 0
		},
		{
		  "_id": "64ec3ad9c397e5a47780201c",
		  "user": "64e4bcff2516cf33b4cef2e3",
		  "title": "My Title Updated",
		  "description": "This is description updated",
		  "tag": "default",
		  "date": "2023-08-28T06:12:41.962Z",
		  "__v": 0
		},
		{
		  "_id": "64ec3ad9c397e5a47780201c",
		  "user": "64e4bcff2516cf33b4cef2e3",
		  "title": "My Title Updated",
		  "description": "This is description updated",
		  "tag": "default",
		  "date": "2023-08-28T06:12:41.962Z",
		  "__v": 0
		},
		{
		  "_id": "64ec3ad9c397e5a47780201c",
		  "user": "64e4bcff2516cf33b4cef2e3",
		  "title": "My Title Updated",
		  "description": "This is description updated",
		  "tag": "default",
		  "date": "2023-08-28T06:12:41.962Z",
		  "__v": 0
		},
		{
			"_id": "64ec3ad9c397e5a47780201c",
			"user": "64e4bcff2516cf33b4cef2e3",
			"title": "My Title Updated",
			"description": "This is description updated",
			"tag": "default",
			"date": "2023-08-28T06:12:41.962Z",
			"__v": 0
		  }
	  ]

	  const [notes, setNotes] = useState(note)
	
	return (
		<NoteContext.Provider value={{notes, setNotes}}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;

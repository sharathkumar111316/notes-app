 import React, { useState, useEffect } from 'react';
 import Header from './components/Header';
 import Search from './components/Search';
 import NotesList from './components/NotesList';
 import './index.css';
 import { nanoid } from 'nanoid';

 const App = () => {
 	const [notes, setNotes] = useState([]);

 	const [searchText, setSearchtext] = useState('');

 	const [darkmode, setDarkMode] = useState(false);

 	useEffect(() => {
 		const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));

 		if (savedNotes) {
 			setNotes(savedNotes);
 		}
 	}, []);

 	useEffect(() => {
 		localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
 	},[notes]);

 	const addNote = (text) => {
 		const date = new Date();
 		const newNote = {
 			id: nanoid(),
 			text: text,
 			date: date.toLocaleDateString(),
 		};
 		const newNotes = [...notes, newNote];
 		console.log(newNote);
 		setNotes(newNotes);
 	};

 	const handleDeleteNote = (id) => {
 		const newNotes = notes.filter((note) => note.id !== id);
 		setNotes(newNotes);
 	};

 	return (
 			<div className={`${darkmode && 'dark-mode'}`}>
 				<div className='container'>
 				<Header handleToggleDarkMode={setDarkMode} />
 				<Search handleSearchNote={setSearchtext} />
 				<NotesList 
 				notes={notes.filter((note) => 
 					note.text.toLowerCase().includes(searchText)
 					)} 
 				handleAddNote={addNote} 
 				handleDeleteNote={handleDeleteNote} />
 			</div>
 			</div>
 		)
 };

 export default App;
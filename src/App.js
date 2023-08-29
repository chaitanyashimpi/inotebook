import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About'
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState';


function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<div className='container'>
				<NoteState>
					<Routes>
						<Route
							path='/'
							element={<Home />}
						/>
						<Route
							path='/about'
							element={<About />}
						/>
					</Routes>
				</NoteState>
			</div>
		</BrowserRouter>
	);
}

export default App;

import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About'
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';


function App() {
	const [alert, setAlert] = useState(null)

	const showAlert = (message, type)=> {
		setAlert({
			msg: message,
			type: type
		})
		setTimeout(()=>{
			setAlert(null);
		}, 1500)
	}

	return (
		<BrowserRouter>
			<Navbar />
			<Alert alert = {alert}/>
			<div className='container'>
				<NoteState showAlert = {showAlert}>
					<Routes>
						<Route
							path='/'
							element={<Home showAlert={showAlert}/>}
						/>
						<Route
							path='/about'
							element={<About />}
						/>
						<Route
							path='/login'
							element={<Login showAlert={showAlert} />}
						/>
						<Route
							path='/signup'
							element={<Signup showAlert={showAlert} />}
						/>
					</Routes>
				</NoteState>
			</div>
		</BrowserRouter>
	);
}

export default App;

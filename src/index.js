import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './components/About';
import { Navbar } from './components/Navbar';




const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/about',
		element: <About />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Navbar />
		<RouterProvider router={router} />
	</React.StrictMode>
);

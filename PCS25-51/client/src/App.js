import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

//Pages
import Home from './pages/Home';
import Login from './pages/loginPage';
import FormOrg from './components/formOrg/formOrg'
import SignUp from './pages/SignupPage';
import Pricing from './pages/PricingPage';
import Footer from './components/Footer/Footer';
import Winner from './components/Winner/Winner';

function App() {
	return (
		
		<Router>
			<GlobalStyle />
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home/>} />
				<Route exact path="/login" element={<Login/>} />
				<Route exact path="/signup" element={<SignUp/>} />
				<Route exact path="/pricing" element ={<Pricing/>} />
				<Route exact path="/formOrg" element ={<FormOrg/>} />
				<Route exact path="/Winner" element ={<Winner/>} />

			</Routes>
			<Footer />
		</Router>
	);
}

export default App;

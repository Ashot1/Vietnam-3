import {useState} from "react";
import './App.css';

import Header from './components/header/header'
import Menu from './components/menu/menu'
import Routing from "./Routing";

export default function App() {
	
	const [MenuOpen, setMenuOpen] = useState(false)
	
	function MenuActivation(value) {
		return setMenuOpen((MenuOpen) => !MenuOpen);
	}
	
	return (
		<div className="app">
			<Header BurgerChange={MenuActivation}/>
			<Menu MenuChanges={MenuOpen}/>
			<Routing/>
		</div>
	);
}


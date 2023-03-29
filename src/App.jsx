import {useState} from "react";
import styles from './App.module.css';

import Header from './components/header/header'
import Menu from './components/menu/menu'
import Routing from "./Routing";
import ModalWindow from "./components/UI/ModalWindow/modalWindow";
import Form from "./components/UI/RegisterForm/Form";

export default function App() {
	const [MenuOpen, setMenuOpen] = useState(false)
	const [SettingsState, setSettingsState] = useState(false)
	
	function MenuActivation(value) {
		return setMenuOpen((MenuOpen) => !MenuOpen);
	}
	
	const setSetting = () => {
		setSettingsState(true)
	}
	
	const CloseSetting = () => {
		setSettingsState(false)
	}
	
	return (
		<div className={styles.app}>
			<Header BurgerChange={MenuActivation} SettingChange={setSetting}/>
			<Menu MenuChanges={MenuOpen}/>
			{SettingsState ? <ModalWindow
				CloseSetting={CloseSetting}
				width="60%"
				height="500px"
			>
				<div className={styles.user}>
					<Form background="white"/>
				</div>
			</ModalWindow> : null}
			<Routing/>
		</div>
	);
}


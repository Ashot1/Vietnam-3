import {lazy, useEffect, useState} from "react";
import styles from './App.module.css';

import Header from './components/header/header'
import Menu from './components/menu/menu'
import ModalWindow from "./components/UI/ModalWindow/modalWindow";
import Form from "./components/UI/Form/Form";
import Settings from "./components/Settings/Settings";

const Routing = lazy(() => import("./Routing"))


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
	
	useEffect(() => {
		if (localStorage.getItem('Mobile Menu') === null) {
			localStorage.setItem('Mobile Menu', 'upper')
			window.location.reload()
		}
	}, [])
	
	return (
		<div className={styles.app}>
			<Header BurgerChange={MenuActivation} SettingChange={setSetting}/>
			<Menu MenuChanges={MenuOpen} setSetting={setSetting}/>
			{SettingsState ? <ModalWindow
				CloseSetting={CloseSetting}
				classModal={styles.SettingModal}
			>
				<div className={styles.user}>
					<Form/>
				</div>
				<Settings/>
			</ModalWindow> : null}
			<Routing/>
		</div>
	);
}

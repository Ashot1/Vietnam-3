import {memo, useState} from "react";
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
				classModal={styles.SettingModal}
			>
				<div className={styles.user}>
					<Form background="white"/>
				</div>
				<Settings/>
			</ModalWindow> : null}
			<Routing/>
		</div>
	);
}

const Settings = memo(function Settings() {
	
	const Params = () => {
		let ParamArray = []
		let content = [
			{src: '/images/Settings/theme.png', title: 'Theme'},
			{src: '/images/Settings/table-content.png', title: 'Mobile Menu'},
			{src: '/images/Settings/table-content.png', title: 'Mobile Menu'},
			{src: '/images/Settings/table-content.png', title: 'Mobile Menu'}
		]
		for (let i = 0; i < 3; i++) {
			ParamArray.push(
				<span className={styles.params}>
					<img src={content[i].src} alt="" className={styles.paramsImg}/>
					<p>{content[i].title}</p>
				</span>
			)
		}
		return ParamArray
	}
	
	return (
		<div className={styles.settings}>
			{Params()}
			<span className={`${styles.params} ${styles.paramsActive}`}>
					<img className={styles.paramsActiveImg} src={'/images/Settings/table-content.png'} alt=""/>
					<p>{1231}</p>
				</span>
		</div>
	)
})
import {useEffect, useState} from "react";
import styles from './App.module.css';
import Header from './components/header/header'
import Menu from './components/menu/menu'
import ModalWindow from "./components/UI/ModalWindow/modalWindow";
import LoginInfo from "./components/Settings/Form/LoginInfo";
import Settings from "./components/Settings/Settings";
import CreateMark from "./components/MarksList/CreateMarkForm/CreateMarkForm";
import Routing from "./routing/routing"
import {Toaster} from "react-hot-toast";


export default function App() {
	const [MenuOpen, setMenuOpen] = useState(false),
		[SettingsState, setSettingsState] = useState(false),
		[CreateMarkActive, setCreateMarkActive] = useState(false)
	
	const ChangeCreateModal = () => {
		setCreateMarkActive(!CreateMarkActive)
	}
	
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
			<Toaster
				position="bottom-center"
				reverseOrder={true}/>
			<Header BurgerChange={MenuActivation} SettingChange={setSetting}/>
			<Menu MenuChanges={MenuOpen} setSetting={setSetting}/>
			<SettingModal SettingsState={SettingsState} CloseSetting={CloseSetting}/>
			<CreateMark CreateMarkActive={CreateMarkActive} ChangeCreateModal={ChangeCreateModal}/>
			{/*<Suspense fallback={<Preloader/>}>*/}
			<Routing ChangeCreateModal={ChangeCreateModal}/>
			{/*</Suspense>*/}
		</div>
	);
}

function SettingModal({SettingsState, CloseSetting}) {
	if (SettingsState) return (
		<ModalWindow
			CloseSetting={CloseSetting}
			classModal={styles.SettingModal}
		>
			<div className={styles.user}>
				<LoginInfo/>
			</div>
			<Settings/>
		</ModalWindow>
	)
}

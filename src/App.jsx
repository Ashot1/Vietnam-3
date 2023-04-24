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
import {AnimatePresence} from "framer-motion"


export default function App() {
	const [MenuOpen, setMenuOpen] = useState(false),
		[SettingsState, setSettingsState] = useState(false),
		[CreateMarkActive, setCreateMarkActive] = useState(false),
		Theme = localStorage.getItem('darkmode')
	
	const ChangeCreateModal = () => {
		setCreateMarkActive(!CreateMarkActive)
	}
	
	useEffect(() => {
		if (localStorage.getItem('Mobile Menu') === null) {
			localStorage.setItem('Mobile Menu', 'upper')
			window.location.reload()
		}
		if (localStorage.getItem('darkmode') === null) {
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				localStorage.setItem('darkmode', 'on')
			} else {
				localStorage.setItem('darkmode', 'off')
			}
			window.location.reload()
		}
	}, [])
	
	useEffect(() => {
		document.documentElement.dataset.theme = Theme
	}, [Theme])
	
	return (
		<div className={styles.app}>
			<Toaster
				position="bottom-center"
				reverseOrder={true}/>
			<Header BurgerChange={() => setMenuOpen(!MenuOpen)} SettingChange={() => setSettingsState(true)}/>
			<Menu MenuChanges={MenuOpen} setSetting={() => setSettingsState(true)}/>
			<SettingModal SettingsState={SettingsState} CloseSetting={() => setSettingsState(false)}/>
			<CreateMark CreateMarkActive={CreateMarkActive} ChangeCreateModal={ChangeCreateModal}/>
			{/*<Suspense fallback={<Preloader/>}>*/}
			<Routing ChangeCreateModal={ChangeCreateModal}/>
			{/*</Suspense>*/}
		</div>
	);
}

function SettingModal({SettingsState, CloseSetting}) {
	return (
		<AnimatePresence>
			{SettingsState && <ModalWindow
				CloseSetting={CloseSetting}
				classModal={styles.SettingModal}
			>
				<div className={styles.user}>
					<LoginInfo/>
				</div>
				<Settings/>
			</ModalWindow>}
		</AnimatePresence>
	)
}

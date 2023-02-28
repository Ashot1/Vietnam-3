import {useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import './App.css';

import StartPage from './pages/start/start'
import CalculatorPage from './pages/calculator/calculator'
import ConsolePage from './pages/console/console'
import DownloadPage from './pages/download/download'
import SettingsPage from './pages/settings/settings'
import SRMPage from './pages/SRM/SRM'
import NotFoundedPage from "./pages/NotFounded/NotFounded";
import TodoPage from "./pages/todo/todo";


import Header from './components/header/header'
import Slider from './components/slider/slider'
import Startmenu from './components/startmenu/startmenu'
import Menu from './components/menu/menu'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styles from "./components/menu/menu.module.css";

export default function App() {
	
	const [MenuOpen, setMenuOpen] = useState(false)
	const [Routers, setRouters] = useState([
		{
			content: <StartPage><Slider/><Startmenu/></StartPage>,
			url: '/'
		},
		{
			content: <CalculatorPage/>,
			url: '/Calculator'
		},
		{
			content: <ConsolePage/>,
			url: '/Console'
		},
		{
			content: <DownloadPage/>,
			url: '/Download'
		},
		{
			content: <SRMPage/>,
			url: '/SocialRatingMiner'
		},
		{
			content: <SettingsPage/>,
			url: '/Settings'
		},
		{
			content: <TodoPage/>,
			url: '/Todo'
		},
		{
			content: <NotFoundedPage/>,
			url: '*'
		},
	])
	
	function MenuActivation(value) {
		return setMenuOpen((MenuOpen) => !MenuOpen);
	}
	
	const location = useLocation()
	return (
		<div className="app">
			<Header BurgerChange={MenuActivation}/>
			<Menu MenuChanges={MenuOpen}/>
			<TransitionGroup>
				<CSSTransition
					key={location.pathname}
					timeout={400}
					classNames={{
						enterActive: `block_visible`,
						exitActive: `block_close`,
					}}
				>
					<div className={styles.huy}>
						<Routes>
							{Routers.map((item) => {
								return (
									<Route key={item.url} path={item.url} element={item.content}/>
								)
							})}
						</Routes>
					</div>
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
}


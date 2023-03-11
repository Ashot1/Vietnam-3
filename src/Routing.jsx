import {useState} from "react";
import StartPage from "./pages/start/start";
import Slider from "./components/slider/slider";
import Startmenu from "./components/startmenu/startmenu";
import CalculatorPage from "./pages/calculator/calculator";
import ConsolePage from "./pages/console/console";
import DownloadPage from "./pages/download/download";
import SRMPage from "./pages/SRM/SRM";
import SettingsPage from "./pages/settings/settings";
import TodoPage from "./pages/todo/todo";
import NotFoundedPage from "./pages/NotFounded/NotFounded";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styles from "./components/menu/menu.module.css";
import {Route, Routes, useLocation} from "react-router-dom";
import ModalWindow from "./components/UI/ModalWindow/modalWindow";

export default function Routing(props) {
	
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
			content: <TodoPage><ModalWindow/></TodoPage>,
			url: '/Todo'
		},
		{
			content: <NotFoundedPage/>,
			url: '*'
		},
	])
	
	const location = useLocation()
	
	return (
		<TransitionGroup>
			<CSSTransition
				key={location.pathname}
				timeout={250}
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
	);
}

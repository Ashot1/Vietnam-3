import {useEffect, useState} from "react";
import StartPage from "./pages/start/startPage";
import Slider from "./components/slider/slider";
import Startmenu from "./components/startmenu/startmenu";
import CalculatorPage from "./pages/calculator/calculatorPage";
import ConsolePage from "./pages/console/consolePage";
import DownloadPage from "./pages/download/downloadPage";
import SRMPage from "./pages/SRM/SRMPage";
import TodoPage from "./pages/todo/todoPage";
import NotFoundedPage from "./pages/NotFounded/NotFoundedPage";
import {CSSTransition, TransitionGroup} from "react-transition-group";
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
			content: <TodoPage><ModalWindow/></TodoPage>,
			url: '/Todo'
		},
		{
			content: <NotFoundedPage/>,
			url: '*'
		},
	])
	
	const location = useLocation()
	
	useEffect(() => {
		document.title = location.pathname === '/Calculator'
			? 'V-Calculator'
			: location.pathname === '/Console'
				? 'V-Console'
				: location.pathname === '/Download'
					? 'V-Download'
					: location.pathname === '/SocialRatingMiner'
						? 'V-Social Rating Miner'
						: location.pathname === '/Todo'
							? 'V-Todo/Marks'
							: 'Vietnam 3'
		
	}, [location.pathname])
	
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
				<div>
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

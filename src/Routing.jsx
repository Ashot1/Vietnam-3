import {useEffect} from "react";
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
import MarksList from "./components/MarksList/MarksList";
import TodoList from "./components/TodoList/TodoList";
import Mark from "./components/MarksList/Mark/Mark";

export default function Routing({ChangeCreateModal}) {
	
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
						<Route path={'/'} element={
							<StartPage>
								<Slider/>
								<Startmenu/>
							</StartPage>
						}/>
						<Route path={'/Calculator'} element={<CalculatorPage/>}/>
						<Route path={'/Console'} element={<ConsolePage/>}/>
						<Route path={'/Download'} element={<DownloadPage/>}/>
						<Route path={'/SocialRatingMiner'} element={<SRMPage/>}/>
						<Route path={'/Todo'} element={<TodoPage></TodoPage>}>
							<Route path={'Marks'} element={<MarksList ChangeCreateModal={ChangeCreateModal}/>}/>
							<Route path={'Marks/:MarkId'} element={<Mark/>}/>
							<Route path={'Todos'} element={<TodoList/>}/>
						</Route>
						<Route path={'*'} element={<NotFoundedPage/>}/>
					</Routes>
				</div>
			</CSSTransition>
		</TransitionGroup>
	);
}

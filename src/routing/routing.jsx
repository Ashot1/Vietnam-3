import {useEffect} from "react";
import TodoPage from "../pages/todo/todoPage";
import {Route, Routes, useLocation} from "react-router-dom";
import MarksList from "../components/MarksList/MarksList";
import TodoList from "../components/TodoList/TodoList";
import Mark from "../components/MarksList/Mark/Mark";
import {routes} from "./routes";
import {AnimatePresence} from "framer-motion"


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
						: location.pathname === '/Todo/Marks' || location.pathname === '/Todo/Todos'
							? 'V-Todo/Marks'
							: 'Vietnam 3'
		
	}, [location.pathname])
	
	return (
		<AnimatePresence initial={false} mode="wait">
			<Routes>
				{routes.map((route) => {
					return <Route key={route.path} path={route.path} element={route.component}/>
				})}
				<Route path={'/Todo'} element={<TodoPage/>}>
					<Route path={'Marks'} element={<MarksList ChangeCreateModal={ChangeCreateModal}/>}/>
					<Route path={'Marks/:MarkId'} element={<Mark/>}/>
					<Route path={'Todos'} element={<TodoList/>}/>
				</Route>
			</Routes>
		</AnimatePresence>
	);
}

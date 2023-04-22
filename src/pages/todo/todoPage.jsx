import styles from "./todo.module.css";
import {Link, Navigate, Outlet, useLocation, useMatch} from "react-router-dom";
import MarkDataProvider from "../../provider/MarkDataContext"
import TodoDataProvider from "../../provider/TodoDataContext"
import PrivatePage from "../../hoc/PrivatePage";
import AnimatedMain from "../../components/AnimatedMain/AnimatedMain";


export default function TodoPage({ChangeCreateModal}) {
	const location = useLocation()
	
	if (location.pathname === '/Todo') return <Navigate replace to="/Todo/Marks"/>
	
	return (
		<AnimatedMain mainstyles={styles.main}>
			<div className={styles.content}>
				<Menu/>
				<PrivatePage>
					<MarkDataProvider>
						<TodoDataProvider>
							<Outlet/>
						</TodoDataProvider>
					</MarkDataProvider>
				</PrivatePage>
			</div>
		</AnimatedMain>
	);
}


function Menu() {
	
	const match1 = useMatch({
		path: `/Todo/Marks`,
		end: false
	})
	
	const match2 = useMatch({
		path: `/Todo/Todos`,
		end: false
	})
	
	return (
		<span className={styles.Menu}>
			<Link to={"/Todo/Marks"}
			      className={match1 ? styles.Active : styles.UnActive}
			>Заметки</Link>
			<Link to={"/Todo/Todos"}
			      className={match2 ? styles.Active : styles.UnActive}
			>Список Задач</Link>
		</span>
	)
}

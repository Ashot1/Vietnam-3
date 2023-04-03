import styles from "./todo.module.css";
import {Link, Navigate, Outlet, useLocation, useMatch} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../provider/AuthContext";
import NeedAccountMessage from "../../components/NeedAccountMessage/NeedAccountMessage";
import DataProvider from "../../provider/DataContext"

export default function TodoPage({ChangeCreateModal}) {
	const location = useLocation()
	const User = useContext(AuthContext)
	
	if (location.pathname === '/Todo') return <Navigate replace to="/Todo/Marks"/>
	
	return (
		<main className={styles.main}>
			<div className={styles.content}>
				<Menu/>
				{User ? <DataProvider User={User}>
					<Outlet/>
				</DataProvider> : <NeedAccountMessage/>}
			</div>
		</main>
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

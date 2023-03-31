import styles from "./todo.module.css";
import {Link, Outlet, useLocation} from "react-router-dom";

export default function TodoPage(props) {
	return (
		<main className={styles.main}>
			<div className={styles.content}>
				<Menu/>
				<Outlet/>
			</div>
		</main>
	);
}


function Menu() {
	const location = useLocation()
	
	return (
		<span className={styles.Menu}>
					<Link to={"/Todo/Marks"}
					      className={location.pathname === '/Todo/Marks' ? styles.Active : styles.UnActive}
					>Заметки</Link>
					<Link to={"/Todo/Todos"}
					      className={location.pathname === '/Todo/Todos' ? styles.Active : styles.UnActive}
					>Список Задач</Link>
		</span>
	)
}

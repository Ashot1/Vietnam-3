import styles from "./todo.module.css";
import {useState} from "react";

export default function TodoPage(props) {
	const [ModalState, setModalState] = useState(false)
	const [Todos, setTodos] = useState([
		{id: 1, title: "Huy", content: "HUy2", isActive: false},
		{id: 2, title: "Huy", content: "HUy3", isActive: false}
	])
	
	//
	// return (
	// 	<main className={styles.main}>
	// 		{props.children}
	// 		<button onClick={setModalState(!ModalState)}>+</button>
	// 		<div className={styles.content}>
	// 			<Todolist todo={Todos}/>
	// 		</div>
	// 	</main>
	// );
}

function Todolist(props) {
	const List = props.todo
	
	return (
		<ul className={styles.TodoUl}>
			{List.map(todo => {
				return (
					<li key={todo.id} className={styles.TodoLi}>
						<h1>{todo.title}</h1>
						<p>{todo.content}</p>
					</li>)
			})}
		</ul>
	)
}


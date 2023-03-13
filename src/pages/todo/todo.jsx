import styles from "./todo.module.css";
import {useState} from "react";

export default function TodoPage(props) {
	const [ModalState, setModalState] = useState(false)
	const [Todos, setTodos] = useState([
		{
			id: 1,
			title: "Huy",
			content: "\n" +
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cumque debitis dolorem eos fugiat laudantium maxime\n" +
				"\todio quas quia, quis ratione ullam veniam voluptas. Doloremque quo repellat similique soluta veritatis!\n" +
				"Dolorem ea illo officia pariatur quam vero voluptatibus. A accusamus ad atque consectetur consequuntur dolorem\n" +
				"\texpedita nam recusandae sit totam! Dolore ex iure porro praesentium soluta. Cum eligendi mollitia recusandae.",
			isActive: false
		},
		{
			id: 2,
			title: "Huy",
			content: "\n" +
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cumque debitis dolorem eos fugiat laudantium maxime\n" +
				"\todio quas quia, quis ratione ullam veniam voluptas. Doloremque quo repellat similique soluta veritatis!\n" +
				"Dolorem ea illo officia pariatur quam vero voluptatibus. A accusamus ad atque consectetur consequuntur dolorem\n" +
				"\texpedita nam recusandae sit totam! Dolore ex iure porro praesentium soluta. Cum eligendi mollitia recusandae.",
			isActive: false
		},
		{
			id: 3,
			title: "Huy2",
			content: "\n" +
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cumque debitis dolorem eos fugiat laudantium maxime\n" +
				"\todio quas quia, quis ratione ullam veniam voluptas. Doloremque quo repellat similique soluta veritatis!\n" +
				"Dolorem ea illo officia pariatur quam vero voluptatibus. A accusamus ad atque consectetur consequuntur dolorem\n" +
				"\texpedita nam recusandae sit totam! Dolore ex iure porro praesentium soluta. Cum eligendi mollitia recusandae.",
			isActive: false
		},
		{
			id: 4,
			title: "Huy3",
			content: "\n" +
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cumque debitis dolorem eos fugiat laudantium maxime\n" +
				"\todio quas quia, quis ratione ullam veniam voluptas. Doloremque quo repellat similique soluta veritatis!\n" +
				"Dolorem ea illo officia pariatur quam vero voluptatibus. A accusamus ad atque consectetur consequuntur dolorem\n" +
				"\texpedita nam recusandae sit totam! Dolore ex iure porro praesentium soluta. Cum eligendi mollitia recusandae.",
			isActive: false
		}
	])
	
	return (
		<main className={styles.main}>
			<div className={styles.content}>
				<Todolist todo={Todos}/>
			</div>
		</main>
	);
}

function Todolist(props) {
	const List = props.todo
	
	
	if (List.length === 0) {
		return (
			<p className={styles.CleanList}>Список пуст</p>
		)
	}
	
	const HoverEffect = (e) => {
		const x = e.clientX - e.target.offsetLeft,
			y = e.clientY - e.target.offsetTop
		
		e.target.style.setProperty("--mouse-x", `${x}px`)
		e.target.style.setProperty("--mouse-y", `${y}px`)
	}
	
	return (
		<ul className={styles.TodoUl}>
			{List.map(todo => {
				return (
					<li key={todo.id} className={styles.TodoLi} onMouseMove={HoverEffect}>
						<h1>{todo.title}</h1>
						<p>{todo.content}</p>
					</li>
				)
			})}
		</ul>
	)
}

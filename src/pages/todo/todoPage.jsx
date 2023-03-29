import styles from "./todo.module.css";
import {useState} from "react";
import MarksList from "../../components/MarksList/MarksList";
import TodoList from "../../components/TodoList/TodoList";

export default function TodoPage(props) {
	const [Content, setContent] = useState('Marks')
	const [Marks, setMarks] = useState([
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
			id: 12,
			title: "Huy2",
			content: "\n" +
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cumque debitis dolorem eos fugiat laudantium maxime\n" +
				"\todio quas quia, quis ratione ullam veniam voluptas. Doloremque quo repellat similique soluta veritatis!\n" +
				"Dolorem ea illo officia pariatur quam vero voluptatibus. A accusamus ad atque consectetur consequuntur dolorem\n" +
				"\texpedita nam recusandae sit totam! Dolore ex iure porro praesentium soluta. Cum eligendi mollitia recusandae.",
			isActive: false
		},
		{
			id: 13,
			title: "Huy3",
			content: "\n" +
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cumque debitis dolorem eos fugiat laudantium maxime\n" +
				"\todio quas quia, quis ratione ullam veniam voluptas. Doloremque quo repellat similique soluta veritatis!\n" +
				"Dolorem ea illo officia pariatur quam vero voluptatibus. A accusamus ad atque consectetur consequuntur dolorem\n" +
				"\texpedita nam recusandae sit totam! Dolore ex iure porro praesentium soluta. Cum eligendi mollitia recusandae.",
			isActive: false
		},
		{
			id: 15,
			title: "Huy",
			content: "\n" +
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cumque debitis dolorem eos fugiat laudantium maxime\n" +
				"\todio quas quia, quis ratione ullam veniam voluptas. Doloremque quo repellat similique soluta veritatis!\n" +
				"Dolorem ea illo officia pariatur quam vero voluptatibus. A accusamus ad atque consectetur consequuntur dolorem\n" +
				"\texpedita nam recusandae sit totam! Dolore ex iure porro praesentium soluta. Cum eligendi mollitia recusandae.",
			isActive: false
		},
	])
	const [Todos, setTodos] = useState([
		{
			id: 1,
			content:
				"Negri pidorasi",
			isChecked: false
		},
	])
	
	const SetMarks = () => {
		setContent('Marks')
	}
	
	const SetTodos = () => {
		setContent('Todos')
	}
	
	return (
		<main className={styles.main}>
			<div className={styles.content}>
				<Menu Content={Content} SetMarks={SetMarks} SetTodos={SetTodos}/>
				{Content === 'Marks' ? <MarksList marks={Marks}/> : <TodoList todo={Todos}/>}
			</div>
		</main>
	);
}


function Menu({Content, SetMarks, SetTodos}) {
	return (
		<span className={styles.Menu}>
					<button
						className={Content === 'Marks' ? `${styles.Active}` : styles.UnActive}
						onClick={SetMarks}
					>Заметки</button>
					<button
						className={Content === 'Todos' ? styles.Active : styles.UnActive}
						onClick={SetTodos}
					>Список Задач</button>
		</span>
	)
}

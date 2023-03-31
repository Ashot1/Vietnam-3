import styles from "./MarksList.module.css";
import {memo, useState} from "react";

export default memo(function MarksList(props) {
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
	
	const HoverEffect = (e) => {
		const x = e.clientX - e.target.offsetLeft,
			y = e.clientY - e.target.offsetTop
		
		e.target.style.setProperty("--mouse-x", `${x}px`)
		e.target.style.setProperty("--mouse-y", `${y}px`)
	}
	
	return (
		<ul className={styles.TodoUl}>
			{Marks.map(todo => {
				return (
					<li key={todo.id} className={styles.TodoLi} onMouseMove={HoverEffect}>
						<h1>{todo.title}</h1>
						<p>{todo.content}</p>
					</li>
				)
			})}
			<li key={0} className={styles.TodoLi} onMouseMove={HoverEffect}>
				<span>➕</span>
			</li>
		</ul>
	)
})

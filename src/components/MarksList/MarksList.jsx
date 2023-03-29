import styles from "./MarksList.module.css";
import {memo} from "react";

export default memo(function MarksList(props) {
	const List = props.marks
	
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
			<li key={0} className={styles.TodoLi} onMouseMove={HoverEffect}>
				<span>➕</span>
			</li>
		</ul>
	)
})

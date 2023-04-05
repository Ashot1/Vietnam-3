import styles from './TodoList.module.css'
import {memo, useState} from "react";
import {motion} from "framer-motion"


export default memo(function TodoList(props) {
		const [TodoList, setTodoList] = useState([
				{id: '1', content: 'Lorem ipsum dolor sit amet'}
			]),
			MatchQuery = window.matchMedia("(max-width: 768px)").matches
		
		return (
			<motion.ul className={styles.TodoUl}
			           initial={{x: MatchQuery ? 0 : -100, opacity: 0, y: MatchQuery ? -100 : 0}}
			           animate={{x: 0, opacity: 1, y: 0}}>
				<h2>В разработке</h2>
				{/*{TodoList.map(todo => {*/}
				{/*	return (*/}
				{/*		<li key={todo.id} className={styles.TodoLi}>*/}
				{/*			<input type="checkbox"/>*/}
				{/*			<p>{todo.content}</p>*/}
				{/*		</li>*/}
				{/*	)*/}
				{/*})}*/}
			</motion.ul>
		);
	}
)
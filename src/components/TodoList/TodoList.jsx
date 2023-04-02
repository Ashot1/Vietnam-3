import styles from './TodoList.module.css'
import {memo, useState} from "react";

export default memo(function TodoList(props) {
		const [TodoList, setTodoList] = useState([
			{id: '1', content: 'Lorem ipsum dolor sit amet'}
		])
		
		return (
			<ul className={styles.TodoUl}>
				<h2>В разработке</h2>
				{/*{TodoList.map(todo => {*/}
				{/*	return (*/}
				{/*		<li key={todo.id} className={styles.TodoLi}>*/}
				{/*			<input type="checkbox"/>*/}
				{/*			<p>{todo.content}</p>*/}
				{/*		</li>*/}
				{/*	)*/}
				{/*})}*/}
			</ul>
		);
	}
)
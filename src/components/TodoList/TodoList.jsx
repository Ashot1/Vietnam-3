import styles from './TodoList.module.css'
import {memo} from "react";

export default memo(function TodoList(props) {
		const TodoList = props.todo
		
		return (
			<ul className={styles.TodoUl}>
				{TodoList.map(todo => {
					return (
						<li key={todo.id} className={styles.TodoLi}>
							<input type="checkbox"/>
							<p>{todo.content}</p>
						</li>
					)
				})}
			</ul>
		);
	}
)
import styles from './Todos.module.css'
import {memo} from "react";
import {Reorder} from "framer-motion";
import LoadingData from "../../../hoc/LoadingData";
import TodoTemplate from "../TodoTemplate/TodoTemplate";

export default memo(function Todos({Todo, setTodo, loading}) {
	return (
		<Reorder.Group as="ul" axys="y" values={Todo} className={styles.TodoUl} onReorder={setTodo}>
			<LoadingData loading={loading}>
				{Todo.map(item => {
					const ChangeCheckedState = () => {
						const NewArr = [...Todo]
						const ChangedItem = NewArr.find(todo => todo.id === item.id)
						ChangedItem.isChecked = !ChangedItem.isChecked
						setTodo(NewArr)
					}
					
					return <TodoTemplate key={item.id} item={item}
					                     RemoveTodo={() => setTodo(Todo.filter(todo => todo.id !== item.id))}
					                     ChangeCheckedState={ChangeCheckedState}/>
				})}
			</LoadingData>
		</Reorder.Group>
	)
})

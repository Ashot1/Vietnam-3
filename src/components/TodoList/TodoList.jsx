import styles from './TodoList.module.css'
import {memo, useContext, useEffect, useRef, useState} from "react";
import {motion, Reorder} from "framer-motion"
import UseAddCollection from "../../hooks/useAddCollection";
import {AuthContext} from "../../provider/AuthContext";
import LoadingData from "../../hoc/LoadingData";
import {TodoDataContext} from "../../provider/TodoDataContext";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";


export default memo(function TodoList(props) {
		const [TodoArr, loading, error] = useContext(TodoDataContext),
			[Todo, setTodo] = useState([]),
			MatchQuery = window.matchMedia("(max-width: 768px)").matches
		
		useEffect(() => {
			if (loading) return
			
			setTodo(TodoArr)
		}, [TodoArr])
		
		return (
			<motion.div className={styles.wrapper}
			            initial={{x: MatchQuery ? 0 : -100, opacity: 0, y: MatchQuery ? -100 : 0}}
			            animate={{x: 0, opacity: 1, y: 0}}
			>
				<TodoAddPanel/>
				<Todos Todo={Todo} setTodo={setTodo} loading={loading}/>
			</motion.div>
		);
	}
)

const TodoAddPanel = memo(function TodoAddPanel() {
	const InputRef = useRef(),
		User = useContext(AuthContext)
	
	const CreateTodo = async (e) => {
		let Content = InputRef.current.value
		if (Content.length <= 0) return
		try {
			await UseAddCollection([Content, "", "Todos", User])
			InputRef.current.value = ''
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}
	
	return (
		<section className={styles.addPanel}>
			<input type="text" placeholder="Введи что-нибудь" ref={InputRef} onKeyUp={e => {
				if (e.key === 'Enter') {
					CreateTodo()
				}
			}}/>
			<button onClick={CreateTodo}>Добавить</button>
		</section>
	)
})

const Todos = memo(function Todos({Todo, setTodo, loading}) {
	return (
		<Reorder.Group as="ul" axys="y" values={Todo} className={styles.TodoUl} onReorder={setTodo}>
			<LoadingData loading={loading}>
				{Todo.map(item => (
					<TodoTemplate key={item.id} item={item}
					              RemoveTodo={() => setTodo(Todo.filter(todo => todo.id !== item.id))}/>
				))}
			</LoadingData>
		</Reorder.Group>
	)
})

const TodoTemplate = memo(function TodoTemplate({item, RemoveTodo}) {
	const [CheckedState, setCheckedState] = useState(item.isChecked)
	
	const DeleteMark = async (e) => {
		e.stopPropagation()
		
		try {
			await deleteDoc(doc(db, "Todos", item.id))
		} catch (e) {
			alert("Error " + e)
		}
	}
	
	const ChangeCheckedState = async (e) => {
		await setCheckedState(!CheckedState)
		await updateDoc(doc(db, "Todos", item.id), {isChecked: !CheckedState});
	}
	
	return (
		<Reorder.Item value={item}
		              className={styles.TodoLi}
		              whileDrag={{scale: 1.1}}
		              whileTap={{scale: 0.95}}
		              onClick={ChangeCheckedState}
		              style={{opacity: CheckedState ? 0.5 : 1}}>
			<div className={styles.checkbox}>
				<motion.span initial={{scale: 0}}
				             animate={{scale: CheckedState ? 1 : 0}}></motion.span>
			</div>
			<div className={styles.info}>
				<p style={{textDecoration: CheckedState ? 'line-through' : 'none'}}>{item.Content}</p>
				<b>{item.CreateAt}</b>
			</div>
			<button title="Удалить" className={styles.DeleteButton} onClick={DeleteMark}>
				<img src="/images/MarkList/delete.png" alt=""/>
			</button>
		</Reorder.Item>
	)
})
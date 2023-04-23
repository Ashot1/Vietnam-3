import styles from './TodoList.module.css'
import {memo, useContext, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion"
import {TodoDataContext} from "../../provider/TodoDataContext";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import Todos from "./Todos/Todos";


export default memo(function TodoList(props) {
		const [TodoArr, loading, error, snapshot] = useContext(TodoDataContext),
			[Todo, setTodo] = useState([]),
			MatchQuery = window.matchMedia("(max-width: 768px)").matches
		
		useEffect(() => {
			if (loading) return
			
			setTodo(TodoArr)
		}, [TodoArr])
		
		useEffect(() => {
			if (loading) return
			const timeout = setTimeout(() => {
				const SendData = async () => {
					try {
						let docID;
						snapshot.forEach(doc => {
							docID = doc.id
						})
						await updateDoc(doc(db, "Todos", docID), {Todo: Todo})
					} catch (e) {
						console.error("Ошибка ебаная: ", e);
					}
				}
				SendData()
			}, 1000)
			
			return () => clearInterval(timeout)
		}, [Todo])
		
		return (
			<motion.div className={styles.wrapper}
			            initial={{x: MatchQuery ? 0 : -100, opacity: 0, y: MatchQuery ? -100 : 0}}
			            animate={{x: 0, opacity: 1, y: 0}}
			>
				<TodoAddPanel Todo={Todo} setTodo={setTodo} TodoArr={TodoArr}/>
				<Todos Todo={Todo} setTodo={setTodo} loading={loading}/>
			</motion.div>
		);
	}
)

const TodoAddPanel = memo(function TodoAddPanel({Todo, setTodo, TodoArr}) {
	const InputRef = useRef()
	
	const CreateTodo = async (e) => {
		let Content = InputRef.current.value
		if (Content.length <= 0) return
		const options = ({
				day: 'numeric',
				month: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			}),
			date = new Date().toLocaleString('ru', options);
		setTodo(prev => [...prev, {Content: Content, CreatedAt: date, isChecked: false, id: Todo.length}])
		InputRef.current.value = ''
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

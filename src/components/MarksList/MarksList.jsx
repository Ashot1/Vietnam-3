import styles from "./MarksList.module.css";
import {memo, useContext, useEffect, useState} from "react";
import {DataContext} from "../../provider/DataContext";
import {Link} from "react-router-dom";
import Loading from "../Loading/Loading";


export default memo(function MarksList({ChangeCreateModal}) {
	const [Marks, setMarks] = useState([])
	const [MarkArr, loading, error] = useContext(DataContext)
	
	
	useEffect(() => {
		if (loading) return
		
		setMarks(MarkArr)
	}, [MarkArr])
	
	const HoverEffect = (e) => {
		const x = e.clientX - e.target.offsetLeft,
			y = e.clientY - e.target.offsetTop
		
		e.target.style.setProperty("--mouse-x", `${x}px`)
		e.target.style.setProperty("--mouse-y", `${y}px`)
	}
	
	return (
		<ul className={styles.TodoUl}>
			{loading ? <Loading/> : Marks.map(todo => {
				let date = todo.CreateAt.split(',')[0];
				return (
					<Link to={`/Todo/Marks/${todo.id}`} key={todo.id}
					      className={styles.TodoLi}
					      onMouseMove={HoverEffect}>
						<h1>{todo.title}</h1>
						<p>{todo.Content}</p>
						<b>{date}</b>
					</Link>
				)
			})}
			{loading ? null : <PlusButton HoverEffect={HoverEffect} ChangeCreateModal={ChangeCreateModal}/>}
		</ul>
	)
})

const PlusButton = memo(function PlusButton({HoverEffect, ChangeCreateModal}) {
	return (
		<li key={0}
		    className={styles.TodoLi}
		    onMouseMove={HoverEffect}
		    onClick={ChangeCreateModal}>
			<span>➕</span>
		</li>
	)
})
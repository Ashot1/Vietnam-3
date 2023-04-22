import styles from "./MarksList.module.css";
import {memo, useContext, useEffect, useState} from "react";
import {MarkDataContext} from "../../provider/MarkDataContext";
import {Link, useNavigate} from "react-router-dom";
import LoadingData from "../../hoc/LoadingData";
import {motion, useAnimate} from "framer-motion"
import Selector from "../UI/Selector/Selector";
import UseRelativeTime from "../../hooks/useRelativeTime";


export default memo(function MarksList({ChangeCreateModal}) {
	const [Marks, setMarks] = useState([]),
		[MarkArr, loading, error, setSortParams, SortArrayValues] = useContext(MarkDataContext),
		MatchQuery = window.matchMedia("(max-width: 768px)").matches
	
	useEffect(() => {
		if (loading) return
		
		setMarks(MarkArr)
	}, [MarkArr])
	
	const HoverEffect = (e) => {
		const x = e.clientX - e.target.getBoundingClientRect().left,
			y = e.clientY - e.target.getBoundingClientRect().top
		
		e.target.style.setProperty("--mouse-x", `${x}px`)
		e.target.style.setProperty("--mouse-y", `${y}px`)
	}
	
	return (
		<motion.div className={styles.Wrapper}
		            initial={{x: MatchQuery ? 0 : -100, opacity: 0, y: MatchQuery ? -100 : 0}}
		            animate={{x: 0, opacity: 1, y: 0}}>
			<section className={styles.options}>
				<Selector options={SortArrayValues} onchange={value => setSortParams(value)}/>
			</section>
			<section className={styles.TodoUl}>
				<LoadingData loading={loading}>
					<PlusButton HoverEffect={HoverEffect} ChangeCreateModal={ChangeCreateModal}/>
					{Marks.map(todo => {
						let date = UseRelativeTime(todo.CreateAt, 'ru')
						return (
							<MarkTemplate key={todo.id} todo={todo} HoverEffect={HoverEffect} date={date}/>
						)
					})}
				</LoadingData>
			</section>
		</motion.div>
	)
})

const PlusButton = memo(function PlusButton({HoverEffect, ChangeCreateModal}) {
	return (
		<button key={0}
		        className={styles.TodoLi}
		        onMouseMove={HoverEffect}
		        onClick={ChangeCreateModal}>
			<span>➕</span>
		</button>
	)
})

function MarkTemplate({todo, HoverEffect, date}) {
	const navigate = useNavigate()
	const [scope, animate] = useAnimate()
	
	const AnimateClick = () => {
		animate('article', {scale: 2, zIndex: 3, opacity: 0})
	}
	
	return (
		<Link to='' style={{textDecoration: 'none'}} ref={scope}
		      onClick={() => setTimeout(() => navigate(`/Todo/Marks/${todo.id}`), 100)}>
			<motion.article className={styles.TodoLi}
			                onMouseMove={HoverEffect}
			                initial={{opacity: 0}}
			                animate={{
				                opacity: 1,
				                transition: {
					                duration: .4,
					                delay: .1
				                }
			                }}
			                onClick={AnimateClick}>
				<h1>{todo.title}</h1>
				<p>{todo.Content}</p>
				<b>{date}</b>
			</motion.article>
		</Link>
	)
}
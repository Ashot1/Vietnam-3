import styles from './TodoTemplate.module.css'
import {memo} from "react";
import {motion, Reorder} from "framer-motion";

export default memo(function TodoTemplate({item, RemoveTodo, ChangeCheckedState}) {
	const CheckedState = item.isChecked
	
	const DeleteMark = async (e) => {
		e.stopPropagation()
		RemoveTodo()
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
				<b>{item.CreatedAt}</b>
			</div>
			<button title="Удалить" className={styles.DeleteButton}
			        onClick={DeleteMark}
			>
				<img src="/images/MarkList/delete.png" alt=""/>
			</button>
		</Reorder.Item>
	)
})

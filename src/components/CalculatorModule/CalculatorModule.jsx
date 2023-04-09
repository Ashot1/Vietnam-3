import styles from './CalculatorModule.module.css'
import Calculator from "../calculator/calculator";
import {memo, useRef, useState} from "react";
import Background from "../UI/Background/Background";
import {motion} from 'framer-motion'

export default function CalculatorModule(props) {
	
	const [History, setHistory] = useState([]),
		[ChangeHistory, setChangeHistory] = useState(''),
		HistoryList = useRef(),
		MatchQuery = window.matchMedia("(max-width: 768px)").matches
	
	
	const HistoryMove = (value, e) => {
		setHistory([value, ...History])
		HistoryList.current.style.setProperty("--Counter", `${History.length + 2}`)
	}
	
	
	return (
		<motion.section className={styles.CalcBody}
		                initial={{x: MatchQuery ? 0 : -100, opacity: 0, y: MatchQuery ? -100 : 0}}
		                animate={{x: 0, opacity: 1, y: 0}}>
			<Calculator History={HistoryMove} ChangedHistory={ChangeHistory}/>
			<List uref={HistoryList} setHistory={setHistory}>
				{History.map((obj, index) => {
					return (
						<li key={index} onClick={() => {
							setChangeHistory(obj.nums)
						}}>
							{obj.nums} = {obj.res}
						</li>
					)
				})}
			</List>
		</motion.section>
	);
}


const List = memo(function List({children, uref, setHistory}) {
	return (
		<div className={styles.list} ref={uref}>
			<h1>History</h1>
			<ul>
				{children}
			</ul>
			<button className={styles.ClearButton} onClick={() => setHistory([])}>Очистить историю</button>
			<Background/>
		</div>
	)
})

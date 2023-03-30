import styles from './calculatorPage.module.css'
import Calculator from "../../components/calculator/calculator";
import {memo, useState} from "react";
import Background from "../../components/UI/Background/Background";

export default memo(function CalculatorPage(props) {
	
	const [History, setHistory] = useState([])
	const [ChangeHistory, setChangeHistory] = useState('')
	
	const HistoryMove = (value) => {
		setHistory([...History, value])
	}
	
	return (
		<main className={styles.main}>
			<div className={styles.content}>
				<Calculator History={HistoryMove} ChangedHistory={ChangeHistory}/>
				<List>
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
			</div>
		</main>
	)
})

const List = memo(function List({children}) {
	return (
		<div className={styles.list}>
			<h1>History</h1>
			<ul>
				{children}
			</ul>
			<Background/>
		</div>
	)
})
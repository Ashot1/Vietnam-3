import styles from './CalculatorButton.module.css'
import {useState} from "react";

export default function CalculatorButton({children, ChangeValue, changeNumber}) {
	
	const [Value, SetValue] = useState(children)
	
	return (
		<button className={styles.calcBtn} onClick={!isNaN(parseInt(Value)) ? changeNumber : ChangeValue}>
			{Value}
		</button>
	);
}

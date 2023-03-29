import styles from './CalculatorButton.module.css'
import {memo} from "react";

export default memo(function CalculatorButton({children, is00, ChangeValue}) {
	
	return (
		<button className={styles.calcBtn} onClick={ChangeValue}>
			{children}
		</button>
	);
})

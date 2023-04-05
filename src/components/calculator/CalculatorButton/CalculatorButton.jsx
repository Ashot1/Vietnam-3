import styles from './CalculatorButton.module.css'

export default function CalculatorButton({children, ChangeValue, changeNumber}) {
	
	return (
		<button className={styles.calcBtn} onClick={!isNaN(parseInt(children)) ? changeNumber : ChangeValue}>
			{children}
		</button>
	);
}

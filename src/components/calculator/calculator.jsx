import styles from './calculator.module.css'
import CalculatorButton from "../UI/CalculatorButton/CalculatorButton";
import Background from "../UI/Background/Background";
import {useEffect, useState} from "react";


export default function Calculator({History, ChangedHistory}) {
	
	const [CalcInput, setCalcInput] = useState('')
	const [InputFZ, setInputFZ] = useState(1)
	const [Result, setResult] = useState('0')
	const ops = ['C', '*', '/', '«', '-', '+', '.', '(', ')']
	
	const buttons = [
		ops.slice(0, 4),
		['7', '8', '9', ops[4]],
		['4', '5', '6', ops[5]],
		['1', '2', '3', '='],
		[ops[7], '0', ops[8], ops[6]]
	]
	
	const GetResult = (value) => {
		let negr = value.split(/(\(|\)|\+|\-|\*|\/)/)
		let huy = negr.map((inp) => {
			return parseFloat(inp)
		})
		for (let i = 0; i < huy.length; i++) {
			if (!huy[i]) {
				huy[i] = negr[i]
			}
		}
		
		for (let i = 0; i < huy.length; i++) {
			if (huy[i] === '(' && !ops.includes(huy[i - 1])) {
				huy.splice(i, 0, '*');
			}
			if (huy[i] === ')' && typeof huy[i + 1] == 'number') {
				huy.splice(i + 1, 0, '*');
			}
		}
		
		if (huy.indexOf('=') > 0) huy[huy.indexOf('=')] = ''
		return eval(huy.join('')).toString()
	}
	
	const changeInput = () => {
		setInputFZ(CalcInput.length > 16 ? CalcInput.length / 16 : 1)
	}
	
	const resultBtn = async () => {
		let result = GetResult(CalcInput)
		await setResult(result)
		await History({nums: CalcInput, res: result})
		await setCalcInput(result)
		await changeInput()
	}
	
	const change = (value) => {
		const btnData = value.target.innerText
		if (btnData === '(') {
			setCalcInput(CalcInput + btnData)
			changeInput()
		}
		if (btnData === ')') {
			let Condition = (!ops.includes(CalcInput.slice(-1)) && CalcInput != '') || CalcInput.slice(-1) === ')'
			if (!Condition) return
			setCalcInput(CalcInput + btnData)
			setResult(GetResult(CalcInput))
			changeInput()
		}
		if (parseInt(btnData) >= 0 || parseInt(btnData) <= 0) {
			setCalcInput(CalcInput + btnData)
			changeInput()
		}
		if (ops.includes(btnData) && btnData !== 'C' && btnData !== '«' && btnData !== '(' && btnData !== ')' && btnData !== '=') {
			let Condition = (!ops.includes(CalcInput.slice(-1)) && CalcInput != '') || CalcInput.slice(-1) === ')'
			if (!Condition) return
			if (CalcInput.slice(-1) === ')' && btnData === ')') return
			setCalcInput(CalcInput + btnData)
			changeInput()
		}
		if (btnData === 'C') {
			setCalcInput('')
			setResult('0')
			changeInput()
		}
		if (btnData === '«') {
			setCalcInput(CalcInput.slice(0, -1))
			changeInput()
		}
		if (btnData === '=' && (!ops.includes(CalcInput.slice(-1)) || CalcInput.slice(-1) === ')')) {
			resultBtn()
		}
		if (!ops.includes(btnData)) {
			setResult(GetResult(CalcInput + btnData))
		}
	}
	
	useEffect(() => {
		setCalcInput(ChangedHistory)
		changeInput()
	}, [ChangedHistory])
	
	
	return (
		<div className={styles.Calculator}>
			<div className={styles.Display}>
				<span>( {Result} )</span>
				<input type="text" value={CalcInput}
				       onChange={(e) => {
					       setCalcInput(e.target.value)
					       changeInput()
				       }}
				       style={{fontSize: `${InputFZ < 2 ? 38 / InputFZ : 40 / 2}px`}}
				       placeholder="0"
				       inputMode="numeric"
				/>
			</div>
			<div className={styles.buttons}>
				{buttons.flat().map((button, index) => {
					return (
						<CalculatorButton key={index} ChangeValue={change}>
							{button}
						</CalculatorButton>
					)
				})}
				<Background/>
			</div>
		</div>
	);
}



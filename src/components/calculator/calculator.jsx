import styles from './calculator.module.css'
import CalculatorButton from "../UI/CalculatorButton/CalculatorButton";
import Background from "../UI/Background/Background";
import {memo, useCallback, useEffect, useState} from "react";


export default function Calculator({History, ChangedHistory}) {
	
	const [Calculator, SetCalculator] = useState('')
	const [Result, setResult] = useState('0')
	const [InputFZ, setInputFZ] = useState(1)
	const ops = ['C', '*', '/', '«', '-', '+', '.', '(', ')']
	
	const changeInput = () => {
		setInputFZ(Calculator.length > 16 ? Calculator.length / 16 : 1)
	}
	
	useEffect(() => {
		changeInput()
	}, [Calculator])
	
	const Calculate = (value) => {
		return (new Function('return (' + value + ')')());
	}
	
	const GetResult = useCallback((value) => {
		let negr = value.split(/(\(|\)|\+|\-|\*|\/)/)
		let huy = negr.map((inp) => {
			return parseFloat(inp)
		})
		for (let i = 0; i < huy.length; i++) {
			if (!huy[i]) huy[i] = negr[i]
		}
		
		for (let i = 0; i < huy.length; i++) {
			if ((huy[i] === '(' && typeof huy[i - 1] == 'number') || (huy[i] === '(' && huy[i - 2] === ')')) {
				huy.splice(i, 0, '*');
			}
			if (huy[i] === ')' && typeof huy[i + 1] == 'number') {
				huy.splice(i + 1, 0, '*');
			}
		}
		
		if (huy.indexOf('=') > 0) huy[huy.indexOf('=')] = ''
		
		return Calculate(huy.join('')).toString()
	}, [])
	
	
	const resultBtn = async () => {
		let result = GetResult(Calculator)
		await setResult(result)
		await History({nums: Calculator, res: result})
		await SetCalculator(result)
	}
	const ChangeNumber = (value) => {
		const btnData = value.target.innerText
		SetCalculator(Calculator + btnData)
		setResult(GetResult(Calculator + btnData))
	}
	
	const change = (value) => {
		const btnData = value.target.innerText
		if (btnData === '(') {
			SetCalculator(Calculator + btnData)
		}
		if (btnData === ')') {
			let Condition = (!ops.includes(Calculator.slice(-1)) && Calculator !== '') || Calculator.slice(-1) === ')'
			if (!Condition) return
			SetCalculator(Calculator + btnData)
		}
		if (ops.includes(btnData) && btnData !== 'C' && btnData !== '«' && btnData !== '(' && btnData !== ')' && btnData !== '=') {
			let Condition = (!ops.includes(Calculator.slice(-1)) && Calculator !== '') || Calculator.slice(-1) === ')'
			if (!Condition) return
			if (Calculator.slice(-1) === ')' && btnData === ')') return
			SetCalculator(Calculator + btnData)
		}
		if (btnData === 'C') {
			SetCalculator('')
			setResult('0')
		}
		if (btnData === '«') {
			SetCalculator(Calculator.slice(0, -1))
		}
		if (btnData === '=' && (!ops.includes(Calculator.slice(-1)) || Calculator.slice(-1) === ')')) {
			resultBtn()
		}
	}
	
	useEffect(() => {
		SetCalculator(ChangedHistory)
		changeInput()
	}, [ChangedHistory])
	
	const OnChangeInput = (e) => {
		SetCalculator(e.target.value)
	}
	
	return (
		<div className={styles.Calculator}>
			<div className={styles.Display}>
				<span>( {Result} )</span>
				<input type="text" value={Calculator}
				       onChange={OnChangeInput}
				       style={{fontSize: `${InputFZ < 2 ? 38 / InputFZ : 40 / 2}px`}}
				       placeholder="0"
				       inputMode="numeric"
				/>
			</div>
			<Buttons ops={ops} change={change} changeNumber={ChangeNumber}/>
		</div>
	);
}


const Buttons = memo(function Buttons({ops, change, changeNumber}) {
	
	const buttons = [
		ops.slice(0, 4),
		['7', '8', '9', ops[4]],
		['4', '5', '6', ops[5]],
		['1', '2', '3', '='],
		[ops[7], '0', ops[8], ops[6]]
	]
	
	return (
		<div className={styles.buttons}>
			{buttons.flat().map((button, index) => {
				return (
					<CalculatorButton key={index} ChangeValue={change} changeNumber={changeNumber}>
						{button}
					</CalculatorButton>
				)
			})}
			<Background/>
		</div>
	)
})

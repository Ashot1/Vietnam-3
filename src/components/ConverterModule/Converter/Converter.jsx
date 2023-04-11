import styles from './Converter.module.css'
import {AnimatePresence, motion} from 'framer-motion'
import {useEffect, useState} from "react";

export default function Converter({Valute}) {
	
	const [IsOpened, setIsOpened] = useState({first: false, second: false}),
		[FirstValue, setFirstValue] = useState({}),
		[AnotherValue, setAnotherValue] = useState({}),
		[InputState, setInputState] = useState({FirstValute: '', SecondValute: ''})
	
	useEffect(() => {
		if (Valute.length <= 0) return
		setAnotherValue({
			CharCode: Valute.USD.CharCode,
			Name: Valute.USD.Name,
			Value: Valute.USD.Value / Valute.USD.Nominal
		})
		setFirstValue({
			CharCode: "RUB",
			Name: "Российский рубль",
			Value: 1
		})
	}, [Valute])
	
	const ChangeInputFirst = (e) => {
		setInputState(
			{
				FirstValute: e.target.value,
				SecondValute: (e.target.value / AnotherValue.Value * FirstValue.Value).toFixed(2)
			}
		)
	}
	
	const ChangeInputAnother = (e) => {
		setInputState(
			{
				SecondValute: e.target.value,
				FirstValute: (e.target.value * AnotherValue.Value / FirstValue.Value).toFixed(2)
			}
		)
	}
	
	const ChangeValuteSecond = (item) => {
		setAnotherValue({
			CharCode: item.CharCode,
			Name: item.Name,
			Value: item.Value / item.Nominal
		})
		const changeOpen = (prev) => setIsOpened({...prev, second: !IsOpened.second})
		changeOpen()
	}
	
	const ChangeValuteFirst = (item) => {
		setFirstValue({
			CharCode: item.CharCode,
			Name: item.Name,
			Value: item.Value / item.Nominal
		})
		const changeOpen = (prev) => setIsOpened({...prev, first: !IsOpened.first})
		changeOpen()
	}
	
	return (
		<section className={styles.ConvertationWrapper}>
			<DisplayInfo title={FirstValue.CharCode} fullTitle={FirstValue.Name} style={styles.ConvertationBlockFirst}
			             IsOpened={IsOpened.first}
			             setIsOpened={(prev) => setIsOpened({...prev, first: !IsOpened.first})}
			             Valute={Valute}
			             setInputState={ChangeInputFirst} InputState={InputState.FirstValute}
			             ChangeValute={ChangeValuteFirst}/>
			<motion.button className={styles.ValuteReplacer}
			               whileHover={{rotate: -200}}
			               whileTap={{scale: 0.9}}
			               onClick={() => setInputState({FirstValute: '', SecondValute: ''})}>
				<img src="/images/Converter/free-icon-rotate-left-circular-arrow-interface-symbol-32418.png" alt=""/>
			</motion.button>
			<DisplayInfo title={AnotherValue.CharCode} fullTitle={AnotherValue.Name}
			             style={styles.ConvertationBlockSecond} IsOpened={IsOpened.second}
			             setIsOpened={(prev) => setIsOpened({...prev, second: !IsOpened.second})}
			             Valute={Valute}
			             setInputState={ChangeInputAnother} InputState={InputState.SecondValute}
			             ChangeValute={ChangeValuteSecond}/>
		</section>
	);
}

function DisplayInfo(props) {
	
	const {
		color,
		title,
		fullTitle,
		style,
		IsOpened,
		setIsOpened,
		Valute,
		InputState,
		setInputState,
		ChangeValute
	} = props
	
	return (
		<div className={style}>
			<div style={{color: color}} className={styles.Display}
			     onClick={() => setIsOpened(!IsOpened)}>
				<span>
					<h3>{title}</h3>
					<motion.i className={styles.Arrow}
					          initial={{rotate: IsOpened ? 180 : 0}}
					          animate={{rotate: IsOpened ? 0 : 180}}></motion.i>
				</span>
				<p>{fullTitle}</p>
			</div>
			<input type="number" placeholder="0" onChange={setInputState} value={InputState}/>
			
			<Menu IsOpened={IsOpened} Valute={Valute} ChangeValute={ChangeValute}></Menu>
		</div>
	)
}

function Menu({IsOpened, Valute, ChangeValute}) {
	const RUB = {
		CharCode: "RUB",
		Name: "Российский рубль",
		Value: 1,
		Nominal: 1
	}
	
	return (
		<AnimatePresence>
			{IsOpened && <motion.aside className={styles.Menu}
			                           initial={{opacity: 0, y: -15}}
			                           animate={{opacity: 1, y: 0}}
			                           exit={{opacity: 0, y: -10}}>
				<ul>
					<li key={RUB.CharCode}
					    onClick={() => ChangeValute(RUB)}>{RUB.CharCode} - {RUB.Name}</li>
					{Object.values(Valute).map(item => {
						return <li key={item.CharCode}
						           onClick={() => ChangeValute(item)}>{item.CharCode} - {item.Name}</li>
					})}
				</ul>
			</motion.aside>}
		</AnimatePresence>
	)
}
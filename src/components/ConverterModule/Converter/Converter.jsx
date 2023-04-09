import styles from './Converter.module.css'
import {AnimatePresence, motion} from 'framer-motion'
import {useEffect, useState} from "react";

export default function Converter({Valute}) {
	
	const [IsOpened, setIsOpened] = useState(false),
		[AnotherValue, setAnotherValue] = useState({}),
		[InputState, setInputState] = useState({Rub: '', Another: ''})
	
	useEffect(() => {
		if (Valute.length <= 0) return
		setAnotherValue({
			CharCode: Valute.USD.CharCode,
			Name: Valute.USD.Name,
			Value: Valute.USD.Value / Valute.USD.Nominal
		})
	}, [Valute])
	
	const ChangeInputRub = (e) => {
		setInputState({Rub: e.target.value, Another: (e.target.value / AnotherValue.Value).toFixed(2)})
	}
	
	const ChangeInputAnother = (e) => {
		setInputState({Another: e.target.value, Rub: (e.target.value * AnotherValue.Value).toFixed(2)})
	}
	
	const ChangeValute = (item) => {
		setAnotherValue({
			CharCode: item.CharCode,
			Name: item.Name,
			Value: item.Value / item.Nominal
		})
		setIsOpened(false)
	}
	
	return (
		<section className={styles.ConvertationWrapper}>
			<DisplayInfo title="RUB" fullTitle="Российский рубль" style={styles.ConvertationBlockFirst}
			             InputState={InputState.Rub} setInputState={ChangeInputRub}/>
			<motion.button className={styles.ValuteReplacer}
			               whileHover={{rotate: -270}}
			               whileTap={{scale: 0.9}}
			               onClick={() => setInputState({Rub: '', Another: ''})}>
				<img src="/images/Converter/free-icon-rotate-left-circular-arrow-interface-symbol-32418.png" alt=""/>
			</motion.button>
			<DisplayInfo title={AnotherValue.CharCode} fullTitle={AnotherValue.Name}
			             style={styles.ConvertationBlockSecond}
			             isChanged={true} IsOpened={IsOpened} setIsOpened={setIsOpened} Valute={Valute}
			             setInputState={ChangeInputAnother} InputState={InputState.Another}
			             ChangeValute={ChangeValute}/>
		</section>
	);
}

function DisplayInfo(props) {
	
	const {
		color,
		title,
		fullTitle,
		style,
		isChanged,
		IsOpened,
		setIsOpened,
		Valute,
		InputState,
		setInputState,
		ChangeValute
	} = props
	
	return (
		<div className={style}>
			<div style={{color: color}} className={`${styles.Display} ${isChanged ? styles.ChangeDisplay : null}`}
			     onClick={() => setIsOpened(!IsOpened)}>
				<span>
					<h3>{title}</h3>
					{isChanged && <motion.i className={styles.Arrow}
					                        initial={{rotate: IsOpened ? 180 : 0}}
					                        animate={{rotate: IsOpened ? 0 : 180}}></motion.i>}
				</span>
				<p>{fullTitle}</p>
			</div>
			<input type="number" placeholder="0" onChange={setInputState} value={InputState}/>
			
			<Menu IsOpened={IsOpened} isChanged={isChanged} Valute={Valute} ChangeValute={ChangeValute}></Menu>
		</div>
	)
}

function Menu({isChanged, IsOpened, Valute, ChangeValute}) {
	return (
		<AnimatePresence>
			{isChanged && IsOpened && <motion.aside className={styles.Menu}
			                                        initial={{opacity: 0, y: -15}}
			                                        animate={{opacity: 1, y: 0}}
			                                        exit={{opacity: 0, y: -10}}>
				<ul>
					{Object.values(Valute).map(item => {
						return <li key={item.CharCode}
						           onClick={() => ChangeValute(item)}>{item.CharCode} - {item.Name}</li>
					})}
				</ul>
			</motion.aside>}
		</AnimatePresence>
	)
}
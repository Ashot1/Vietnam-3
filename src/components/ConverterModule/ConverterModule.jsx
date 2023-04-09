import styles from './ConverterModule.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import ValueInfo from "./ValueInfo/ValueInfo";
import {motion} from 'framer-motion'
import Converter from "./Converter/Converter";


export default function ConverterModule(props) {
	
	const [Valute, setValute] = useState([]),
		MatchQuery = window.matchMedia("(max-width: 768px)").matches
	
	
	useEffect(() => {
		axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
			.then(response => {
				setValute(response.data.Valute)
			})
			.catch(error => alert("Ошибка получения данных"))
	}, [])
	
	return (
		<motion.div className={styles.ConvertBody}
		            initial={{x: MatchQuery ? 0 : -100, opacity: 0, y: MatchQuery ? -100 : 0}}
		            animate={{x: 0, opacity: 1, y: 0}}>
			<Converter Valute={Valute}/>
			<ul className={styles.Info}>
				{Object.values(Valute).map(item => {
					let New = (item.Value / item.Nominal)
					let Old = (item.Previous / item.Nominal)
					
					let percent = (((New - Old) / Old) * 100)
					return <ValueInfo key={item.CharCode} newCourse={New}
					                  oldCourse={Old}
					                  title={item.CharCode}
					                  fullTitle={item.Name}
					                  percent={percent}/>
				})}
			</ul>
			<a href="https://www.cbr-xml-daily.ru/" className={styles.APIINFO}>API для курсов ЦБ РФ</a>
		</motion.div>
	);
}

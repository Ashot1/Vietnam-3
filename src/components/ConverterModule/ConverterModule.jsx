import styles from './ConverterModule.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import ValueInfo from "./ValueInfo/ValueInfo";
import {AnimatePresence, motion} from 'framer-motion'
import Converter from "./Converter/Converter";
import FavoriteConvertList from "./FavoriteConvertList/FavoriteConvertList";


export default function ConverterModule(props) {
	
	const [Valute, setValute] = useState([]),
		MatchQuery = window.matchMedia("(max-width: 768px)").matches,
		Condition = localStorage.getItem("FavoriteList").length > 0 ? localStorage.getItem("FavoriteList").split(',') : ['USD', 'EUR'],
		[FavoriteList, setFavoriteList] = useState(Condition),
		[Search, setSearch] = useState(''),
		[InputSearch, setInputSearch] = useState('')
	
	useEffect(() => {
		let NewFavorite = [...new Set(FavoriteList)]
		localStorage.setItem("FavoriteList", NewFavorite)
	}, [FavoriteList])
	
	useEffect(() => {
		axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
			.then(response => {
				setValute(response.data.Valute)
			})
			.catch(error => alert("Ошибка получения данных"))
	}, [])
	
	const DeleteFavorite = (item) => {
		setFavoriteList(FavoriteList.filter(filterItem => filterItem !== item))
	}
	
	useEffect(() => {
		const timeout = setTimeout(() => {
			setSearch(InputSearch)
		}, 500)
		
		return () => clearInterval(timeout)
	}, [InputSearch])
	
	return (
		<motion.div className={styles.ConvertBody}
		            initial={{x: MatchQuery ? 0 : -100, opacity: 0, y: MatchQuery ? -100 : 0}}
		            animate={{x: 0, opacity: 1, y: 0}}>
			<Converter Valute={Valute}/>
			<AnimatePresence>
				<FavoriteConvertList List={FavoriteList} Valute={Valute} click={DeleteFavorite} key="FavoriteList"/>
				<div className={styles.Search}>
					<input type="text" onChange={(e) => setInputSearch(e.target.value)}
					       placeholder="Search"/>
				</div>
				<ul className={styles.Info} key="ValuteList">
					{Object.values(Valute).filter((item) => item.CharCode.concat(item.Name).includes(Search)).map(item => {
						let New = (item.Value / item.Nominal)
						let Old = (item.Previous / item.Nominal)
						
						let percent = (((New - Old) / Old) * 100)
						return <ValueInfo key={item.CharCode} newCourse={New}
						                  oldCourse={Old}
						                  title={item.CharCode}
						                  fullTitle={item.Name}
						                  percent={percent}
						                  click={() => setFavoriteList([...FavoriteList, item.CharCode])}/>
					})}
				</ul>
			</AnimatePresence>
			<a href="https://www.cbr-xml-daily.ru/" className={styles.APIINFO}>API для курсов ЦБ РФ</a>
		</motion.div>
	);
}

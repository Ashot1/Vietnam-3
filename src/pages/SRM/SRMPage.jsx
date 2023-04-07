// import styles from './SRM.module.css'

import PrivatePage from "../../hoc/PrivatePage";
import styles from "./SRM.module.css"
import AnimatedMain from "../../components/AnimatedMain/AnimatedMain";
import SrmMain from "../../components/SRMMain/SRMMain";
import SrmBonus from "../../components/SRMBonus/SRMBonus";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function SRMPage(props) {
	const [Payday, setPayday] = useState(parseInt(localStorage.getItem('Payday')) || 0),
		[Credits, setCredits] = useState(`${parseInt(localStorage.getItem('credits')) || 0}`)
	
	useEffect(() => {
		localStorage.setItem('credits', Credits)
	}, [Credits])
	
	
	useEffect(() => {
		localStorage.setItem('Payday', Payday)
	}, [Payday])
	
	
	const ChangePayday = (payday, credit) => {
		if (Credits < credit) {
			toast.error(`Ошибка! Не хватает ${credit - Credits}`)
			return
		}
		setPayday(prev => prev + payday)
		setCredits(prev => parseInt(prev) - credit)
		toast.success('Улучшение куплено!')
	}
	
	return (
		<PrivatePage>
			<AnimatedMain mainstyles={styles.main}>
				<section className={styles.content}>
					<SrmMain Payday={Payday} Credits={Credits} setCredits={setCredits} setPayday={setPayday}/>
					<SrmBonus count={10} baseCredit={1000} basePayday={1} ChangePayday={ChangePayday}/>
				</section>
			</AnimatedMain>
		</PrivatePage>
	)
}

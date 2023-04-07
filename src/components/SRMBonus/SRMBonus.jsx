import styles from './SRMBonus.module.css'
import {useEffect, useState} from "react";

export default function SrmBonus({count, baseCredit, basePayday, ChangePayday}) {
	const [BonusData, setBonusData] = useState([])
	
	useEffect(() => {
		setBonusData([])
		for (let i = 1; i <= count; i++) {
			setBonusData(prev => [...prev, {credit: baseCredit * (i * 5), payday: basePayday * (i * 5)}])
		}
	}, [])
	
	
	return (
		<section className={styles.bonuses}>
			<h2>Бонусы</h2>
			<ul className={styles.bonusList}>
				<li key="1" onClick={() => ChangePayday(1, 1000)}>
					<h1>+1</h1>
					<p>-1000</p>
				</li>
				{BonusData.map(item => (
					<li key={item.credit} onClick={() => ChangePayday(item.payday, item.credit)}>
						<h1>+{item.payday}</h1>
						<p>-{item.credit}</p>
					</li>
				))}
			</ul>
		</section>
	);
}

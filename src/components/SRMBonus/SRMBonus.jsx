import styles from './SRMBonus.module.css'
import {useEffect, useState} from "react";

export default function SrmBonus({count, baseCredit, basePayday, ChangePayday, MultipleBonus}) {
	const [BonusData, setBonusData] = useState([]),
		[BonusMultipler, setBonusMultipler] = useState([])
	
	useEffect(() => {
		setBonusMultipler([])
		CreateBonusData()
		for (let a = 1; a <= 10000; a = a * 10) {
			setBonusMultipler(prev => [...prev, {text: `x${a}`, multiple: a}])
		}
	}, [])
	
	const CreateBonusData = () => {
		setBonusData([])
		for (let i = 1; i <= count; i++) {
			setBonusData(prev => [...prev, {credit: baseCredit * (i * 5), payday: basePayday * (i * 5)}])
		}
	}
	
	useEffect(() => {
		CreateBonusData()
	}, [baseCredit, basePayday])
	return (
		<section className={styles.bonuses}>
			<h2>Бонусы</h2>
			<div className={styles.BonusMultiplerList}>
				<ul>
					{BonusMultipler.map(bonus => (
						<li key={bonus.multiple} onClick={() => MultipleBonus(bonus.multiple)}>{bonus.text}</li>
					))}
				</ul>
			</div>
			<ul className={styles.bonusList}>
				<li key="1" onClick={() => ChangePayday(basePayday, baseCredit)}>
					<h1>+{basePayday}</h1>
					<p>-{baseCredit}</p>
				</li>
				{BonusData.map(item => (
					<li key={item.credit + item.payday} onClick={() => ChangePayday(item.payday, item.credit)}>
						<h1>+{item.payday}</h1>
						<p>-{item.credit}</p>
					</li>
				))}
			</ul>
		</section>
	);
}

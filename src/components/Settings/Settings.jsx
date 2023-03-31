import styles from "./Settings.module.css";
import {memo, useEffect, useState} from "react";

export default function Settings({MenuChangeStyle}) {
	
	
	let content = [
		{src: '/images/Settings/theme.png', title: 'Theme'},
		{src: '/images/Settings/table-content.png', title: 'Mobile Menu'},
		{src: '/images/Settings/submit.png', title: 'Send Console'},
		// {src: '/images/Settings/table-content.png', title: 'Mobile Menu'}
	]
	
	return (
		<div className={styles.settings}>
			{content.map((item, index) => {
				return (
					<SettingButton key={index} item={item}/>
				)
			})}
		</div>
	)
}

const SettingButton = memo(function SettingButton({item}) {
	
	const [Active, setActive] = useState(false)
	const MobileMenu = localStorage.getItem('Mobile Menu')
	
	useEffect(() => {
		if (item.title === 'Mobile Menu' && MobileMenu === 'bottom') setActive(true)
	}, [MobileMenu])
	
	const Onclick = () => {
		setActive(!Active)
		if (item.title === 'Mobile Menu') localStorage.setItem('Mobile Menu', MobileMenu === 'upper' ? 'bottom' : 'upper')
	}
	
	return (
		<span className={Active ? `${styles.paramsActive} ${styles.params}` : styles.params}
		      onClick={Onclick}
		>
			<img src={item.src} alt="" className={Active ? styles.paramsActiveImg : styles.paramsImg}/>
			<p>{item.title}</p>
		</span>
	)
})
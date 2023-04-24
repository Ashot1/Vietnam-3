import styles from "./Settings.module.css";
import {memo, useState} from "react";
import ThemeChanger from "./ThemeChanger/ThemeChanger";

export default function Settings({MenuChangeStyle}) {
	
	let content = [
		{src: '/images/Settings/table-content.png', title: 'Mobile Menu'},
	]
	
	return (
		<div className={styles.settings}>
			<ThemeChanger/>
			{content.map((item, index) => {
				return (
					<SettingButton key={index} item={item}/>
				)
			})}
		</div>
	)
}

const SettingButton = memo(function SettingButton({item}) {
	
	const MobileMenu = localStorage.getItem('Mobile Menu'),
		[Active, setActive] = useState(item.title === 'Mobile Menu' && MobileMenu === 'bottom')
	
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
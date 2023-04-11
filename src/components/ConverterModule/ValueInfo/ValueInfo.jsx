import styles from "./ValueInfo.module.css";
import {motion} from 'framer-motion'

export default function ValueInfo({newCourse, oldCourse, title, fullTitle, percent, click}) {
	
	return (
		<motion.li className={styles.ValueInfo} onClick={click}
		           initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .5}} exit={{opacity: 0}}
		           whileTap={{opacity: 0.1}}>
			<section className={styles.ValuteInfo}>
				<div>
					<h3>{title}</h3>
					<h6>{fullTitle}</h6>
				</div>
				<span className={styles.percent} style={{color: percent > 0 ? 'green' : 'red'}}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" fill="currentColor" height="20"
					     width="20" style={{transform: percent > 0 ? null : 'rotate(180deg)'}}>
						<path
							d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"></path>
					</svg>
					{percent.toFixed(3)}%
				</span>
			</section>
			<section className={styles.Course}>
				<p className={styles.NewData}>{newCourse.toFixed(4)} ₽</p>
				<p className={styles.pastData}><b><img src="/images/Converter/left-arrow.png" alt=""/></b>
					{oldCourse.toFixed(4)} ₽
				</p>
			</section>
		</motion.li>
	)
}

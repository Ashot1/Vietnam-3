import styles from './ThemeChanger.module.css'
import {useState} from "react";
import {motion} from 'framer-motion'

export default function ThemeChanger(props) {
	
	const [theme, settheme] = useState(localStorage.getItem('darkmode'))
	
	const ChangeTheme = (dark) => {
		localStorage.setItem('darkmode', dark)
		document.documentElement.dataset.theme = dark
		settheme(dark)
	}
	
	return (
		<div className={styles.themeChanger}>
			<section>
				<p>4:20</p>
				<div className={styles.PhoneState}>
						<span className={styles.Network}>
						
						</span>
					<span className={styles.Battery}>
						
						</span>
				</div>
			</section>
			<section>
				<article className={styles.main}>
					<motion.span
						animate={{background: theme === 'off' ? 'linear-gradient(40deg, #FF0080, #FF8C00 70%)' : 'linear-gradient(40deg, #8983F7, #A3DAFB 70%)'}}
						className={styles.sun}>
						<motion.span className={styles.secondSun}
						             animate={{
							             width: theme === 'off' ? '0' : '90px',
							             height: theme === 'off' ? '0' : '90px'
						             }}></motion.span>
					</motion.span>
				</article>
				<article className={styles.bottomMenu}>
					<span>
						<motion.div animate={{x: theme === 'off' ? '0' : '120%'}}
						            className={styles.ButtonBackground}></motion.div>
						<button onClick={() => ChangeTheme('off')}>Light</button>
						<button onClick={() => ChangeTheme('on')}>Dark</button>
					</span>
				</article>
			</section>
		</div>
	);
}

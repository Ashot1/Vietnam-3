import styles from './Selector.module.css'
import {useState} from "react";
import {AnimatePresence, motion} from 'framer-motion'

export default function Selector({options, onchange}) {
	const [CurrentValue, setCurrentValue] = useState(options[1].title)
	const [IsOpened, setIsOpened] = useState(false)
	
	return (
		<nav className={styles.selector} onClick={() => setIsOpened(!IsOpened)}>
			<motion.p whileTap={{scale: 0.95}}>{CurrentValue}
				<motion.i className={styles.Arrow}
				          initial={{rotate: IsOpened ? 180 : 0}}
				          animate={{rotate: IsOpened ? 0 : 180}}></motion.i>
			</motion.p>
			<AnimatePresence>
				{IsOpened && <motion.article initial={{opacity: 0, y: -15}}
				                             animate={{opacity: 1, y: 0}}
				                             exit={{opacity: 0, y: -10}}>
					{options.map(item => (
						<motion.button onClick={event => {
							onchange(event.target.value)
							setCurrentValue(item.title)
						}} key={item.value}
						               value={item.value} whileHover={{x: 10}}>{item.title}</motion.button>
					))}
				</motion.article>}
			</AnimatePresence>
		</nav>
	);
}

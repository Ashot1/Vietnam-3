import styles from './modalWindow.module.css'
import {motion} from 'framer-motion'

export default function ModalWindow({CloseSetting, children, classModal}) {
	
	return (
		<div
			className={styles.modalWindow}
			onClick={CloseSetting}>
			<motion.div
				className={`${styles.content} ${classModal}`}
				onClick={(e) => e.stopPropagation()}
				initial={{scale: 0.5}}
				animate={{scale: 1}}
				exit={{scale: 0.5, opacity: 0}}
			>
				<div className={styles.body}>
					{children}
				</div>
				<div className={styles.btnPos} onClick={CloseSetting}>
					<p>Закрыть</p>
				</div>
			</motion.div>
		</div>
	);
}

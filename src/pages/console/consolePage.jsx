import {motion} from 'framer-motion'
import styles from "./console.module.css";
import AnimatedMain from "../../components/AnimatedMain/AnimatedMain";

export default function ConsolePage() {
	return (
		<AnimatedMain mainstyles={styles.main}>
			<motion.h2 style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
			           whileTap={{scale: 1.1}}
			           initial={{opacity: 0}}
			           animate={{opacity: 1}}>В
				разработке
			</motion.h2>
		</AnimatedMain>)
}
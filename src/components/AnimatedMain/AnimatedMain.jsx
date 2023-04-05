import {motion} from "framer-motion"

export default function AnimatedMain({children, mainstyles}) {
	const MatchQuery = window.matchMedia("(max-width: 768px)").matches
	
	return (
		<motion.main className={mainstyles}
		             initial={{x: MatchQuery ? 0 : -100, opacity: 0, y: MatchQuery ? -60 : 0}}
		             animate={{x: 0, opacity: 1, y: 0}}>
			{children}
		</motion.main>
	);
}

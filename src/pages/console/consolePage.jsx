import styles from "./consolePage.module.css";
import AnimatedMain from "../../components/AnimatedMain/AnimatedMain";
import Console from "../../components/Console/Console";

export default function ConsolePage() {
	return (
		<AnimatedMain mainstyles={styles.main}>
			<div className={styles.content}>
				<Console/>
			</div>
		</AnimatedMain>)
}
import styles from './start.module.css'
import Slider from "../../components/slider/slider";
import Startmenu from "../../components/startmenu/startmenu";
import AnimatedMain from "../../components/AnimatedMain/AnimatedMain";

export default function StartPage(props) {
	
	return (
		<AnimatedMain mainstyles={styles.main}>
			<div className={styles.content}>
				<Slider/>
				<Startmenu/>
			</div>
		</AnimatedMain>
	);
}
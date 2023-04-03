import styles from './start.module.css'
import Slider from "../../components/slider/slider";
import Startmenu from "../../components/startmenu/startmenu";

export default function StartPage(props) {
	
	return (
		<main className={styles.main}>
			<div className={styles.content}>
				<Slider/>
				<Startmenu/>
			</div>
		</main>
	);
}
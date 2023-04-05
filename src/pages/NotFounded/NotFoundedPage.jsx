import styles from './NotFounded.module.css'
import AnimatedMain from "../../components/AnimatedMain/AnimatedMain";

export default function NotFoundedPage() {
	return (
		<AnimatedMain mainstyles={styles.main}>
			<h1>Страница не найдена</h1>
		</AnimatedMain>
	)
}
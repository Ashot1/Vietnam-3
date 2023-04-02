import styles from './Loading.module.css'

export default function Loading(props) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.newtons_cradle}>
				<div className={styles.newtons_cradle__dot}></div>
				<div className={styles.newtons_cradle__dot}></div>
				<div className={styles.newtons_cradle__dot}></div>
				<div className={styles.newtons_cradle__dot}></div>
			</div>
		</div>
	);
}

import styles from './Loading.module.css'

export default function Loading(props) {
	return (
		<div className={styles.Loading}>
			<div className={styles.container}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	);
}

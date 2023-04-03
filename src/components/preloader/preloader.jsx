import styles from './Preloader.module.css'

export default function Preloader(props) {
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

import styles from './SRM.module.css'

export default function SRMPage(props) {
	return (
		<main className={styles.main}>
			<div className={styles.content}>
				<ul className={styles.bonusList}>
					<li className={styles.bonus}>
						<p>1000</p>
						<span>100</span>
					</li>
				</ul>
			</div>
		</main>
	);
}

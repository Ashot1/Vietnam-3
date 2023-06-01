import styles from './Notification.module.css'

export default function Notification({url, text}) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<p>Версия этого приложения устарела.</p>
				<a href={url} target="_blank"> {text}</a>
			</div>
		</div>
	);
}

import styles from './NeedAccountMessage.module.css'


export default function NeedAccountMessage(props) {
	return (
		<div className={styles.wrapper}>
			<h2 className={styles.message}>Необходимо войти в аккаунт</h2>
		</div>
	);
}

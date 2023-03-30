import styles from './modalWindow.module.css'
import {memo, useRef} from "react";

export default function ModalWindow({CloseSetting, children, classModal}) {
	const modalRef = useRef()
	
	return (
		<div className={styles.modalWindow} ref={modalRef} onClick={CloseSetting}>
			<div
				className={`${styles.content} ${classModal}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
				<div className={styles.btnPos}>
					<CloseFunction CloseSetting={CloseSetting}/>
				</div>
			</div>
		</div>
	);
}

const CloseFunction = memo(function CloseFunction({CloseSetting}) {
	return (
		<button className={styles.button} onClick={CloseSetting}>
			<span className={styles.box}>
				Закрыть
			</span>
		</button>
	)
})
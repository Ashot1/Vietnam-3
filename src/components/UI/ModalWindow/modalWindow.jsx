import styles from './modalWindow.module.css'
import {useRef} from "react";

export default function ModalWindow({CloseSetting, children, classModal}) {
	const modalRef = useRef()
	
	return (
		<div className={styles.modalWindow} ref={modalRef} onClick={CloseSetting}>
			<div
				className={`${styles.content} ${classModal}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
				<div className={styles.btnPos} onClick={CloseSetting}>
					<p>Закрыть</p>
				</div>
			</div>
		</div>
	);
}

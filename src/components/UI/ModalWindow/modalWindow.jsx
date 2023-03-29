import styles from './modalWindow.module.css'
import {useRef} from "react";

export default function ModalWindow({CloseSetting, children, width, height}) {
	const modalRef = useRef()
	
	return (
		<div className={styles.modalWindow} ref={modalRef} onClick={CloseSetting}>
			<div
				className={styles.content}
				onClick={(e) => e.stopPropagation()}
				style={{width: width, height: height}}
			>
				{children}
			</div>
		</div>
	);
}

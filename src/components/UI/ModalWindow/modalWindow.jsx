import styles from './modalWindow.module.css'
import {useEffect, useRef} from "react";

export default function ModalWindow(props) {
	const modalRef = useRef()
	
	useEffect(() => {
		modalRef.current.showModal()
	}, [])
	
	return (
		<dialog className={styles.modalWindow} ref={modalRef}>
		
		</dialog>
	);
}

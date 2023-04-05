import styles from "./WaveButton.module.css";
import {useEffect, useRef} from "react";

export default function WaveButton({onclick, children, color = 'rgb(196, 137, 59)'}) {
	const ref = useRef()
	useEffect(() => {
		ref.current.style.setProperty("--Color", `${color}`)
	}, [])
	
	return (
		<button className={styles.button2} onClick={onclick} ref={ref}>
			{children}
		</button>
	);
}

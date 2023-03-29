import {memo} from "react";
import styles from "./Background.module.css";

export default memo(function Background() {
	return (
		<span className={styles.background}>
			<div></div>
		</span>
	)
})
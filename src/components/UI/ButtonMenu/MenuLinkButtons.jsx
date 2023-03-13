import {Link, useMatch} from "react-router-dom";
import {css} from "glamor";
import styles from "./MenuLinkButtons.module.css"

export default function MenuLinkButtons(props) {
	const match = useMatch(`/${props.linkRouting}`)
	let ActiveButton = {boxShadow: `0 0 20px ${props.ActiveColor}`, background: props.ActiveColor}
	
	return (
		<Link to={`/${props.linkRouting}`}
		      className={match ? `${styles.button} ${styles.buttonActive}` : `${styles.button} `}
		      title={props.title}
		      {...css(match ? ActiveButton : {":hover": ActiveButton})}
		>
			<img src={`${props.src}`} className={styles.button_img}/>
		</Link>
	)
}
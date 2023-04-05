import {Link, useMatch} from "react-router-dom";
import {css} from "glamor";
import styles from "./MenuLinkButtons.module.css"


export default function MenuLinkButtons(props) {
	
	const match = useMatch({
		path: `/${props.linkRouting}`,
		end: props.linkRouting.length === 0
	})
	
	const ActiveButton = {boxShadow: `0 0 20px ${props.ActiveColor}`, background: props.ActiveColor},
		MatchCondition = match ? `${styles.button} ${styles.buttonActive} ` : `${styles.button} `,
		MobileCondition = props.IsMobile ? `${styles.mobile}` : ''
	
	if (props.title === 'Настройки') {
		return (
			<button
				className={`${MatchCondition} ${MobileCondition}`}
				title={props.title}
				style={{background: 'none'}}
				onClick={props.SettingsClick}
			>
				<img alt="" src={`${props.src}`} className={styles.button_img}
				     style={{filter: 'invert(0)', width: '27px', height: '27px', borderRadius: '50%'}}/>
			</button>
		)
		
	}
	
	return (
		<Link to={`/${props.linkRouting}`}
		      className={`${MatchCondition} ${MobileCondition}`}
		      title={props.title}
		      {...css(match
			      ? ActiveButton
			      :
			      {":hover": ActiveButton}
		      )}
		>
			<img alt="" src={`${props.src}`} className={styles.button_img}/>
		</Link>
	)
}

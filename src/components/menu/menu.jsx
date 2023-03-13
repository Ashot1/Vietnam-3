import styles from './menu.module.css'
import {css} from 'glamor'
import {CSSTransition} from "react-transition-group";
import {Link, useMatch} from 'react-router-dom';

import SRM from './image/chinaIco.png'
import Console from './image/command-line.png'
import Calc from './image/calculator.png'
import Settings from './image/free-icon-settings-455515.png'
import Download from './image/icon-download-6219312.png'
import Todo from './image/todolist.png'


export default function Menu(props) {
	
	return (
		<CSSTransition
			in={props.MenuChanges}
			timeout={400}
			classNames={{
				enterActive: `${styles.menu_open_start}`,
				exitActive: `${styles.menu_close_start}`,
			}}
			unmountOnExit
		>
			<div className={styles.menu}>
				<div className={styles.menuButtons}>
					<MenuLinkButtons key={1} src={SRM}
					                 title="Social Rating Miner"
					                 linkRouting="SocialRatingMiner"
					                 ActiveColor="rgb(177, 78, 78)"/>
					<MenuLinkButtons key={2} src={Console}
					                 title="Console"
					                 linkRouting="Console"
					                 ActiveColor="rgb(24, 185, 18)"/>
					<MenuLinkButtons key={3} src={Calc}
					                 title="Calculator"
					                 linkRouting="Calculator"
					                 ActiveColor="rgb(223, 201, 5)"/>
					<MenuLinkButtons key={4} src={Settings}
					                 title="Settings"
					                 linkRouting="Settings"
					                 ActiveColor="rgb(13, 162, 199)"/>
					<MenuLinkButtons key={5} src={Download}
					                 title="Download"
					                 linkRouting="Download"
					                 ActiveColor="rgb(152, 59, 196)"/>
					<MenuLinkButtons key={6} src={Todo}
					                 title="Todo list" linkRouting="Todo"
					                 ActiveColor="rgb(196, 137, 59)"/>
				</div>
			</div>
		</CSSTransition>
	)
}

function MenuLinkButtons(props) {
	const match = useMatch(`/${props.linkRouting}`)
	let theclass = `${styles.button} `
	let ActiveButton = {boxShadow: `0 0 20px ${props.ActiveColor}`, background: props.ActiveColor}
	
	return (
		<Link to={`/${props.linkRouting}`} className={match ? theclass + `${styles.buttonActive}` : theclass}
		      title={props.title}
		      {...css(match ? ActiveButton : {":hover": ActiveButton})}
		>
			<img src={`${props.src}`} className={styles.button_img}/>
		</Link>
	)
}
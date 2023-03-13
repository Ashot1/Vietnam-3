import styles from './menu.module.css'
import {CSSTransition} from "react-transition-group";

import SRM from './image/chinaIco.png'
import Console from './image/command-line.png'
import Calc from './image/calculator.png'
import Settings from './image/free-icon-settings-455515.png'
import Download from './image/icon-download-6219312.png'
import Todo from './image/todolist.png'
import MenuLinkButtons from "../UI/ButtonMenu/MenuLinkButtons";


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
					                 place="MenuLeft"
					                 ActiveColor="rgb(177, 78, 78)"/>
					<MenuLinkButtons key={2} src={Console}
					                 title="Console"
					                 linkRouting="Console"
					                 place="MenuLeft"
					                 ActiveColor="rgb(24, 185, 18)"/>
					<MenuLinkButtons key={3} src={Calc}
					                 title="Calculator"
					                 linkRouting="Calculator"
					                 place="MenuLeft"
					                 ActiveColor="rgb(223, 201, 5)"/>
					<MenuLinkButtons key={4} src={Settings}
					                 title="Settings"
					                 linkRouting="Settings"
					                 place="MenuLeft"
					                 ActiveColor="rgb(13, 162, 199)"/>
					<MenuLinkButtons key={5} src={Download}
					                 title="Download"
					                 linkRouting="Download"
					                 place="MenuLeft"
					                 ActiveColor="rgb(152, 59, 196)"/>
					<MenuLinkButtons key={6} src={Todo}
					                 title="Todo list" linkRouting="Todo"
					                 place="MenuLeft"
					                 ActiveColor="rgb(196, 137, 59)"/>
				</div>
			</div>
		</CSSTransition>
	)
}
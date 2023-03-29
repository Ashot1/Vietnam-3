import styles from './menu.module.css'
import {CSSTransition} from "react-transition-group";
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
					<MenuLinkButtons key={1} src='/images/menu/chinaIco.png'
					                 title="Social Rating Miner"
					                 linkRouting="SocialRatingMiner"
					                 ActiveColor="rgb(177, 78, 78)"/>
					<MenuLinkButtons key={2} src='/images/menu/command-line.png'
					                 title="Console"
					                 linkRouting="Console"
					                 ActiveColor="rgb(24, 185, 18)"/>
					<MenuLinkButtons key={3} src='/images/menu/calculator.png'
					                 title="Calculator"
					                 linkRouting="Calculator"
					                 ActiveColor="rgb(223, 201, 5)"/>
					<MenuLinkButtons key={4} src='/images/menu/download.png'
					                 title="Download"
					                 linkRouting="Download"
					                 ActiveColor="rgb(152, 59, 196)"/>
					<MenuLinkButtons key={5} src='/images/menu/todolist.png'
					                 title="Todo list"
					                 linkRouting="Todo"
					                 ActiveColor="rgb(196, 137, 59)"/>
				</div>
			</div>
		</CSSTransition>
	)
}
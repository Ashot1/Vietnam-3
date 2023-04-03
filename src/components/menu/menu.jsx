import styles from './menu.module.css'
import {CSSTransition} from "react-transition-group";
import MenuLinkButtons from "./ButtonMenu/MenuLinkButtons";
import {useContext, useMemo} from "react";
import {AuthContext} from "../../provider/AuthContext";


export default function Menu({MenuChanges, setSetting}) {
	
	const MenuStyleCondition = useMemo(() => localStorage.getItem('Mobile Menu') === 'upper', [localStorage.getItem('Mobile Menu')]),
		MenuStyle = MenuStyleCondition ? styles.menu : styles.MenuBottom,
		MenuMobileCondition = !MenuStyleCondition && window.matchMedia("(max-width: 768px)").matches,
		User = useContext(AuthContext),
		Logo = User ? User.photoURL : '/images/menu/user.png'
	
	return (
		<CSSTransition
			in={MenuMobileCondition ? true : MenuChanges}
			timeout={400}
			classNames={{
				enterActive: `${styles.menu_open_start}`,
				exitActive: `${styles.menu_close_start}`,
			}}
			unmountOnExit
		>
			<div className={MenuStyle}>
				<div className={styles.menuButtons}>
					{MenuMobileCondition && <MenuLinkButtons key={1} src='/images/menu/home2.png'
					                                         title="Главная"
					                                         linkRouting=""
					                                         ActiveColor="#42AAFF"
					/>}
					<StandartMenu/>
					{MenuMobileCondition && <MenuLinkButtons key={7} src={Logo}
					                                         title="Настройки"
					                                         linkRouting=""
					                                         SettingsClick={setSetting}/>}
				</div>
			</div>
		</CSSTransition>
	)
}

function StandartMenu() {
	return (
		<>
			<MenuLinkButtons key={2} src='/images/menu/chinaIco.png'
			                 title="Social Rating Miner"
			                 linkRouting="SocialRatingMiner"
			                 ActiveColor="rgb(177, 78, 78)"/>
			<MenuLinkButtons key={3} src='/images/menu/command-line.png'
			                 title="Console"
			                 linkRouting="Console"
			                 ActiveColor="rgb(24, 185, 18)"/>
			<MenuLinkButtons key={4} src='/images/menu/calculator.png'
			                 title="Calculator"
			                 linkRouting="Calculator"
			                 ActiveColor="rgb(223, 201, 5)"/>
			<MenuLinkButtons key={5} src='/images/menu/download.png'
			                 title="Download"
			                 linkRouting="Download"
			                 ActiveColor="rgb(152, 59, 196)"/>
			<MenuLinkButtons key={6} src='/images/menu/todolist.png'
			                 title="Todo list"
			                 linkRouting="Todo"
			                 ActiveColor="rgb(196, 137, 59)"/>
		</>
	)
}
import styles from './menu.module.css'
import MenuLinkButtons from "./ButtonMenu/MenuLinkButtons";
import {useContext, useMemo} from "react";
import {AuthContext} from "../../provider/AuthContext";
import {AnimatePresence, motion} from 'framer-motion'


export default function Menu({MenuChanges, setSetting}) {
	
	const MenuStyleCondition = useMemo(() => localStorage.getItem('Mobile Menu') === 'upper', [localStorage.getItem('Mobile Menu')]),
		MenuStyle = MenuStyleCondition ? styles.menu : styles.MenuBottom,
		MatchQuery = window.matchMedia("(max-width: 768px)").matches,
		MenuMobileCondition = !MenuStyleCondition && MatchQuery,
		User = useContext(AuthContext),
		Logo = User ? User.photoURL : '/images/menu/user.png',
		MenuVariantAnimation = {
			hidden: i => ({
				x: i ? 0 : -150,
				y: i ? -62 : 0,
				transition: {duration: .4}
			}),
			visible: i => ({
				x: 0,
				y: 0,
				transition: {duration: .4}
			})
		}
	return (
		<AnimatePresence initial={!MenuMobileCondition}>
			{(MenuMobileCondition ? true : MenuChanges)
				&& <motion.div className={MenuStyle}
				               initial={'hidden'}
				               animate={'visible'}
				               exit={'hidden'}
				               variants={MenuVariantAnimation}
				               custom={MatchQuery}>
					<div className={styles.menuButtons}>
						{MenuMobileCondition
							&& <MenuLinkButtons key={1}
							                    src='/images/menu/home2.png'
							                    title="Главная"
							                    linkRouting=""
							                    ActiveColor="#42AAFF"/>}
						<StandartMenu/>
						{MenuMobileCondition
							&& <MenuLinkButtons key={7} src={Logo}
							                    title="Настройки"
							                    linkRouting=""
							                    SettingsClick={setSetting}/>}
					</div>
				</motion.div>}
		</AnimatePresence>
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
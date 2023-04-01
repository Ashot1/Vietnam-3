import styles from './header.module.css'
import {memo, useContext, useMemo, useState} from 'react'
import {Link} from 'react-router-dom';
import {AuthContext} from "../../provider/AuthContext";

export default function Header(props) {
	const [BurgerState, setBurgerState] = useState(false)
	
	let MobMenu = useMemo(() => localStorage.getItem('Mobile Menu'), [localStorage.getItem('Mobile Menu')])
	let HeaderVision = MobMenu === 'upper' ? styles.headerWrapper : `${styles.headerWrapper} ${styles.HeaderClosed}`
	
	const burgerChange = () => {
		props.BurgerChange(BurgerState)
	}
	
	return (
		<header className={HeaderVision}>
			<div className={styles.header}>
				<MenuBurger BurgerState={BurgerState} setBurgerState={setBurgerState} BurgerChange={burgerChange}/>
				<HeaderName/>
				<AccountLogo setSettingsState={props.SettingChange}/>
			</div>
		</header>
	)
}

const MenuBurger = memo(function MenuBurger({BurgerState, setBurgerState, BurgerChange}) {
		return (
			<a className={styles.menuburgerWrapper} onClick={() => {
				setBurgerState(!BurgerState);
				BurgerChange()
			}}>
				<button className={BurgerState ? styles.menuburgerActive : styles.menuburger}></button>
			</a>
		)
	}
)

const HeaderName = memo(function HeaderName() {
		return (
			<div className={styles.logoNamePosition}>
				<Link to={`/`} className={styles.logoName}>
					Vietnam
				</Link>
			</div>
		)
	}
)

const AccountLogo = memo(function AccountLogo({setSettingsState}) {
	
	const User = useContext(AuthContext)
	const Logo = User ? User.photoURL : "/images/header/user.png"
	
	return (
		<button className={styles.settingsButton} onClick={setSettingsState}>
			<img src={Logo} alt="" style={{borderRadius: '50%'}}/>
		</button>
	)
})
import styles from './header.module.css'
import {memo, useState} from 'react'
import {Link} from 'react-router-dom';

export default function Header(props) {
	const [BurgerState, setBurgerState] = useState(false)
	
	const burgerChange = () => {
		props.BurgerChange(BurgerState)
	}
	
	
	return (
		<header className={styles.headerWrapper}>
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
	return (
		<button className={styles.settingsButton} onClick={setSettingsState}>
			<img src="/images/header/user.png" alt=""/>
		</button>
	)
})
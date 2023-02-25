import styles from './header.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Header(props) {
    const [BurgerState, setBurgerState] = useState(false)

    return (
        <header className={styles.header}>
            <a className={styles.menuburgerWrapper} onClick={() => { setBurgerState(!BurgerState); props.BurgerChange(BurgerState) }}>
                <button className={BurgerState ? styles.menuburgerActive : styles.menuburger}></button>
            </a>
            <div className={styles.logoNamePosition}>
                <Link to={`/`} className={styles.logoName}>
                    Vietnam
                </Link>
            </div>
        </header>
    )
}

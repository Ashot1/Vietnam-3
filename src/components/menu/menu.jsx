import styles from './menu.module.css'
import { CSSTransition } from "react-transition-group";
import { Link, useMatch } from 'react-router-dom';

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
                    <MenuLinkButtons src={SRM} class={styles.buttonSRM} title="Social Rating Miner" linkRouting="SocialRatingMiner" activeClassName={styles.buttonSRMActive} />
                    <MenuLinkButtons src={Console} class={styles.buttonConsole} title="Console" linkRouting="Console" activeClassName={styles.buttonConsoleActive} />
                    <MenuLinkButtons src={Calc} class={styles.buttonCalc} title="Calculator" linkRouting="Calculator" activeClassName={styles.buttonCalcActive} />
                    <MenuLinkButtons src={Settings} class={styles.buttonSettings} title="Settings" linkRouting="Settings" activeClassName={styles.buttonSettingsActive} />
                    <MenuLinkButtons src={Download} class={styles.buttonDownload} title="Download" linkRouting="Download" activeClassName={styles.buttonDownloadActive} />
                    <MenuLinkButtons src={Todo} class={styles.buttonTodo} title="Todo list" linkRouting="Todo" activeClassName={styles.buttonTodoActive} />
                </div>
            </div>
        </CSSTransition>
    )
}

function MenuLinkButtons(props) {
    const match = useMatch(`/${props.linkRouting}`)
    let theclass = `${styles.button} ${props.class} `

    return (
        <Link to={`/${props.linkRouting}`} className={match ? theclass + props.activeClassName : theclass} title={props.title} >
            <img src={`${props.src}`} className={styles.button_img} />
        </Link>
    )
}
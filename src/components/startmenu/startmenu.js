import styles from './startmenu.module.css';
import { useState } from "react";
import { Link } from 'react-router-dom';

import Calc from './image/calculator_icon.png'
import China from './image/china.jpg'
import Console from './image/code-editoren-t.jpg'
import Download from './image/download.jpeg'
import Settings from './image/games-settings-wired.png'
import Vietnam1 from './image/Vietnam1.png'
import Vietnam2 from './image/Vietnam2.png'
import Todolist from './image/list.jpg'


export default function StartMenu(props) {

    const [BlockLinks, setBlockLinks] = useState([
        { Count: 1, link: 'SocialRatingMiner', background: China, text: 'Social Rating Miner' },
        { Count: 2, link: 'Console', background: Console, text: 'Console' },
        { Count: 3, link: 'Calculator', background: Calc, text: 'Calculator' },
        { Count: 4, link: 'Settings', background: Settings, text: 'Settings' },
        { Count: 5, link: 'Download', background: Download, text: 'Download' },
        { Count: 9, link: 'Todo', background: Todolist, text: 'Todo list' },
        { Count: 6, link: 'https://vietnamcorp.github.io/VietnamCorp/', background: Vietnam1, text: 'Vietnam 1' },
        { Count: 7, link: 'https://tvoyotec.github.io/Vietnam2/index.html', background: Vietnam2, text: 'Vietnam 2' },
    ])
    return (
        <div className={styles.Startmenu}>
            {BlockLinks.map(item => {
                return (
                    <Link
                        key={item.Count}
                        to={item.link}
                        className={styles.Block}
                        style={{ backgroundImage: `url(${item.background})` }}
                    >
                        <p>{item.text}</p>
                        <span className={styles.BlockCover}></span>
                    </Link>
                )
            })}
        </div>
    )
}


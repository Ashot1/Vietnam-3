import styles from './startmenu.module.css';
import {useMemo} from "react";
import {Link} from 'react-router-dom';

export default function StartMenu(props) {
	
	const BlockLinks = useMemo(() => [
		{Count: 1, link: 'SocialRatingMiner', background: '/images/StartMenu/china.jpg', text: 'Social Rating Miner'},
		{Count: 2, link: 'Console', background: '/images/StartMenu/code-editoren-t.jpg', text: 'Console'},
		{Count: 3, link: 'Calculator', background: '/images/StartMenu/calculator_icon.png', text: 'Calculator'},
		{Count: 4, link: 'Download', background: '/images/StartMenu/download.jpeg', text: 'Download'},
		{Count: 5, link: 'Todo', background: '/images/StartMenu/list.jpg', text: 'Todo list'},
		{
			Count: 6,
			link: 'https://calculator-2-theta.vercel.app/',
			background: '/images/StartMenu/Хуйня4.png',
			text: 'V-Calculator 2'
		},
		{
			Count: 7,
			link: 'https://messenger-pink-nine.vercel.app/',
			background: '/images/StartMenu/messenger.png',
			text: 'Messenger'
		},
		{
			Count: 8,
			link: 'https://tvoyotec.github.io/Vietnam2/index.html',
			background: '/images/StartMenu/Vietnam2.png',
			text: 'Vietnam 2'
		},
		{
			Count: 9,
			link: 'https://vietnamcorp.github.io/VietnamCorp/',
			background: '/images/StartMenu/Vietnam1.png',
			text: 'Vietnam 1'
		},
	], [])
	return (
		<div className={styles.Startmenu}>
			{BlockLinks.map(item => {
				return (
					<Link
						key={item.Count}
						to={item.link}
						className={styles.Block}
						target={item.link.split('://')[0] === 'https' ? "_blank" : "_self"}
					>
						<p>{item.text}</p>
						<span className={styles.BlockCover}
						      style={{backgroundImage: `url(${item.background})`}}
						></span>
					</Link>
				)
			})}
		</div>
	)
}


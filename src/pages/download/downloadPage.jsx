import styles from "./download.module.css";
import {memo, useMemo} from "react";

import VietnamDownload from './files/app-release.apk'
import MCKDownload from './files/MCK.apk'
import MINSTALLDownload from './files/MInstAll_v19.01.2020.torrent'
import ESLDownload from './files/EmptyStandbyList.exe'
import {css} from "glamor";
import AnimatedMain from "../../components/AnimatedMain/AnimatedMain";


export default function DownloadPage() {
	const Downloads = useMemo(() => [
			{url: VietnamDownload, name: 'Vietnam app', type: 'apk', img: '/images/downloadPage/logo.png'},
			{url: MCKDownload, name: 'MCK app', type: 'apk', img: '/images/downloadPage/logo MCK.png'},
			{url: MINSTALLDownload, name: 'MininstAll', type: 'torrent', img: '/images/downloadPage/utorrent.png'},
			{url: ESLDownload, name: 'EmptyStandByList', type: 'exe', img: '/images/downloadPage/windows.png'},
		], []),
		RandomColor = [
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
		]
	
	return (
		<AnimatedMain mainstyles={styles.main}>
			<div className={styles.content}>
				<ul className={styles.DownloadList}>
					{Downloads.map(item => {
						return (
							<DownloadButton key={item.name} RandomColor={RandomColor} item={item}>
								<a href={item.url} download>
									<img alt="" src={item.img}/>
									<p>{item.name}</p>
									<span>{item.type}</span>
								</a>
							</DownloadButton>
						)
					})}
				</ul>
			</div>
		</AnimatedMain>
	)
}

const DownloadButton = memo(function DownloadButton({RandomColor, item, children}) {
	return (
		<li className={styles.Download}
		    style={{background: `rgba(${RandomColor[0]}, ${RandomColor[1]}, ${RandomColor[2]}, 0.2)`}}
		    {...css({
			    ":hover": {
				    background: `rgba(${RandomColor[0]}, ${RandomColor[1]}, ${RandomColor[2]}, 0.6)`,
				    boxShadow: `rgba(${RandomColor[0]}, ${RandomColor[1]}, ${RandomColor[2]}, 0.6)`
			    }
		    })}>
			{children}
		</li>
	)
})
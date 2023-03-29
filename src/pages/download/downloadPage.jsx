import styles from "./download.module.css";
import {useState} from "react";

import VietnamDownload from './files/app-release.apk'
import MCKDownload from './files/MCK.apk'
import MINSTALLDownload from './files/MInstAll_v19.01.2020.torrent'
import ESLDownload from './files/EmptyStandbyList.exe'


export default function DownloadPage() {
	const [Downloads, setDownloads] = useState([
		{url: VietnamDownload, name: 'Vietnam app', type: 'apk', img: '/images/downloadPage/logo.png'},
		{url: MCKDownload, name: 'MCK app', type: 'apk', img: '/images/downloadPage/logo MCK.png'},
		{url: MINSTALLDownload, name: 'MininstAll', type: 'torrent', img: '/images/downloadPage/utorrent.png'},
		{url: ESLDownload, name: 'EmptyStandByList', type: 'exe', img: '/images/downloadPage/windows.png'},
	])
	
	return (
		<main className={styles.main}>
			<div className={styles.content}>
				<ul className={styles.DownloadList}>
					{Downloads.map(item => {
						return (
							<li key={item.name} className={styles.Download}>
								<a href={item.url} download>
									<img src={item.img}/>
									<p>{item.name}</p>
									<span>{item.type}</span>
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		</main>
	)
}
import styles from './SRMMain.module.css'
import {motion} from 'framer-motion'
import {useContext, useEffect, useState} from "react";
import {collection, doc, query, updateDoc, where} from "firebase/firestore";
import {db} from "../../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {AuthContext} from "../../provider/AuthContext";
import UseAddCollection from "../../hooks/useAddCollection";

export default function SrmMain({Payday, Credits, setCredits, setPayday}) {
	
	const [RotateSync, setRotateSync] = useState(false)
	const User = useContext(AuthContext),
		MarkQuery = query(collection(db, "SRM"), where("id", "==", User.uid)),
		[values, loading, error, snapshot] = useCollectionData(MarkQuery)
	
	
	useEffect(() => {
		const interval = setInterval(() => {
			setCredits(prev => parseInt(prev) + Payday)
		}, 1000)
		
		return () => clearInterval(interval)
		
	}, [Payday])
	
	const Sync = async () => {
		setRotateSync(!RotateSync)
		
		if (values.length === 0) return await UseAddCollection([Credits, Payday, "SRM", User])
		
		
		if ((parseInt(values[0].Credits) >= parseInt(Credits) && parseInt(values[0].Payday) >= Payday) ||
			parseInt(values[0].Payday) > Payday) {
			setCredits(values[0].Credits)
			setPayday(values[0].Payday)
			return
		}
		
		if ((parseInt(values[0].Credits) < parseInt(Credits) && parseInt(values[0].Payday) <= Payday) ||
			parseInt(values[0].Payday) < Payday) {
			await snapshot.forEach(item => {
				updateDoc(doc(db, "SRM", item.id), {Credits: Credits, Payday: Payday})
			})
			return
		}
	}
	
	return (
		<>
			<section className={styles.info}>
				<div>
					<p>{Credits}</p>
					<p>+{Payday}</p>
				</div>
				<button onClick={Sync}>
					<motion.img src="/images/SRM/free-icon-sync-5344979.png" alt=""
					            animate={{rotate: RotateSync ? 360 : 0}}/>
					Синхронизировать
				</button>
			</section>
			<section className={styles.ButtonWrapper}>
				<motion.button
					whileHover={{scale: 1.05}}
					whileTap={{scale: 0.95}}
					onClick={() => setCredits(prev => prev + 1)}>
					<img src="/images/SRM/519rbLb3GhL._AC_SL1499_.jpg" alt=""/>
				</motion.button>
			</section>
		</>
	);
}


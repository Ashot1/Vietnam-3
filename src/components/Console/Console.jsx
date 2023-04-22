import styles from './Console.module.css'
import {memo, useCallback, useContext, useRef, useState} from "react";
import {AuthContext} from "../../provider/AuthContext";
import {AnimatePresence, motion} from "framer-motion"
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "../../firebase";

export default function Console(props) {
	const [Logs, setLogs] = useState([]),
		ref1 = useRef(),
		User = useContext(AuthContext)
	
	const CreateSystemLog = (text) => {
		setLogs(prev => [...prev, {isUserCommand: false, text: text}])
	}
	
	const TrySomething = (func) => {
		try {
			func()
			CreateSystemLog('Done!')
		} catch (e) {
			CreateSystemLog('Error! ' + e)
		}
	}
	
	const ChangeServerData = async (data, value) => {
		const MarkQuery = query(collection(db, "SRM"), where("id", "==", User.uid))
		const Document = await getDocs(MarkQuery)
		let DocID = ''
		Document.forEach((doc) => {
			DocID = doc.id
		});
		if (data === 'Credits') await updateDoc(doc(db, "SRM", DocID), {Credits: value})
		if (data === 'Payday') await updateDoc(doc(db, "SRM", DocID), {Payday: value})
	}
	
	const MessageHandler = useCallback(async (mes) => {
		if (mes.toLowerCase() === 'help') {
			// CreateSystemLog('darkTheme')
			// CreateSystemLog('lightTheme')
			CreateSystemLog('clearConsole')
			CreateSystemLog('clearSRMclientPAYDAY')
			CreateSystemLog('clearSRMclientCREDITS')
			CreateSystemLog('clearSRMserverPAYDAY')
			CreateSystemLog('clearSRMserverCREDITS')
			CreateSystemLog('clearSRMpayday')
			CreateSystemLog('clearSRMcredits')
			CreateSystemLog('changeSRMcredits')
			CreateSystemLog('changeSRMpayday')
			return
		}
		if (mes.toLowerCase() === 'clearconsole') {
			setLogs([])
			return
		}
		if (mes.toLowerCase() === 'clearsrmclientpayday') {
			if (!User) return CreateSystemLog('You must log in!')
			TrySomething(() => localStorage.setItem('Payday', '0'))
			return
		}
		if (mes.toLowerCase() === 'clearsrmclientcredits') {
			if (!User) return CreateSystemLog('You must log in!')
			TrySomething(() => localStorage.setItem('credits', '0'))
			return
		}
		if (mes.toLowerCase() === 'clearsrmserverpayday') {
			if (!User) return CreateSystemLog('You must log in!')
			TrySomething(() => ChangeServerData('Payday', 0))
			return
		}
		if (mes.toLowerCase() === 'clearsrmservercredits') {
			if (!User) return CreateSystemLog('You must log in!')
			TrySomething(() => ChangeServerData('Credits', 0))
			return
		}
		if (mes.toLowerCase() === 'clearsrmcredits') {
			if (!User) return CreateSystemLog('You must log in!')
			TrySomething(() => {
				localStorage.setItem('credits', '0')
				ChangeServerData('Credits', 0)
			})
			return
		}
		if (mes.toLowerCase() === 'clearsrmpayday') {
			if (!User) return CreateSystemLog('You must log in!')
			TrySomething(() => {
				localStorage.setItem('Payday', '0')
				ChangeServerData('Payday', 0)
			})
			return
		}
		if (mes.split(' ')[0].toLowerCase() === 'changesrmcredits' && mes.split(' ').length === 2) {
			if (!User) return CreateSystemLog('You must log in!')
			if (User.uid !== 'pTV7bHCQOeWFkcFFd1dalgO4ONn2') return CreateSystemLog('You must be admin!')
			TrySomething(() => {
				localStorage.setItem('credits', mes.split(' ')[1])
				ChangeServerData('Credits', parseInt(mes.split(' ')[1]))
			})
			return
		}
		if (mes.split(' ')[0].toLowerCase() === 'changesrmpayday' && mes.split(' ').length === 2) {
			if (!User) return CreateSystemLog('You must log in!')
			if (User.uid !== 'pTV7bHCQOeWFkcFFd1dalgO4ONn2') return CreateSystemLog('You must be admin!')
			TrySomething(() => {
				localStorage.setItem('Payday', mes.split(' ')[1])
				ChangeServerData('Payday', parseInt(mes.split(' ')[1]))
			})
			return
		}
		
		CreateSystemLog('Unknown command')
	}, [User])
	
	const sendMessage = useCallback(async (e) => {
		if (e.key === 'Enter') {
			await setLogs(prev => [...prev, {isUserCommand: true, text: e.target.value}])
			await MessageHandler(e.target.value)
			e.target.value = ''
			await ref1.current.lastChild.scrollIntoView({block: "center", behavior: "smooth"});
		}
	}, [User])
	
	return (
		<div className={styles.console}>
			<ConsoleInput sendMessage={sendMessage}/>
			<ul className={styles.Commands} ref={ref1}>
				<AnimatePresence>
					<li key="tryhelp" className={styles.systemCommand}><b>></b> <p>try "help"</p></li>
					<Log Logs={Logs}/>
				</AnimatePresence>
			</ul>
		</div>
	);
}

const Log = memo(({Logs}) => {
	return (
		Logs.map((item, index) => (
			<motion.li key={index}
			           animate={{x: 0, opacity: 1}}
			           initial={{opacity: 0, x: -10}}
			           className={item.isUserCommand ? styles.userCommand : styles.systemCommand}><b>></b>
				<p>{item.text}</p></motion.li>
		))
	)
})

const ConsoleInput = memo(function ConsoleInput({sendMessage}) {
	return (
		<article>
			<input type="text" placeholder="Комманда"
			       onKeyUp={sendMessage}/>
		</article>
	)
})

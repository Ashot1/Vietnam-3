import styles from './Form.module.css'
import {memo, useContext, useState} from "react";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {AuthContext} from "../../../provider/AuthContext";


export default memo(function Form({background}) {
	const [FormContent, setFormContent] = useState('Buttons')
	const auth = getAuth()
	const provider = new GoogleAuthProvider();
	const User = useContext(AuthContext)
	
	const Login = () => {
		signInWithPopup(auth, provider)
	}
	
	return (
		<div className={styles.Form} style={{background: background}}>
			{User ? <AccountInfo user={User} auth={auth}/> : <Buttons Login={Login}/>}
		</div>
	);
})

function AccountInfo({user, auth, SetUser}) {
	
	const RegisterDate = (str) => {
		let options = {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric'
		}
		
		let date = new Date(str);
		return date.toLocaleString('ru', options)
	}
	
	return (
		<div className={styles.card}>
			<div className={styles.info}>
				<section>
					<img src={user.photoURL} className={styles.photoImage}/>
				</section>
				<section>
					<h2>{user.displayName}</h2>
					<span>Зарегистрирован {RegisterDate(user.metadata.creationTime)}</span>
					<button className={styles.noselect} onClick={() => {
						signOut(auth);
					}}><span className={styles.text}>Выйти</span><span className={styles.icon}><svg
						xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
						d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
					</button>
				</section>
			</div>
		</div>
	)
}

function Buttons({Login}) {
	return (
		<div style={{gap: '25px', display: 'flex', flexDirection: 'column'}}>
			<button className={styles.button} onClick={Login}>
			<span className={styles.box}>
				Войти с помощью <img src="/images/Form/google.png" alt="" className={styles.image}/>
			</span>
			</button>
		</div>
	)
}
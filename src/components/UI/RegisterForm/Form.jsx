import styles from './Form.module.css'
import {memo, useState} from "react";

export default memo(function Form({background}) {
	const [FormContent, setFormContent] = useState('Buttons')
	
	return (
		<form className={styles.Form} style={{background: background}}>
			{FormContent === 'Buttons'
				? <Buttons
					setFormLogin={() => setFormContent('Login')}
					SetFormRegister={() => setFormContent('Register')}
				/>
				: FormContent === 'Login'
					? <Login/>
					: FormContent === 'Register'
						? <Register/>
						: null
			}
		</form>
	);
})

function Register() {
	return (
		<>
			<img src="/images/header/user.png"/>
			<input type="text" placeholder="Login"></input>
			<input type="password" placeholder="Password"></input>
			<button></button>
		</>
	)
}

function Login() {
	return (
		<h1>Develop</h1>
	)
}

function Buttons({setFormLogin, SetFormRegister}) {
	return (
		<>
			<button onClick={setFormLogin}>Login</button>
			<button onClick={SetFormRegister}>Register</button>
		</>
	)
}
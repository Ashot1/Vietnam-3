import styles from './calculatorPage.module.css'
import {memo} from "react";
import AnimatedMain from "../../components/AnimatedMain/AnimatedMain";
import {Link, Navigate, Outlet, useLocation, useMatch} from "react-router-dom";
import Notification from "../../components/Notification/Notification";

export default memo(function CalculatorPage(props) {
	
	const location = useLocation()
	
	if (location.pathname === '/Calculator') return <Navigate replace to="/Calculator/Calc"/>
	
	return (
		<AnimatedMain mainstyles={styles.main}>
			<div className={styles.content}>
				<Notification url="https://calculator-2-theta.vercel.app/" text="Новый калькулятор и конвертер"/>
				<Menu/>
				<Outlet/>
			</div>
		</AnimatedMain>
	)
})

const Menu = memo(function Menu() {
	
	const match1 = useMatch({
		path: `/Calculator/Calc`,
		end: false
	})
	
	const match2 = useMatch({
		path: `/Calculator/Converter`,
		end: false
	})
	
	return (
		<span className={styles.Menu}>
			<Link to={"/Calculator/Calc"}
			      className={match1 ? styles.Active : styles.UnActive}
			>Калькулятор</Link>
			<Link to={"/Calculator/Converter"}
			      className={match2 ? styles.Active : styles.UnActive}
			>Конвертер</Link>
		</span>
	)
})
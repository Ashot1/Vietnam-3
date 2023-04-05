// import styles from './SRM.module.css'

import PrivatePage from "../../hoc/PrivatePage";
import styles from "./SRM.module.css"
import AnimatedMain from "../../components/AnimatedMain/AnimatedMain";

export default function SRMPage(props) {
	return (
		<PrivatePage>
			<AnimatedMain mainstyles={styles.main}>
				<h2 style={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>В
					разработке</h2>
			</AnimatedMain>
		</PrivatePage>
	)
}

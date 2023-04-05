import {memo} from "react";
import styles from "./MarkMenu.module.css";

export default memo(function MarkMenu({navigate, EditMark, DeleteMark, EditMode}) {
	
	return (
		<section className={styles.Navigation}>
			<nav onClick={() => navigate('/Todo/Marks')} className={styles.backButton}>
				<img src="/images/MarkList/free-icon-back-3183312.png" alt="" className={styles.BackIMG}/>
			</nav>
			<nav className={styles.wrapper}>
				<button title="Редактировать" onClick={EditMark} style={EditMode ? {opacity: '.4'} : null}>
					<img src="/images/MarkList/free-icon-pencil-9191806.png" alt="" className={styles.EditIMG}/>
				</button>
				<button title="Удалить" onClick={DeleteMark}>
					<img src="/images/MarkList/delete.png" alt=""/>
				</button>
			</nav>
		</section>
	)
})
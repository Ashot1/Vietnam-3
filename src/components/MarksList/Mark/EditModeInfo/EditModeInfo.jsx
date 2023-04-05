import {AnimatePresence, motion} from "framer-motion";
import styles from "./EditModeInfo.module.css";
import WaveButton from "../../../UI/WaveButton/WaveButton";

export default function EditModeInfo(props) {
	const {
		EditMode,
		variantAnimation,
		SaveData,
		CanceledEdit,
		NewData,
		ChangeTitle,
		ChangeContent
	} = props
	
	return (
		<AnimatePresence>
			{EditMode && <motion.textarea className={styles.TitleArea}
			                              style={{width: '95%'}}
			                              value={NewData.title}
			                              onChange={ChangeTitle}
			                              initial="hidden"
			                              animate="visible"
			                              variants={variantAnimation}
			                              key="TitleArea"></motion.textarea>}
			
			{EditMode && <motion.textarea className={styles.ContentArea}
			                              value={NewData.content}
			                              onChange={ChangeContent}
			                              initial="hidden"
			                              animate="visible"
			                              variants={variantAnimation}
			                              key="ContentArea"></motion.textarea>}
			
			{EditMode && <motion.div className={styles.ButtonPosition}
			                         initial="hidden"
			                         animate="visible"
			                         variants={variantAnimation}>
				
				<WaveButton color='gray' onclick={CanceledEdit}>Отменить</WaveButton>
				<WaveButton onclick={SaveData}>Сохранить</WaveButton>
			</motion.div>}
		</AnimatePresence>
	)
}
import {useContext, useState} from "react";
import {AuthContext} from "../../../provider/AuthContext";
import ModalWindow from "../../UI/ModalWindow/modalWindow";
import styles from "./CreateMarkForm.module.css";
import UseAddCollection from "../../../hooks/useAddCollection";
import WaveButton from "../../UI/WaveButton/WaveButton";
import {AnimatePresence} from "framer-motion"

export default function CreateMark({CreateMarkActive, ChangeCreateModal}) {
	
	const [Title, setTitle] = useState('')
	const [Content, setContent] = useState('')
	const User = useContext(AuthContext)
	
	const SendData = async (e) => {
		if (Title.length <= 0 || Content.length <= 0) return
		e.preventDefault()
		try {
			await UseAddCollection([Content, Title, "Marks", User])
			setTitle('')
			setContent('')
		} catch (e) {
			console.error("Error adding document: ", e);
		}
		
	}
	return (
		<AnimatePresence>
			{CreateMarkActive && <ModalWindow CloseSetting={ChangeCreateModal} classModal={styles.CreateMarksModal}>
				<section><h2>Создать заметку</h2></section>
				<section>
					<form action="src/components/MarksList/CreateMarkForm/CreateMarkForm">
						<div className={styles.inputbox}>
							<input
								required="required"
								type="text"
								value={Title}
								onChange={(e) => setTitle(e.target.value)}/>
							<span>Название</span>
							<i></i>
						</div>
						<textarea
							placeholder="Заметка"
							value={Content} onChange={(e) => setContent(e.target.value)}
							required="required">
				</textarea>
						<WaveButton onclick={SendData}>Создать</WaveButton>
					</form>
				</section>
			</ModalWindow>}
		</AnimatePresence>
	)
	
}
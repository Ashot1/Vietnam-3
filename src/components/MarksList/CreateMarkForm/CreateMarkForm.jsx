import {useContext, useState} from "react";
import {AuthContext} from "../../../provider/AuthContext";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../../firebase";
import ModalWindow from "../../UI/ModalWindow/modalWindow";
import styles from "./CreateMarkForm.module.css";

export default function CreateMark({CreateMarkActive, ChangeCreateModal}) {
	
	const [Title, setTitle] = useState('')
	const [Content, setContent] = useState('')
	
	const User = useContext(AuthContext)
	
	const SendData = async (e) => {
		if (Title.length <= 0 || Content.length <= 0) return
		e.preventDefault()
		try {
			const options = {
				day: 'numeric',
				month: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			}
			
			let date = new Date().toLocaleString('ru', options);
			
			const docRef = await addDoc(collection(db, "Marks"), {
				title: Title,
				Content: Content,
				id: User.uid,
				CreateAt: date
			});
			setTitle('')
			setContent('')
		} catch (e) {
			console.error("Error adding document: ", e);
		}
		
	}
	if (CreateMarkActive) return (
		<ModalWindow CloseSetting={ChangeCreateModal} classModal={styles.CreateMarksModal}>
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
					<button className={styles.button2} onClick={SendData}>
						Создать
					</button>
				</form>
			</section>
		</ModalWindow>
	)
	
}
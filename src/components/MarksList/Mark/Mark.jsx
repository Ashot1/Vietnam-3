import styles from "./Mark.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../../provider/DataContext";
import Loading from "../../Loading/Loading";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";


export default function Mark(props) {
	const {MarkId} = useParams()
	const navigate = useNavigate()
	const [MarkArr, loading, error] = useContext(DataContext)
	const CurrentMark = MarkArr.find(d => d.id === MarkId)
	const [EditMode, setEditMode] = useState(false)
	const [NewData, setNewData] = useState({})
	
	useEffect(() => {
		if (!CurrentMark) return
		setNewData({title: CurrentMark.title, content: CurrentMark.Content})
	}, [CurrentMark])
	
	const DeleteMark = async () => {
		await deleteDoc(doc(db, "Marks", MarkId));
		await navigate('/Todo/Marks')
	}
	
	const EditMark = async () => {
		if (EditMode) {
			await updateDoc(doc(db, "Marks", MarkId), {title: NewData.title, Content: NewData.content});
		}
		setEditMode(!EditMode)
	}
	
	let AreaVisibility = EditMode ? 'block' : 'none'
	let BlocksVisibility = EditMode ? 'none' : 'block'
	
	return (
		<div className={styles.Mark}>
			<section>
				<nav onClick={() => navigate('/Todo/Marks')} className={styles.backButton}>
					<img src="/images/MarkList/free-icon-arrow-6529018.png" alt=""/>
				</nav>
				<nav className={styles.wrapper}>
					<button title="Редактировать" onClick={EditMark} style={EditMode ? {opacity: '.4'} : null}>
						<img src="/images/MarkList/free-icon-edit-992664.png" alt=""/>
					</button>
					<button title="Удалить" onClick={DeleteMark}>
						<img src="/images/MarkList/free-icon-recycle-bin-3156999.png" alt=""/>
					</button>
				</nav>
			</section>
			{CurrentMark ? <section className={styles.info}>
				<h2 style={{display: BlocksVisibility}}>{CurrentMark.title}</h2>
				
				<textarea style={{display: AreaVisibility}}
				          className={styles.TitleArea}
				          value={NewData.title}
				          onChange={(e) => setNewData({...NewData, title: e.target.value})}></textarea>
				
				<p style={{display: BlocksVisibility}}>{CurrentMark.Content}</p>
				
				<textarea style={{display: AreaVisibility}}
				          className={styles.ContentArea}
				          value={NewData.content}
				          onChange={(e) => setNewData({...NewData, content: e.target.value})}></textarea>
				
				<span>{CurrentMark.CreateAt}</span>
			</section> : <Loading/>}
		</div>
	)
}

import styles from "./Mark.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {memo, useContext, useEffect, useState} from "react";
import {DataContext} from "../../../provider/DataContext";
import Loading from "../../Loading/Loading";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import toast from "react-hot-toast";


export default function Mark(props) {
	const {MarkId} = useParams(),
		navigate = useNavigate(),
		[MarkArr, loading, error] = useContext(DataContext),
		CurrentMark = MarkArr.find(d => d.id === MarkId),
		[EditMode, setEditMode] = useState(false),
		[NewData, setNewData] = useState({}),
		AreaVisibility = EditMode ? 'block' : 'none',
		BlocksVisibility = EditMode ? 'none' : 'block'
	
	useEffect(() => {
		if (!CurrentMark) return
		setNewData({title: CurrentMark.title, content: CurrentMark.Content})
	}, [CurrentMark])
	
	const copy = (e) => {
		navigator.clipboard.writeText(e.target.innerText)
		toast.success('Скопировано!', {
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff',
			},
		})
	}
	
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
	
	return (
		<div className={styles.Mark}>
			<Menu navigate={navigate} DeleteMark={DeleteMark} EditMark={EditMark} EditMode={EditMode}/>
			{CurrentMark ? <section className={styles.info}>
				<h2 style={{display: BlocksVisibility}}
				    onClick={copy}>{CurrentMark.title}</h2>
				
				<textarea style={{display: AreaVisibility}}
				          className={styles.TitleArea}
				          value={NewData.title}
				          onChange={(e) => setNewData({...NewData, title: e.target.value})}></textarea>
				
				<p style={{display: BlocksVisibility}}
				   onClick={copy}>{CurrentMark.Content}</p>
				
				<textarea style={{display: AreaVisibility}}
				          className={styles.ContentArea}
				          value={NewData.content}
				          onChange={(e) => setNewData({...NewData, content: e.target.value})}></textarea>
				
				<span>{CurrentMark.CreateAt}</span>
			</section> : <Loading/>}
		</div>
	)
}

const Menu = memo(function Menu({navigate, EditMark, DeleteMark, EditMode}) {
	
	return (
		<section className={styles.Navigation}>
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
	)
})
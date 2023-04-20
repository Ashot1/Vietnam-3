import styles from "./Mark.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../../provider/DataContext";
import Loading from "../../Loading/Loading";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import toast from "react-hot-toast";
import {motion} from 'framer-motion'
import MarkMenu from "./MarkMenu/MarkMenu";
import EditModeInfo from "./EditModeInfo/EditModeInfo";


export default function Mark(props) {
	const {MarkId} = useParams(),
		navigate = useNavigate(),
		[MarkArr, loading, error] = useContext(DataContext),
		CurrentMark = MarkArr.find(d => d.id === MarkId),
		[EditMode, setEditMode] = useState(false),
		[NewData, setNewData] = useState({}),
		variantAnimation = {
			visible: {
				opacity: 1
			},
			hidden: {
				opacity: 0
			}
		}
	
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
		await toast.promise(
			deleteDoc(doc(db, "Marks", MarkId)),
			{
				loading: 'Удаление...',
				success: <b>Заметка удалена!</b>,
				error: <b>Ошибка</b>,
			},
			{
				style: {
					borderRadius: '10px',
					background: '#333',
					color: '#fff',
				},
			}
		);
		await navigate('/Todo/Marks')
	}
	
	const EditMark = () => {
		if (EditMode) {
			CanceledEdit()
			return
		}
		setEditMode(true)
	}
	
	const CanceledEdit = () => {
		setEditMode(false)
		setNewData({title: CurrentMark.title, content: CurrentMark.Content})
	}
	
	const ChangeTitle = (e) => {
		setNewData({...NewData, title: e.target.value})
	}
	
	const ChangeContent = (e) => {
		setNewData({
			...NewData,
			content: e.target.value
		})
	}
	
	const SaveData = async () => {
		const options = ({
				day: 'numeric',
				month: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			}),
			date = new Date().toLocaleString('ru', options);
		await updateDoc(doc(db, "Marks", MarkId), {title: NewData.title, Content: NewData.content, CreateAt: date});
		setEditMode(false)
		toast.success('Изменения сохранены!', {
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff',
			},
		})
	}
	
	return (
		<div className={styles.Mark}>
			<MarkMenu navigate={navigate} DeleteMark={DeleteMark} EditMark={EditMark} EditMode={EditMode}/>
			{CurrentMark ?
				<section className={styles.info}>
					<DefaultInfo EditMode={EditMode} copy={copy} variantAnimation={variantAnimation}
					             CurrentMark={CurrentMark}/>
					
					<EditModeInfo EditMode={EditMode} variantAnimation={variantAnimation} SaveData={SaveData}
					              CanceledEdit={CanceledEdit} NewData={NewData} ChangeTitle={ChangeTitle}
					              ChangeContent={ChangeContent}/>
					
					<motion.span initial='hidden'
					             animate='visible'
					             variants={variantAnimation}>{CurrentMark.CreateAt}</motion.span>
				</section> : <Loading/>}
		</div>
	)
}


function DefaultInfo(props) {
	const {EditMode, copy, variantAnimation, CurrentMark} = props,
		BlocksVisibility = EditMode ? 'none' : 'block'
	
	return (
		<>
			<motion.h2 style={{display: BlocksVisibility}}
			           onClick={copy}
			           whileTap={{scale: 0.9}}
			           initial='hidden'
			           animate='visible'
			           variants={variantAnimation}
			           whileHover={{opacity: .7}}>{CurrentMark.title}</motion.h2>
			<motion.p style={{display: BlocksVisibility}}
			          onClick={copy}
			          whileTap={{scale: 0.95}}
			          initial='hidden'
			          animate='visible'
			          variants={variantAnimation}>{CurrentMark.Content}</motion.p>
		</>
	)
}


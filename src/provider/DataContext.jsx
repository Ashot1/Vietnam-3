import {createContext, memo, useContext, useEffect, useState} from "react";
import {collection, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {AuthContext} from "./AuthContext";
import UseFormateDate from "../hooks/useFormateDate";

export const DataContext = createContext()

export default memo(function DataProvider({children}) {
	
	const User = useContext(AuthContext),
		MarkQuery = query(collection(db, "Marks"), where("id", "==", User.uid)),
		[values, loading, error, snapshot] = useCollectionData(MarkQuery),
		[MarkArr, setMarkArr] = useState([]),
		[SortParams, setSortParams] = useState('newToOld'),
		SortArrayValues = [
			{value: 'newToOld', title: 'От новых к старым'},
			{value: 'oldToNew', title: 'От старых к новым'}
		]
	
	
	useEffect(() => {
		if (!values) return
		let MarkArray = [],
			ids = []
		
		snapshot.forEach((d) => {
			ids.push(d.id)
		})
		
		for (let i = 0; i < values.length; i++) {
			MarkArray.push({
				title: values[i].title,
				Content: values[i].Content,
				CreateAt: values[i].CreateAt,
				id: ids[i]
			})
		}
		
		setMarkArr(MarkArray.sort((a, b) => {
			const firstDate = UseFormateDate(a.CreateAt),
				secondDate = UseFormateDate(b.CreateAt),
				dateA = new Date(firstDate),
				dateB = new Date(secondDate)
			
			if (SortParams === 'newToOld') return dateB - dateA
			if (SortParams === 'oldToNew') return dateA - dateB
		}))
	}, [values, SortParams])
	
	
	return (
		<DataContext.Provider value={[MarkArr, loading, error, setSortParams, SortArrayValues]}>
			{children}
		</DataContext.Provider>
	)
})
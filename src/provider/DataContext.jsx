import {createContext, memo, useEffect, useState} from "react";
import {collection, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";

export const DataContext = createContext()

export default memo(function DataProvider({children, User}) {
	
	const MarkQuery = query(collection(db, "Marks"), where("id", "==", User.uid)),
		[values, loading, error, snapshot] = useCollectionData(MarkQuery),
		[MarkArr, setMarkArr] = useState([])
	
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
			let dateA = new Date(a.CreateAt), dateB = new Date(b.CreateAt)
			return dateA - dateB
		}))
	}, [values])
	
	
	return (
		<DataContext.Provider value={[MarkArr, loading, error]}>
			{children}
		</DataContext.Provider>
	)
})
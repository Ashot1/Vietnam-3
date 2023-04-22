import {createContext, memo, useContext, useEffect, useState} from "react";
import {collection, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {AuthContext} from "./AuthContext";

export const TodoDataContext = createContext()

export default memo(function TodoDataProvider({children}) {
	
	const User = useContext(AuthContext),
		TodoQuery = query(collection(db, "Todos"), where("id", "==", User.uid)),
		[values, loading, error, snapshot] = useCollectionData(TodoQuery),
		[TodoArr, setTodoArr] = useState([])
	
	useEffect(() => {
		if (!values) return
		let TodoArray = [],
			ids = []
		
		snapshot.forEach((d) => {
			ids.push(d.id)
		})
		
		for (let i = 0; i < values.length; i++) {
			TodoArray.push({
				Content: values[i].Content,
				CreateAt: values[i].CreateAt,
				isChecked: values[i].isChecked,
				id: ids[i]
			})
		}
		
		setTodoArr(TodoArray)
	}, [values])
	
	
	return (
		<TodoDataContext.Provider value={[TodoArr, loading, error]}>
			{children}
		</TodoDataContext.Provider>
	)
})
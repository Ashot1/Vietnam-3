import {createContext, memo, useContext, useEffect, useState} from "react";
import {addDoc, collection, query, where} from "firebase/firestore";
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
		if (values.length <= 0) {
			const AddDoc = async () => {
				const docRef = await addDoc(collection(db, "Todos"), {
					Todo: [],
					id: User.uid
				})
			}
			AddDoc()
		}
		setTodoArr(values[0].Todo)
	}, [values])
	
	
	return (
		<TodoDataContext.Provider value={[TodoArr, loading, error, snapshot]}>
			{children}
		</TodoDataContext.Provider>
	)
})
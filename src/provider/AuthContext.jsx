import {createContext, memo, useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";


export const AuthContext = createContext()

export default memo(function AuthProvider({children}) {
	
	const auth = getAuth()
	const [User, setUser] = useState(null)
	const [user] = useAuthState(auth)
	
	useEffect(() => {
		setUser(user)
	}, [user])
	
	return (
		<AuthContext.Provider value={User}>
			{children}
		</AuthContext.Provider>
	)
})
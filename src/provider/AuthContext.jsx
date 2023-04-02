import {createContext, memo} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";


export const AuthContext = createContext()

export default memo(function AuthProvider({children}) {
	
	const auth = getAuth()
	const [user] = useAuthState(auth)
	
	return (
		<AuthContext.Provider value={user}>
			{children}
		</AuthContext.Provider>
	)
})
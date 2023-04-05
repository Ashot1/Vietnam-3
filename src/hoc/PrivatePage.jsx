import {useContext} from "react";
import {AuthContext} from "../provider/AuthContext";
import NeedAccountMessage from "../components/NeedAccountMessage/NeedAccountMessage";

export default function PrivatePage({children}) {
	
	const User = useContext(AuthContext)
	
	if (!User) return <NeedAccountMessage/>
	
	return children
}

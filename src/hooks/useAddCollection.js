import {addDoc, collection} from "firebase/firestore";
import {db} from "../firebase";

export default async function UseAddCollection([content, title, Col, user]) {
	const options = ({
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		}),
		date = new Date().toLocaleString('ru', options);
	
	const docRef = await addDoc(collection(db, Col), {
		title: title,
		Content: content,
		id: user.uid,
		CreateAt: date
	});
}
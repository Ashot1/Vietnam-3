export default function UseFormateDate(date) {
	const DateArr = date.split(',')
	const NewDate = DateArr[0].split('.')
	const FormatedNewDate = `${NewDate[1]}/${NewDate[0]}/${NewDate[2]}`
	const FormatedDate = `${FormatedNewDate}${DateArr[1]}`
	return FormatedDate
}
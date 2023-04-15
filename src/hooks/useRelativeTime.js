export default function UseRelativeTime(date, lang) {
	
	const ConvertFormatDate = new Date(date).toLocaleString('ru')
	
	const timeMS = typeof date === 'number' ? date : new Date(ConvertFormatDate).getTime();
	
	const DifferenceTimeS = Math.round((timeMS - Date.now()) / 1000)
	
	const NumericTime = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365]
	
	const WordsTime = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year']
	
	const index = NumericTime.findIndex(time => time > Math.abs(DifferenceTimeS))
	
	const divisor = index ? NumericTime[index - 1] : 1
	
	const rtf = new Intl.RelativeTimeFormat(lang, {numeric: 'auto'})
	
	const RelativeDate = -2 < (DifferenceTimeS / divisor) ? Math.ceil(DifferenceTimeS / divisor) : Math.round(DifferenceTimeS / divisor)
	
	if (!isNaN(RelativeDate)) return rtf.format(RelativeDate, WordsTime[index])
	
}

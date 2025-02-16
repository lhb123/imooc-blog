/**
 * 将字符串转化成以k千为单位的字符
 * @param { String } val
 */
export function hotNumber(val) {
	const num = parseInt(val)
	if (num < 1000) return val
	val += ''
	return val.substring(0, val.length - 3) + 'k'
}
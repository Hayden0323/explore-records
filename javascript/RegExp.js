// 匹配http url
const httpReg = /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/([\w\.]*))*([\?&]\w+=\w+)*$/
// console.log(httpReg.test('https://www.baidu.com:8081/test.html'))
// console.log(httpReg.test('httpd://www.baidu.com'))
// console.log(httpReg.test('http://www.baidu.com:dhh'))
// console.log(httpReg.test('baidu.com?d=2'))

// 连续3个或3个以上的相同的字符
const wordReg = /(\w)\1{2,}/g
// console.log(wordReg.test('asdaddd3'))
// console.log('zaaap'.replace(wordReg, '*'))

// 匹配时间格式: 小时:分钟:秒
const timeReg = /^((0?|1)\d|2[0-3]):((0?|[1-5])\d):((0?|[1-5])\d)/
console.log(timeReg.test('12:23:32'))
console.log(timeReg.test('25:12:78'))
console.log(timeReg.test('12:34'))

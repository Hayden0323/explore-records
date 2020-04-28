/* 装饰者模式 */
// 以ajax请求为例

Function.prototype.before = function (beforefn) {
  let _self = this
  return function () {
    beforefn.apply(this, arguments)
    return _self.apply(this, arguments)
  }
}

let ajax = function (type, url, param) {
  console.log(param)
}

let getToken = function () {
  return 'Token'
}

ajax = ajax.before(function (type, url, param) {
  param.token = getToken()
})

ajax('get', 'http://xx.yy.com', { name: 'Hayden' })

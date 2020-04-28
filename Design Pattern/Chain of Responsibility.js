/* 职责链模式 */
// 以购买模式为例

let order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金订购，得到100优惠券')
  } else {
    return 'nextSuccessor'
  }
}

let order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金订购，得到50优惠券')
  } else {
    return 'nextSuccessor'
  }
}

let orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠券')
  } else {
    console.log('手机库存不足')
  }
}

Function.prototype.after = function (fn) {
  let self = this
  return function () {
    let ret = self.apply(this, arguments)
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments)
    }

    return ret
  }
}

let order = order500.after(order200).after(orderNormal)

order(1, true, 500)
order(2, true, 500)
order(1, false, 500)

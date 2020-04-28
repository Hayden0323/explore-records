/* 发布-订阅者模式（观察者模式）*/

class Observer {
  constructor() {
    this.subcribes = [] // 订阅回调函数集合
  }

  // 订阅
  subcribe(type, fn) {
    if (!this.subcribes[type]) {
      this.subcribes[type] = []
    }

    // 收集订阅者的处理函数
    typeof fn === 'function' && this.subcribes[type].push(fn)
  }

  // 发布  可能会携带一些发布信息
  publish() {
    let type = [].shift.call(arguments),
      fns = this.subcribes[type]

    // 不存在订阅类型 || 订阅时未传入处理函数
    if (!fns || !fns.length) {
      return
    }

    // 处理函数
    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments)
    }
  }

  // 删除订阅
  remove(type, fn) {
    // 删除全部
    if (typeof type === 'undefined') {
      this.subcribe = []
      return
    }

    let fns = this.subcribes[type]

    // 不存在订阅类型 || 订阅时未传入处理函数
    if (!fns || !fns.length) {
      return
    }

    // 未传入处理函数，则清空当前订阅所有回调处理
    if (typeof fn === 'undefined') {
      fns.length = 0
      return
    }

    // 删除处理函数
    for (let i = 0; i < fns.length; i++) {
      if (fns[i] === fn) {
        fns.splice(i, 1)
      }
    }
  }
}

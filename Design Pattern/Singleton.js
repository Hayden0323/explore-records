/* 单例模式 */

let getSingle = (fn) => {
  let res
  return () => {
    return res || (res = fn.apply(this, arguments))
  }
}

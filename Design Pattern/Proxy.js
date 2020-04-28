/* 代理模式 */
// 以虚拟代理为例

let synchronousFile = (id) => {
  console.log(`开始同步文件，id为： ${id}`)
}

let proxySynchronousFile = (() => {
  let cache = [], // 保存一段时间内需要同步的id
    timer // 定时器

  return (id) => {
    cache.push(id)
    if (timer) return // 保证不会覆盖已经启动的定时器

    timer = setTimeout(() => {
      synchronousFile(cache.join(',')) // 2秒后向本体发送需要同步的id集合
      clearTimeout(timer) // 清空定时器
      timer = null
      cache.length = 0 // 清空id集合
    }, 2000)
  }
})()

let checkbox = document.getElementsByTagName('input')

for (let i = 0, c; (c = checkbox[i++]); ) {
  c.onclick = () => {
    if (this.checked) {
      proxySynchronousFile(this.id)
    }
  }
}

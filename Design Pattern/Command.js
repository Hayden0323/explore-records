/* 命令模式 */
// 以按钮点击调用为例

let setCommand = (button, func) => {
  button.onclick = () => {
    func()
  }
}

let MenuBar = {
  refresh: () => {
    console.log('刷新菜单页面')
  },
}

let RefreshMenuBarCommand = (receiver) => {
  return () => {
    receiver.refresh()
  }
}

let refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)

setCommand(button1, refreshMenuBarCommand)

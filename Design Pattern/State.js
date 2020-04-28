/* 状态模式 */
// 以开关灯为例（基本）

let Light = function () {
  this.currentState = FSM.off // 设置当前状态
  this.button = null
}

Light.prototype.init = function () {
  let button = document.createElement('button'),
    self = this

  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)

  this.button.onclick = function () {
    self.currentState.buttonWasPressed.call(self) // 把请求委托给FSM状态机
  }
}

let FSM = {
  off: {
    buttonWasPressed: function () {
      console.log('关灯')
      this.button.innerHTML = '下一次按我是开灯'
      this.currentState = FSM.on
    },
  },
  on: {
    buttonWasPressed: function () {
      console.log('开灯')
      this.button.innerHTML = '下一次按我是开关灯'
      this.currentState = FSM.off
    },
  },
}

let light = new Light()
light.init()

// 以开关灯为例（面向对象和闭包互换）

let delegate = function (client, delegation) {
  return {
    buttonWasPressed: function () {
      // 将客户的操作委托给delegation对象
      return delegation.buttonWasPressed.apply(client, arguments)
    },
  }
}

let FSM1 = {
  off: {
    buttonWasPressed: function () {
      console.log('关灯')
      this.button.innerHTML = '下次我是开灯'
      this.currentState = this.onState
    },
  },
  on: {
    buttonWasPressed: function () {
      console.log('开灯')
      this.button.innerHTML = '下次我是关灯'
      this.currentState = this.offState
    },
  },
}

let Light1 = function () {
  this.offState = delegate(this, FSM1.off)
  this.onState = delegate(this, FSM1.on)
  this.currentState = this.offState
  this.button = null
}

Light1.prototype.init = function () {
  let button = document.createElement('button'),
    self = this

  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)
  this.button.onclick = function () {
    self.currentState.buttonWasPressed()
  }
}

let light1 = new Light1()
light1.init()

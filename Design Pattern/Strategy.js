/* 策略模式 */
// 以表单验证为例

// 策略对象
let strategies = {
  isNonEmpty: (value, errorMsg) => {
    if (value == '') {
      return errorMsg
    }
  },
  minLength: (value, length, errorMsg) => {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: (value, errorMsg) => {
    if (!/(1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  },
}

// Validator类
let Validator = () => {
  this.cache = []
}

Validator.prototype.add = (dom, rules) => {
  let self = this

  for (let i = 0, rule; (rule = rules[i++]); ) {
    let strategyAry = rule.strategy.split(':')
    let errorMsg = rule.errorMsg

    self.cache.push(() => {
      let strategy = strategyAry.shift()
      strategyAry.unshift(dom.value)
      strategyAry.push(errorMsg)
      return strategies[strategy].apply(dom, strategyAry)
    })
  }
}

Validator.prototype.start = () => {
  for (let i = 0, validatorFunc; (validatorFunc = this.caches[i++]); ) {
    let errorMsg = validatorFunc()
    if (errorMsg) {
      return errorMsg
    }
  }
}

// 用户调用
const registerForm = document.getElementById('registerForm')

let validataFunc = () => {
  let validator = new Validator()

  validator.add(registerForm.userName, [
    {
      strategy: 'isNonEmpty',
      errorMsg: '用户名不能为空',
    },
    {
      strategy: 'minLength: 10',
      errorMsg: '用户名长度不能少于10位',
    },
  ])

  validator.add(registerForm.password, [
    {
      strategy: 'minLength: 6',
      errorMsg: '密码长度不能少于6位',
    },
  ])

  validator.add(registerForm.phoneNumber, [
    {
      strategy: 'isMobile',
      errorMsg: '手机号码格式不正确',
    },
  ])

  let errorMsg = validator.start()
  return errorMsg
}

registerForm.onsubmit = () => {
  let errorMsg = validataFunc()

  if (errorMsg) {
    alert(errorMsg)
    return false
  }
}

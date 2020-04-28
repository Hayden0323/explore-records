/* 模板方法模式 */
// 以制作饮料为例

const Beverage = function (param) {
  let boilWater = function () {
    console.log('把水煮沸')
  }

  let brew =
    param.brew ||
    function () {
      throw new Error('必须传递brew方法')
    }

  let pourInCup =
    param.pourInCup ||
    function () {
      throw new Error('必须传递pourInCup方法')
    }

  let addCondiments =
    param.addCondiments ||
    function () {
      throw new Error('必须传递addCondiments方法')
    }

  let customerWantsCondiments =
    param.customerWantsCondiments ||
    function () {
      return true
    }

  let F = function () {}

  F.prototype.init = function () {
    boilWater()
    brew()
    pourInCup()
    if (customerWantsCondiments()) {
      addCondiments()
    }
  }

  return F
}

let Coffee = Beverage({
  brew: function () {
    console.log('用沸水冲泡咖啡')
  },
  pourInCup: function () {
    console.log('把咖啡倒进杯子')
  },
  addCondiments: function () {
    console.log('加糖和牛奶')
  },
  customerWantsCondiments: function () {
    return true
  },
})

let coffee = new Coffee()
coffee.init()

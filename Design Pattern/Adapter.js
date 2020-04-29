/* 适配器模式 */
// 以地图渲染为例

let googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图')
  },
}

let baiduMap = {
  display: function () {
    console.log('开始渲染百度地图')
  },
}

let baiduMapAdapter = {
  show: function () {
    return baiduMap.display()
  },
}

let renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show()
  }
}

renderMap(googleMap)
renderMap(baiduMap)

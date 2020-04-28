/* 迭代器模式 */
// 以选用上传控件为例

let getActiveUploadObj = () => {
  try {
    return new ActiveXObject('TXFTNActiveX.FTNUpload')
  } catch (e) {
    return false
  }
}

let getFlashUploadObj = () => {
  if (supportFlash()) {
    // supportFlash插件未提供
    let str = '<object type="application/x-shockwave-flash"></object>'
    return $(str).appendTo($('body'))
  }
  return false
}

let iteratorUploadObj = () => {
  for (let i = 0, fn; (fn = arguments[i++]); ) {
    let uploadObj = fn()
    if (uploadObj !== false) {
      return uploadObj
    }
  }
}

let uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj)

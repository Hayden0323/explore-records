/* 享元模式 */
// 以文件上传为例

let Upload = function (uploadType) {
  this.uploadType = uploadType
}

Upload.prototype.delFile = function (id) {
  uploadManager.setExternalState(id, this) // 把当前id的对应的对象的外部状态组装到共享对象中

  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom)
  }

  if (window.confirm(`确定要删除该文件吗？ ${this.fileName}`)) {
    return this.dom.parentNode.removeChild(this.dom)
  }
}

// 工厂进行对象实例化
let UploadFactory = (function () {
  let createdFlyWeightObjs = {}

  return {
    create: function (uploadType) {
      if (createdFlyWeightObjs[uploadType]) {
        return createdFlyWeightObjs[uploadType]
      }

      return (createdFlyWeightObjs[uploadType] = new Upload(uploadType))
    },
  }
})()

// uploadManager对象（外部状态）
let uploadManager = (function () {
  let uploadDatabase = {}

  return {
    add: function (id, uploadType, fileName, fileSize) {
      let flyWeightObj = UploadFactory.create(uploadType)
      let dom = document.createElement('div')
      dom.innerHTML =
        `<span>文件名称：${fileName}，文件大小：${fileSize}</span>` +
        `<button class='delFile'>删除</button>`
      dom.querySelector('.delFile').onclick = function () {
        flyWeightObj.delFile(id)
      }
      document.body.appendChild(dom)
      uploadDatabase[id] = {
        fileName,
        fileSize,
        dom,
      }
      return flyWeightObj
    },
    setExternalState: function(id, flyWeightObj) {
      let uploadData = uploadDatabase[id],
      for (let i in uploadData) {
        flyWeightObj[i] = uploadData[i]
      }
    }
  }
})()

// 开始上传
let id = 0
window.startUpload = function(uploadType, files) {
  for (let i = 0; i < files.length; i++) {
    let uploadObj = uploadManager.add(++id, uploadType, files[i].fileName, files[i].fileSize)
  }
}

startUpload('plugin',[{
  fileName:'1.txt',
  fileSize: 1000
},{
  fileName:'2.html',
  fileSize: 3000
},{
  fileName:'3.txt',
  fileSize: 5000
}])

startUpload('plugin',[{
  fileName:'4.txt',
  fileSize: 1000
},{
  fileName:'5.html',
  fileSize: 3000
},{
  fileName:'6.txt',
  fileSize: 5000
}])
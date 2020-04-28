/* 组合模式 */
// 以扫描文件夹为例

let Folder = function (name) {
  this.name = name
  this.parent = null
  this.files = []
}

Folder.prototype.add = function (file) {
  file.parent = this
  this.files.push(file)
}

Folder.prototype.scan = function () {
  console.log(`开始扫描文件夹：${this.name}`)
  for (let i = 0; i < this.files.length; i++) {
    this.files[i].scan()
  }
}

Folder.prototype.remove = function () {
  if (!this.parent) {
    return
  }

  for (let i = 0; i < this.parent.files.length; i++) {
    let file = this.parent.files[i]
    if (file == this) {
      this.parent.files.splice(i, 1)
    }
  }
}

let File = function (name) {
  this.name = name
  this.parent = null
}

File.prototype.add = function (file) {
  throw new Error(`${this.name}文件下面不能添加文件：${file.name}`)
}

File.prototype.scan = function () {
  console.log(`开始扫描文件：${this.name}`)
}

File.prototype.remove = function () {
  if (!this.parent) {
    return
  }

  for (let i = 0; i < this.parent.files.length; i++) {
    let file = this.parent.files[i]
    if (file == this) {
      this.parent.files.splice(i, 1)
    }
  }
}

let folder = new Folder('学习资料')
let folder1 = new Folder('JS资料')
let folder2 = new Folder('Vue资料')

let file1 = new File('JS设计模式')
let file2 = new File('JS高阶函数')
let file3 = new File('Vue数据双向绑定')
let file4 = new File('算法与数据结构')

folder1.add(file1)
folder1.add(file2)
folder2.add(file3)

folder.add(folder1)
folder.add(folder2)
folder.add(file4)

folder2.remove()

folder.scan()

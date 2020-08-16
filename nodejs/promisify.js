const Promise = function () {
  EventEmitter.call(this)
}
// nodejs 内置注册事件
util.inherits(Promise, EventEmitter)

Promise.prototype.then = function (
  fulfilledHandler,
  errorHandler,
  progressHandler
) {
  if (typeof fulfilledHandler === 'function') {
    this.once('success', fulfilledHandler)
  }

  if (typeof errorHandler === 'function') {
    this.once('error', errorHandler)
  }

  if (typeof progressHandler === 'function') {
    this.on('progress', progressHandler)
  }

  return this
}

const Deferred = function () {
  this.state = 'unfulfilled'
  this.promise = new Promise()
}

Deferred.prototype.resolve = function (obj) {
  this.state = 'fulfilled'
  this.promise.emit('success', obj)
}

Deferred.prototype.reject = function (err) {
  this.state = 'failed'
  this.promise.emit('error', err)
}

Deferred.prototype.progress = function (data) {
  this.promise.emit('progress', data)
}

// promisify封装
const promisify = function (res) {
  const deferred = new Deferred()
  let result = ''

  res.on('data', function (chunk) {
    result += chunk
    deferred.progress(chunk)
  })

  res.on('end', function () {
    deferred.resolve(result)
  })

  res.on('error', function () {
    deferred.reject(error)
  })

  return deferred.promise
}

// 使用
promisify(res).then(
  function () {
    // 成功
  },
  function (err) {
    // 失败
  },
  function (chunk) {
    console.log('BODY: ' + chunk)
  }
)

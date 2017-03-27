'use strict'

export default {
  get (url) {
    let request = new window.XMLHttpRequest()
    let data = {}
    let p = {
      then: (fn1, fn2) => p.done(fn1).fail(fn2),
      catch: (fn) => p.fail(fn),
      always: (fn) => p.done(fn).fail(fn)
    }
    let statuses = ['done', 'fail']
    statuses.forEach(name => {
      data[name] = []
      p[name] = (fn) => {
        if (fn instanceof Function) data[name].push(fn)
        return p
      }
    })
    p.done(JSON.parse)
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        let e = {status: request.status}
        if (request.status === 200) {
          try {
            let response = request.responseText
            for (let i in data.done) {
              let value = data.done[i](response)
              if (value !== undefined) {
                response = value
              }
            }
          } catch (err) {
            data.fail.forEach(fail => fail(err))
          }
        } else {
          data.fail.forEach(fail => fail(e))
        }
      }
    }
    request.open('GET', url)
    request.setRequestHeader('Accept', 'application/json')
    request.send()
    return p
  }
}

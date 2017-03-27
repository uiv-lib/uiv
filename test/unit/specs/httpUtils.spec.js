import utils from '@/utils/httpUtils.js'

describe('httpUtils', () => {
  let xhr, requests, server

  before(function () {
    xhr = sinon.useFakeXMLHttpRequest()
    requests = []
    xhr.onCreate = function (req) {
      requests.push(req)
    }
    server = sinon.fakeServer.create()
  })

  after(function () {
    xhr.restore()
    server.restore()
  })

  it('should be able to get with success callback', () => {
    let then = sinon.spy()
    let always = sinon.spy()
    utils.get('/some/path')
      .then(then)
      .always(always)
    server.requests[0].respond(
      200,
      {'Content-Type': 'application/json'},
      JSON.stringify([{id: 1, text: 'Provide examples', done: true}])
    )
    sinon.assert.called(then)
    sinon.assert.called(always)
  })
})

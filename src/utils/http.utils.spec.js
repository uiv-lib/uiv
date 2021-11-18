import * as utils from './http.utils';
import sinon from 'sinon';

describe('http.utils', () => {
  describe('#request ', () => {
    let xhr, requests, server;

    beforeEach(function () {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      xhr.onCreate = function (req) {
        requests.push(req);
      };
      server = sinon.fakeServer.create();
    });

    afterEach(function () {
      xhr.restore();
      server.restore();
    });

    it('should be able to get with success callback', () => {
      const then = sinon.spy();
      const always = sinon.spy();
      utils.request('/some/path').then(then).always(always);
      server.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify([{ id: 1, text: 'Provide examples', done: true }])
      );
      sinon.assert.called(then);
      sinon.assert.called(always);
    });

    it('should be able to post with success callback', () => {
      const then = sinon.spy();
      const always = sinon.spy();
      utils.request('/some/path', 'POST').then(then).always(always);
      server.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify([{ id: 1, text: 'Provide examples', done: true }])
      );
      sinon.assert.called(then);
      sinon.assert.called(always);
    });

    it('should be able to get with fail callback', () => {
      const then = sinon.spy();
      const err = sinon.spy();
      const always = sinon.spy();
      utils.request('/some/path').then(then).catch(err).always(always);
      server.requests[0].respond(
        500,
        { 'Content-Type': 'application/json' },
        JSON.stringify([{ id: 1, text: 'Provide examples', done: true }])
      );
      sinon.assert.called(err);
      sinon.assert.called(always);
    });
  });
});

import Vue from 'vue'
import TypeaheadDoc from '@/docs/pages/TypeaheadDoc.vue'

describe('TypeaheadDoc', () => {
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

  it('should be able to mount and destroy', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      vm.$destroy()
      done()
    })
  })

  it('should be able to open typeahead when input change', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelectorAll('li').length).to.equal(3)
        let selected = dropdown.querySelector('li.active a')
        expect(selected.textContent).to.equal('Alabama')
        done()
      })
    })
  })

  it('should be able to open typeahead on input focus', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      let typeahead = vm.$refs.typeahead1
      // input.focus()
      typeahead.inputFocused()
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelectorAll('li').length).to.equal(3)
        let selected = dropdown.querySelector('li.active a')
        expect(selected.textContent).to.equal('Alabama')
        done()
      })
    })
  })

  it('should not be able to open typeahead on input focus if set param to false', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.openOnFocus = false
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      let typeahead = vm.$refs.typeahead1
      typeahead.inputFocused()
      vm.$nextTick(() => {
        expect(dropdown.className).not.contain('open')
        done()
      })
    })
  })

  it('should be able to close typeahead on input blur', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      let typeahead = vm.$refs.typeahead1
      // input.focus()
      typeahead.inputFocused()
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        typeahead.inputBlured()
        vm.$nextTick(() => {
          expect(dropdown.className).not.contain('open')
          done()
        })
      })
    })
  })

  it('should not close typeahead on input click', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      let typeahead = vm.$refs.typeahead1
      // input.focus()
      typeahead.inputFocused()
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        input.click()
        typeahead.$refs.dropdown.windowClicked({target: input})
        vm.$nextTick(() => {
          expect(dropdown.className).to.contain('open')
          done()
        })
      })
    })
  })

  it('should be able to close typeahead on window click', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      let typeahead = vm.$refs.typeahead1
      // input.focus()
      typeahead.inputFocused()
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        input.click()
        typeahead.$refs.dropdown.windowClicked({target: document.createElement('div')})
        vm.$nextTick(() => {
          expect(dropdown.className).not.contain('open')
          done()
        })
      })
    })
  })

  it('should be able to use string arrays as data', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.states = vm.states.map(v => v.name)
    vm.itemKey = ''
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelectorAll('li').length).to.equal(3)
        let selected = dropdown.querySelector('li.active a')
        expect(selected.textContent).to.equal('Alabama')
        selected.click()
        vm.$nextTick(() => {
          expect(dropdown.className).to.not.contain('open')
          expect(input.value).to.equal('Alabama')
          expect(vm.model1).to.equal('Alabama')
          done()
        })
      })
    })
  })

  it('should be able to close typeahead when input change to empty', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        input.value = ''
        vm.$refs.typeahead1.inputChanged() // can't auto detect event
        vm.$nextTick(() => {
          expect(dropdown.className).to.not.contain('open')
          done()
        })
      })
    })
  })

  it('should be able to slice item length', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'a'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelectorAll('li').length).to.equal(10)
        let selected = dropdown.querySelector('li.active a')
        expect(selected.textContent).to.equal('Alabama')
        done()
      })
    })
  })

  it('should not open dropdown if nothing match', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'asdasdasdasd'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(dropdown.className).to.not.contain('open')
        done()
      })
    })
  })

  it('should be able to select item', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelectorAll('li').length).to.equal(3)
        let selected = dropdown.querySelector('li.active a')
        expect(selected.textContent).to.equal('Alabama')
        selected.click()
        vm.$nextTick(() => {
          expect(dropdown.className).to.not.contain('open')
          expect(input.value).to.equal('Alabama')
          expect(vm.model1.name).to.equal('Alabama')
          done()
        })
      })
    })
  })

  it('should be able to use force select', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.forceSelect = true
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(vm.model1).not.exist
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelectorAll('li').length).to.equal(3)
        let selected = dropdown.querySelector('li.active a')
        expect(selected.textContent).to.equal('Alabama')
        selected.click()
        vm.$nextTick(() => {
          expect(dropdown.className).to.not.contain('open')
          expect(input.value).to.equal('Alabama')
          expect(vm.model1.name).to.equal('Alabama')
          done()
        })
      })
    })
  })

  it('should not be able to select item using keyboard while dropdown not open', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      let event = {keyCode: 13}
      vm.$refs.typeahead1.inputKeyPressed(event)
      vm.$nextTick(() => {
        expect(dropdown.className).to.not.contain('open')
        expect(input.value).to.equal('')
        done()
      })
    })
  })

  it('should be able to select item using keyboard', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelectorAll('li').length).to.equal(3)
        let selected = dropdown.querySelector('li.active a')
        expect(selected.textContent).to.equal('Alabama')
        let event = {keyCode: 13}
        vm.$refs.typeahead1.inputKeyPressed(event)
        vm.$nextTick(() => {
          expect(dropdown.className).to.not.contain('open')
          expect(input.value).to.equal('Alabama')
          expect(vm.model1.name).to.equal('Alabama')
          done()
        })
      })
    })
  })

  it('should be able use keyboard nav to go next', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelectorAll('li').length).to.equal(3)
        let selected = dropdown.querySelector('li.active a')
        expect(selected.textContent).to.equal('Alabama')
        let event = {keyCode: 40}
        vm.$refs.typeahead1.inputKeyPressed(event)
        vm.$nextTick(() => {
          let selected = dropdown.querySelector('li.active a')
          expect(selected.textContent).to.equal('Alaska')
          let event = {keyCode: 40}
          vm.$refs.typeahead1.inputKeyPressed(event)
          vm.$refs.typeahead1.inputKeyPressed(event)
          vm.$nextTick(() => {
            let selected = dropdown.querySelector('li.active a')
            expect(selected.textContent).to.equal('Palau')
            done()
          })
        })
      })
    })
  })

  it('should be able use keyboard nav to go prev', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelectorAll('li').length).to.equal(3)
        let selected = dropdown.querySelector('li.active a')
        expect(selected.textContent).to.equal('Alabama')
        let event = {keyCode: 40}
        vm.$refs.typeahead1.inputKeyPressed(event)
        vm.$refs.typeahead1.inputKeyPressed(event)
        vm.$refs.typeahead1.inputKeyPressed(event)
        vm.$nextTick(() => {
          let selected = dropdown.querySelector('li.active a')
          expect(selected.textContent).to.equal('Palau')
          let event = {keyCode: 38}
          vm.$refs.typeahead1.inputKeyPressed(event)
          vm.$nextTick(() => {
            let selected = dropdown.querySelector('li.active a')
            expect(selected.textContent).to.equal('Alaska')
            let event = {keyCode: 38}
            vm.$refs.typeahead1.inputKeyPressed(event)
            vm.$refs.typeahead1.inputKeyPressed(event)
            vm.$nextTick(() => {
              let selected = dropdown.querySelector('li.active a')
              expect(selected.textContent).to.equal('Alabama')
              done()
            })
          })
        })
      })
    })
  })

  it('should be able to not ignore case', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.ignoreCase = false
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelectorAll('li').length).to.equal(1)
        let selected = dropdown.querySelector('li.active a')
        expect(selected.textContent).to.equal('Palau')
        input.value = 'Ala'
        vm.$refs.typeahead1.inputChanged() // can't auto detect event
        vm.$nextTick(() => {
          expect(dropdown.className).to.contain('open')
          expect(dropdown.querySelectorAll('li').length).to.equal(2)
          let selected = dropdown.querySelector('li.active a')
          expect(selected.textContent).to.equal('Alabama')
          done()
        })
      })
    })
  })

  it('should be able to match start', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.matchStart = true
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[0]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
      expect(dropdown.className).to.not.contain('open')
      input.value = 'ala'
      vm.$refs.typeahead1.inputChanged() // can't auto detect event
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelectorAll('li').length).to.equal(2)
        done()
      })
    })
  })

  it('should be able to use async typeahead', (done) => {
    const Constructor = Vue.extend(TypeaheadDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelectorAll('[data-role=input]')[1]
      let dropdown = vm.$el.querySelectorAll('.dropdown')[1]
      expect(dropdown.className).to.not.contain('open')
      // matches don't work in here
      let savedMatches = Element.prototype.matches
      Element.prototype.matches = () => true
      input.value = 'wxsm'
      vm.$refs.typeahead2.inputChanged() // can't auto detect event
      setTimeout(() => {
        server.requests[0].respond(
          200,
          {'Content-Type': 'application/json'},
          JSON.stringify({items: [{login: 'wxsms'}]})
        )
        vm.$nextTick(() => {
          expect(dropdown.className).to.contain('open')
          expect(dropdown.querySelectorAll('li').length).to.equal(1)
          let selected = dropdown.querySelector('li.active a span')
          expect(selected.textContent).to.equal('wxsms')
          Element.prototype.matches = savedMatches
          done()
        })
      }, 600)
    })
  })
})

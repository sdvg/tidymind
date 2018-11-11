import { without } from 'lodash'

const KEYMAP = {
  enter: 13,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  j: 74,
}

let instances = []

const emitShortcut = (name, event) => {
  instances.forEach(instance => {
    const { shortcuts } = instance.$options

    if (shortcuts && typeof shortcuts[name] === `function`) {
      shortcuts[name].call(instance, event)
    }
  })
}

const handleKeydownEvent = event => {
  if (event.which === KEYMAP.j && event.metaKey) emitShortcut(`switchPanel`, event)
  else if (event.which === KEYMAP.enter) emitShortcut(`enter`, event)
  else if (event.which === KEYMAP.esc) emitShortcut(`esc`, event)
  else if (event.which === KEYMAP.space) emitShortcut(`space`, event)
  else if (event.which === KEYMAP.up) emitShortcut(`up`, event)
  else if (event.which === KEYMAP.down) emitShortcut(`down`, event)
}

document.addEventListener(`keydown`, handleKeydownEvent)

export default {
  created () {
    instances.push(this)
  },
  destroyed () {
    instances = without(instances, this)
  },
}
export { handleKeydownEvent } // allows handing events from iframes

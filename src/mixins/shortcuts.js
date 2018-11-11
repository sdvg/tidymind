import { without } from 'lodash'

const KEYMAP = {
  esc: 27,
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
  if (event.which === KEYMAP.j && event.metaKey) {
    emitShortcut(`switchPanel`, event)
  } else if (event.which === KEYMAP.esc) {
    emitShortcut(`esc`, event)
  }
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

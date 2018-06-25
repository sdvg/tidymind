/* eslint-env jest */

import { shallowMount } from '@vue/test-utils'
import ExpandTransition from './ExpandTransition.vue'

describe(`ExpandTransition`, () => {
  it(`renders the slot`, () => {
    const wrapper = shallowMount(ExpandTransition, {
      slots: {
        default: `<p>Some content</p>`
      }
    })

    expect(wrapper.text()).toBe(`Some content`)
  })
})

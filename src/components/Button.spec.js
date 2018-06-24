/* eslint-env jest */

import { shallowMount } from '@vue/test-utils'
import Button from './Button.vue'

describe(`Button`, () => {
  let consoleErrorSpy

  beforeEach(() => {
    consoleErrorSpy = global.console.error = jest.fn()
  })

  it(`has a default type attribute`, () => {
    const wrapper = shallowMount(Button)

    expect(wrapper.attributes().type).toBe(`button`)
  })

  it(`can have a custom type attribute`, () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: `submit`
      }
    })

    expect(wrapper.attributes().type).toBe(`submit`)
  })

  it(`can have a title attribute`, () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        title: `Click me!`
      }
    })

    expect(wrapper.attributes().title).toBe(`Click me!`)
  })

  it(`renders the title as content when no slot is defined`, () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        title: `Click me!`
      }
    })

    expect(wrapper.text()).toBe(`Click me!`)
  })

  it(`renders the slot as content`, () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: `Click me!`
      }
    })

    expect(wrapper.text()).toBe(`Click me!`)
  })

  it(`has the class "primary" when no theme is defined`, () => {
    const wrapper = shallowMount(Button)

    expect(wrapper.classes()).toContain(`primary`)
  })

  it(`allows only whitelisted themes`, () => {
    shallowMount(Button, {
      propsData: {
        theme: `doesnt-exist`
      }
    })

    expect(consoleErrorSpy).toBeCalled()
  })

  it(`emits an event on click`, () => {
    const wrapper = shallowMount(Button)

    wrapper.trigger(`click`)

    expect(wrapper.emitted().onClick).toBeTruthy()
  })
})

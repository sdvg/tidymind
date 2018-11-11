/* eslint-env jest */

import tinymce from 'tinymce'
import RichTextEditor from './RichTextEditor'
import { shallowMount } from '@vue/test-utils'

jest.mock(`tinymce/themes/modern/theme`, () => {})
jest.mock(`tinymce/skins/lightgray/skin.min.css`, () => {})
jest.mock(`tinymce/skins/lightgray/content.min.css`, () => {})
jest.mock(`tinymce`, () => ({
  init: jest.fn(),
  remove: jest.fn(),
}))

describe(`RichTextEditor`, () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(RichTextEditor, {
      propsData: {
        document: {
          content: ``,
        },
      },
    })
  })

  it(`initializes tinyMCE on mount`, () => {
    expect(tinymce.init).toHaveBeenCalled()
  })

  it(`removes tinyMCE on destroy`, () => {
    wrapper.destroy()
    expect(tinymce.remove).toHaveBeenCalled()
  })
})

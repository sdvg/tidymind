/* eslint-env jest */

import { dateFilter } from './date'

describe(`date filter`, () => {
  it(`formats a date`, () => {
    const formattedDate = dateFilter(new Date(2018, 2, 6, 9, 30))

    expect(formattedDate).toBe(`2018-03-06 09:30`)
  })

  it(`returns the input value when it's an invalid date`, () => {
    const formattedDate = dateFilter(`nope`)

    expect(formattedDate).toBe(`nope`)
  })

  it(`returns the input value when it's undefined`, () => {
    const formattedDate = dateFilter(undefined)

    expect(formattedDate).toBe(undefined)
  })

  it(`returns the input value when it's null`, () => {
    const formattedDate = dateFilter(null)

    expect(formattedDate).toBe(null)
  })
})

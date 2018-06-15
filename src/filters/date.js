import Vue from 'vue'
import moment from 'moment'

export const dateFilter = value => {
  const momentObject = moment(value)

  if (value && momentObject.isValid()) {
    return momentObject.format(`YYYY-MM-DD HH:mm`)
  } else {
    console.warn(`[date filter] invalid date format: `, value)

    return value
  }
}

Vue.filter(`date`, dateFilter)

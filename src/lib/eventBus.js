/* @see https://alligator.io/vuejs/global-event-bus/ */

import Vue from 'vue'

export const events = {
  IFRAME_CLICK: `documentClick`, // emitted when something inside a third-party iframe gets clicked
}
export default new Vue()

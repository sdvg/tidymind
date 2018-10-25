/* https://coolaj86.com/articles/typedarray-buffer-to-base64-in-javascript/ */

import { Unibabel } from 'unibabel'

export const ivLen = 16 // the IV is always 16 bytes

export const stringToArrayBuffer = string => {
  const encoder = new TextEncoder(`utf-8`)

  return encoder.encode(string)
}

export const bufferToPaddedBase64 = buffer => {
  let base64String = Unibabel.bufferToBase64(buffer)
    .replace(/-/g, `+`)
    .replace(/_/g, `/`)

  while (base64String.length % 4) {
    base64String += `=`
  }

  return base64String
}

export const bufferToBase64 = buffer => {
  const binaryString = Array
    .from(buffer)
    .map(character => String.fromCharCode(character))
    .join(``)

  return btoa(binaryString)
}

export const base64ToBuffer = base64String => {
  const binaryString = atob(base64String)
  const buffer = new Uint8Array(binaryString.length)

  Array.from(binaryString).forEach((character, index) => {
    buffer[index] = character.charCodeAt(0)
  })

  return buffer
}

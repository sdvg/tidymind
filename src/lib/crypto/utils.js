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

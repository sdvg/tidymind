import { bufferToBase64 } from './utils'

export default async key => {
  const arrayBuffer = await window.crypto.subtle.exportKey(`raw`, key)
  const typedArray = new Uint8Array(arrayBuffer)

  return bufferToBase64(typedArray)
}

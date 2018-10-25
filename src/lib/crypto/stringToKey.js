import { base64ToBuffer } from './utils'

export default base64Key => {
  const typedArray = base64ToBuffer(base64Key)

  return window.crypto.subtle.importKey(
    `raw`,
    typedArray.buffer,
    { name: `AES-CBC` },
    false,
    [`encrypt`, `decrypt`]
  )
}

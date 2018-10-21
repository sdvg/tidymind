/* https://coolaj86.com/articles/webcrypto-encrypt-and-decrypt-with-aes/ */

import { Unibabel } from 'unibabel'
import { bufferToPaddedBase64, ivLen } from './utils'

function separateIvFromData (buffer) {
  const iv = new Uint8Array(ivLen)
  const data = new Uint8Array(buffer.length - ivLen)

  Array.from(buffer).forEach((byte, index) => {
    if (index < ivLen) {
      iv[index] = byte
    } else {
      data[index - ivLen] = byte
    }
  })
  return { iv, data }
}

export default async (string, encryptionKey) => {
  const buffer = Unibabel.base64ToBuffer(string)
  const parts = separateIvFromData(buffer)

  const decrypted = await window.crypto.subtle.decrypt(
    { name: `AES-CBC`, iv: parts.iv },
    encryptionKey,
    parts.data
  )
  const base64String = bufferToPaddedBase64(new Uint8Array(decrypted))

  return Unibabel.base64ToUtf8(base64String)
}

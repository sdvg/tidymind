/* https://coolaj86.com/articles/webcrypto-encrypt-and-decrypt-with-aes/ */

import { stringToArrayBuffer, bufferToPaddedBase64, ivLen } from './utils'

function joinIvAndData (iv, data) {
  const buffer = new Uint8Array(iv.length + data.length)

  Array.from(iv).forEach((byte, index) => {
    buffer[index] = byte
  })

  Array.from(data).forEach((byte, index) => {
    buffer[ivLen + index] = byte
  })

  return buffer
}

export default async (string, encryptionKey) => {
  const initializationVector = new Uint8Array(ivLen)

  window.crypto.getRandomValues(initializationVector)

  const encrypted = await window.crypto.subtle.encrypt(
    { name: `AES-CBC`, iv: initializationVector },
    encryptionKey,
    stringToArrayBuffer(string)
  )
  const ciphered = joinIvAndData(initializationVector, new Uint8Array(encrypted))

  return bufferToPaddedBase64(ciphered)
}

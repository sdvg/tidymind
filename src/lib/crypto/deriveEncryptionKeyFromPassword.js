/* https://infotechinc.github.io/password-based-key-derivation-in-browser/pbkdf2.js */

import { cryptoDeriveKeySalt as salt } from '../appConfig'
import { stringToArrayBuffer } from './utils'

export default async password => {
  const iterations = 200000
  const hash = `SHA-512`

  const baseKey = await window.crypto.subtle.importKey(
    `raw`,
    stringToArrayBuffer(password),
    { name: `PBKDF2` },
    false,
    [`deriveKey`]
  )

  const isExtractable = true
  const usages = [`encrypt`, `decrypt`]

  return window.crypto.subtle.deriveKey(
    {
      name: `PBKDF2`,
      salt: stringToArrayBuffer(salt),
      iterations,
      hash,
    },
    baseKey,
    { name: `AES-CBC`, length: 128 },
    isExtractable,
    usages
  )
}

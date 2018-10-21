import hoodie from './hoodie'
import store from '../store/'
import { deriveEncryptionKeyFromPassword } from '../lib/crypto/'

export const signInAndDeriveEncryptionKey = async credentials => {
  await hoodie.account.signIn(credentials)

  const encryptionKey = await deriveEncryptionKeyFromPassword(credentials.password)

  store.commit(`crypto/setEncryptionKey`, encryptionKey)
}

import Hoodie from '@hoodie/client'
import PouchDB from 'pouchdb-browser'

const hoodie = new Hoodie({
  url: `http://localhost:8081`,
  PouchDB,
})

if (process.env.NODE_ENV === `development`) {
  window.hoodie = hoodie
}

export default hoodie

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Library from '@/components/Library/Library'
import Document from '@/components/Document/Document'

Vue.use(Router)

export default new Router({
  mode: `history`,
  routes: [
    {
      path: `/`,
      name: `home`,
      component: Home
    },
    {
      path: `/library`,
      name: `library`,
      component: Library,
      children: [
        {
          path: `:documentId`,
          name: `library.document`,
          component: Document
        }
      ]
    }
  ]
})

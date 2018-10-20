import Vue from 'vue'
import Document from '@/components/Document/Document'
import Home from '@/components/Home'
import Library from '@/components/Library/Library'
import Router from 'vue-router'
import SignUp from '@/components/SignUp/SignUp'
import SignIn from '@/components/SignIn/SignIn'

Vue.use(Router)

export default new Router({
  mode: `history`,
  routes: [
    {
      path: `/`,
      name: `home`,
      component: Home,
    },
    {
      path: `/library`,
      name: `library`,
      component: Library,
      children: [
        {
          path: `:documentId`,
          name: `library.document`,
          component: Document,
        },
      ],
    },
    {
      path: `/sign-up`,
      name: `signUp`,
      component: SignUp,
    },
    {
      path: `/sign-in`,
      name: `signIn`,
      component: SignIn,
    },
  ],
})

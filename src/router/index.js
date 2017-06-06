import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Image from '@/components/Image'
import VueResource from 'vue-resource'
import PicturePreview from '@/components/PicturePreview'
Vue.use(Router);
Vue.use(VueResource);
export default new Router({
    mode:'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
      {
        path:'/image',
          name:'Image',
          component:Image
      },
      {
        path:'/img_preview',
          name:'PicturePreview',
          component:PicturePreview
      }
  ]
})

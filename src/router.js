
import Vue from 'vue';
import Router from 'vue-router';
import BlogPostCard from './components/BlogPostCard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/post/1'
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: BlogPostCard,
      props: true
    }
  ]
});

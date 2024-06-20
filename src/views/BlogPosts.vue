<template>
    <div class="blog-posts">
      <h1>Blog Posts</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <transition-group name="fade" tag="div" class="posts-container">
        <BlogPostCard v-for="post in posts" :key="post.id" :post="post" />
      </transition-group>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import BlogPostCard from '../components/BlogPostCard.vue';
  
  export default {
    name: 'BlogPosts',
    components: {
      BlogPostCard
    },
    data() {
      return {
        posts: [],
        loading: true
      };
    },
    created() {
      axios.get('http://localhost:3000/posts')
        .then(response => {
          this.posts = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error('There was an error fetching the posts:', error);
          this.loading = false;
        });
    }
  }
  </script>
  
  <style scoped>
  .blog-posts {
    text-align: center;
    margin-top: 40px;
    color: #333; /* Gri închis */
  }
  .loading {
    font-size: 24px;
    color: #007BFF; /* Albastru */
  }
  .posts-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active în v2.x */ {
    opacity: 0;
  }
  </style>
  
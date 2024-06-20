<template>
    <div>
      <transition name="slide" mode="out-in">
        <div class="blog-post-card" key="post.id">
          <img :src="imageSrc" alt="Featured Image" class="featured-image" />
          <div class="post-content">
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
          </div>
        </div>
      </transition>
      <div class="navigation-buttons">
        <button @click="goToPreviousPost">Previous</button>
        <button @click="goToNextPost">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        post: {}
      };
    },
    computed: {
      imageSrc() {
        
        if (this.post.id === 3) {
          return require('@/assets/web-logo.png');
        }
        if (this.post.id === 1) {
          return require('@/assets/development.png');
        }
        
        return this.post.image;
      }
    },
    methods: {
      fetchPost() {
        axios.get(`http://localhost:3000/posts/${this.id}`)
          .then(response => {
            this.post = response.data;
          })
          .catch(error => {
            console.error('There was an error fetching the post:', error);
          });
      },
      goToPreviousPost() {
        const previousId = this.id - 1;
        if (previousId > 0) {
          this.$router.push({ name: 'Post', params: { id: previousId } });
        }
      },
      goToNextPost() {
        const nextId = this.id + 1;
        axios.get(`http://localhost:3000/posts/${nextId}`)
          .then(response => {
            if (response.data) {
              this.$router.push({ name: 'Post', params: { id: nextId } });
            }
          })
          .catch(error => {
            console.error('No more posts:', error);
          });
      }
    },
    watch: {
      id: 'fetchPost'
    },
    created() {
      this.fetchPost();
    }
  }
  </script>
  
  <style scoped>
  .blog-post-card {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 20px;
    margin: 20px auto;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    align-items: center;
    width: 60%;
  }
  .blog-post-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .featured-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .post-content {
    flex-grow: 1;
    text-align: justify;
  }
  h2 {
    color: #007BFF;
    margin: 0;
    text-align: left;
  }
  p {
    color: #333;
    margin: 5px 0 0;
  }
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color: #0056b3;
  }
  .slide-enter-active, .slide-leave-active {
    transition: transform 0.5s;
  }
  .slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
    transform: translateX(100%);
  }
  .slide-leave-active {
    transform: translateX(-100%);
  }
  </style>
  
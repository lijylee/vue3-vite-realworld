<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <!-- <a class="nav-link disabled" href>Your Feed</a> -->
                  <router-link
                    class="nav-link"
                    :class="{disabled: feedDisable}"
                    :to="{name:'Home',query:{feed:'YourFeed'}}"
                  >Your Feed</router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    :class="{disabled: feedDisable}"
                    :to="{name:'Home',query:{feed:'GlobalFeed'}}"
                  >Global Feed</router-link>
                </li>
              </ul>
            </div>

            <template v-for="article in articles">
              <div class="article-preview">
                <div class="article-meta">
                  <router-link :to="{ name:'Profile',params:{ username:article.author.username } }">
                    <img :src="article.author.image" />
                  </router-link>
                  <div class="info">
                    <router-link
                      :to="{ name:'Profile',params:{ username:article.author.username } }"
                      class="author"
                    >{{ article.author.username }}</router-link>
                    <span class="date">{{ article.createdAt }}</span>
                  </div>
                  <button class="btn btn-outline-primary btn-sm pull-xs-right">
                    <i class="ion-heart"></i>
                    {{ article.favoritesCount }}
                  </button>
                </div>
                <a href class="preview-link">
                  <h1>{{ article.title }}</h1>
                  <p>{{ article.description }}</p>
                  <span>Read more...</span>
                </a>
              </div>
            </template>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <a href class="tag-pill tag-default">programming</a>
                <a href class="tag-pill tag-default">javascript</a>
                <a href class="tag-pill tag-default">emberjs</a>
                <a href class="tag-pill tag-default">angularjs</a>
                <a href class="tag-pill tag-default">react</a>
                <a href class="tag-pill tag-default">mean</a>
                <a href class="tag-pill tag-default">node</a>
                <a href class="tag-pill tag-default">rails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useArticle } from '@/composable/useArticle.js';
import { ref, watch } from 'vue';

const route = useRoute();
const feedDisable = ref(false);

const { articles, fetchArticles, fetchFeedArticles } = useArticle();
watch(
  () => route.query.feed,
  (newValue, oldValue) => {
    if (newValue === oldValue) {
      return;
    }
    feedDisable.value = true;
    const fetchFn = newValue === 'YourFeed' ? fetchFeedArticles : fetchArticles;
    fetchFn().then(() => {
      feedDisable.value = false;
    });
  }
);
</script>

<style scoped>
</style>
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
                    :class="{disabled: feedDisable, active: !tag && feed === 'YourFeed'}"
                    :to="{name:'Home',query:{feed:'YourFeed'}}"
                  >Your Feed</router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    :class="{disabled: feedDisable, active: !tag && feed === 'GlobalFeed'}"
                    :to="{name:'Home',query:{feed:'GlobalFeed'}}"
                  >Global Feed</router-link>
                </li>
                <li class="nav-item" v-if="tag">
                  <router-link
                    class="nav-link"
                    :class="{disabled: feedDisable, active: tag}"
                    :to="{name:'Home',query:{'tag':tag}}"
                  >{{ tag }}</router-link>
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
                    <span class="date">{{ dateFormat(article.createdAt) }}</span>
                  </div>
                  <button
                    class="btn btn-sm pull-xs-right"
                    :class="[article.favorited ? 'btn-primary':'btn-outline-primary']"
                    :disabled="article.disabled"
                    @click="handleFavorite(article)"
                  >
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
                <router-link
                  v-for="tag in tags"
                  :to="{name:'Home',query:{'tag':tag}}"
                  class="tag-pill tag-default"
                >{{ tag }}</router-link>
              </div>
            </div>
          </div>

          <nav>
            <ul class="pagination">
              <li class="page-item" v-for="count in totalPage" :class="{ active: page === count }">
                <router-link
                  class="page-link ng-binding"
                  :to="{name:'Home',query:{
                  feed,
                  tag,
                  page:count,
                  limit
                }}"
                >{{ count }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { useArticle } from '@/composable/useArticle.js';
import { getTags } from '@/api/tag.js';
import { postFavorites, deleteFavorites } from '@/api/favorites.js';

const route = useRoute();
const feedDisable = ref(false);
const tags = ref([]);
getTags().then(({ data }) => {
  tags.value = data.tags;
});
const tag = computed(() => route.query.tag || undefined);
const feed = computed(() => route.query.feed || 'GlobalFeed');
const page = computed(() => Number(route.query.page) || 1);
const limit = computed(() => Number(route.query.limit) || 10);
const { articles, articlesCount } = useArticle({
  tag,
  feed,
  page,
  limit,
  feedDisable,
});
const totalPage = computed(() => Math.ceil(articlesCount.value / limit.value));
const dateFormat = (str) => dayjs(str).format('MMMM D,YYYY');
const handleFavorite = async (article) => {
  const index = articles.value.findIndex((item) => item === article);
  articles.value[index].disabled = true;
  const { data } = article.favorited
    ? await deleteFavorites(article.slug)
    : await postFavorites(article.slug);
  articles.value[index] = data.article;
  articles.value[index].disabled = false;
};
</script>

<style scoped>
</style>
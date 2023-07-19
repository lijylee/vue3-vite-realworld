<template>
  <div class="article-meta">
    <a href>
      <img :src="article.author.image" />
    </a>
    <div class="info">
      <router-link
        :to="{name:'Profile',params:{username:article.author.username}}"
        class="author"
      >{{article.author.username}}</router-link>
      <span class="date">{{dateFormat(article.updatedAt)}}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      @click="handleFollow(article)"
      :disabled="followDisabled"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ (article.author.following ? 'UnFollow ' : 'Follow ') + article.author.username }}
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="[article.favorited ? 'btn-primary':'btn-outline-primary']"
      :disabled="favoriteDisabled"
      @click="handleFavoritePost(article)"
    >
      <i class="ion-heart"></i>
      &nbsp; {{ article.favorited ? 'UnFavorite Post' : "Favorite Post" }}
      <span
        class="counter"
      >({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { dateFormat } from '@/utils/format.js';
import { unFollowUser, followUser } from '@/api/profile';
import { postFavorites, deleteFavorites } from '@/api/favorites.js';
const { article } = defineProps(['article']);
const followDisabled = ref(false);
const favoriteDisabled = ref(false);
async function handleFollow(article) {
  followDisabled.value = true;
  const fn = article.author.following ? unFollowUser : followUser;
  await fn(article.author.username);
  article.author.following = !article.author.following;
  followDisabled.value = false;
}
async function handleFavoritePost(article) {
  favoriteDisabled.value = true;
  let fn = postFavorites;
  let factor = 1;
  article.favorited && (fn = deleteFavorites, factor = -1)

  await fn(article.slug);
  article.favorited = !article.favorited;
  article.favoritesCount += factor;
  favoriteDisabled.value = false;
}
</script>

<style scoped>
</style>
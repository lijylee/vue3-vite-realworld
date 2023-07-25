<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn" @click="handleEditFollow">
              <i class="ion-plus-round"></i>
              &nbsp; {{ isMe ? 'Edit Profile Settings' : ((following ? 'UnFollow ' : 'Follow ') + profile.username) }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active:myArticleActive}"
                  :to="{name:'Profile',params:{'username':username},query:{tab:'my'}}"
                >My Articles</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active:!myArticleActive}"
                  :to="{name:'Profile',params:{'username':username},query:{tab:'favorite'}}"
                >Favorited Articles</router-link>
              </li>
            </ul>
          </div>
          <div class="article-meta">
            <div class="article-preview" v-for="article in articles">
              <router-link :to="{name:'Profile',params:{username:article.author.username}}">
                <img :src="article.author.image" />
              </router-link>
              <div class="info">
                <router-link
                  :to="{name:'Profile',params:{username:article.author.username}}"
                  class="author"
                >{{article.author.username}}</router-link>
                <span class="date">{{dateFormat(article.updatedAt)}}</span>
              </div>
              <router-link :to="{name:'Article',params:{slug:article.slug}}" class="preview-link">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProfile } from '@/composable/useProfile';
import { getArticles } from '@/api/article.js';
import { getUserFromStorage } from '@/utils/storage';
import { dateFormat } from '@/utils/format.js';

const route = useRoute();
const router = useRouter();
const username = ref(route.params.username);
const { profile, following, handleFollowUser, handleUnFollowUser } =
  useProfile(username);
const user = getUserFromStorage();
const isMe = computed(() => user && user.username === profile.value.username);
const handleEditFollow = () => {
  if (isMe.value) {
    return router.push('/settings');
  } else {
    const fn = following.value ? handleUnFollowUser : handleFollowUser;
    fn(username.value);
  }
};

const myArticleActive = ref(true);
const articles = ref([]);
async function handleMyArticle() {
  try {
    const { data } = await getArticles({ author: username.value });
    articles.value = data.articles;
    myArticleActive.value = true;
  } catch (error) {
    console.log(error);
  }
}

async function handleFavoritedArticle() {
  try {
    const { data } = await getArticles({ favorited: username.value });
    articles.value = data.articles;
    myArticleActive.value = false;
  } catch (error) {
    console.log(error);
  }
}

watch(
  () => route.query.tab,
  () => {
    if (route.query.tab === 'favorite') {
      handleFavoritedArticle();
    } else {
      handleMyArticle();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
</style>
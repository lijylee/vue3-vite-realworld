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
                <a class="nav-link active" href>My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href>Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href>
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </a>
              <div class="info">
                <a href class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href>
                <img src="http://i.imgur.com/N4VcUeJ.jpg" />
              </a>
              <div class="info">
                <a href class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href class="preview-link">
              <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProfile } from '@/composable/useProfile';
import { getUserFromStorage } from '@/utils/storage';

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
</script>

<style scoped>
</style>
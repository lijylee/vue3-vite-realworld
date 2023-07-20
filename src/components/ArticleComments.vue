<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
            v-model="comment"
          ></textarea>
        </div>
        <div class="card-footer">
          <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
          <button
            class="btn btn-sm btn-primary"
            @click="handleCreateComment(slug, comment)"
          >Post Comment</button>
        </div>
      </form>

      <div class="card" v-for="comment in comments">
        <div class="card-block">
          <p class="card-text">{{ comment.body }}</p>
        </div>
        <div class="card-footer">
          <a href class="comment-author">
            <img :src="comment.author.image" class="comment-author-img" />
          </a>
          &nbsp;
          <a href class="comment-author">{{ comment.author.username }}</a>
          <span class="date-posted">{{ dateFormat(comment.updatedAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { dateFormat } from '@/utils/format.js';
import { getComments, createComment } from '@/api/comment.js';
const { slug } = defineProps(['slug']);

const comments = ref([]);
async function handleGetComments(slug) {
  try {
    const { data } = await getComments(slug);
    comments.value = data.comments;
  } catch (error) {
    console.log(error);
  }
}

// 获取文章所有评论
handleGetComments(slug);

const comment = ref('');
async function handleCreateComment(slug, comment) {
  try {
    await createComment(slug, comment);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
</style>
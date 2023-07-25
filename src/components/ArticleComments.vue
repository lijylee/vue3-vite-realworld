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
          <img :src="userImage" class="comment-author-img" />
          <button
            type="button"
            class="btn btn-sm btn-primary"
            @click="handleCreateComment(slug)"
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
          <span
            class="mod-options"
            v-if="user.username === comment.author.username"
            @click="handleDeleteComment(slug, comment.id)"
          >
            <i class="ion-trash-a"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUserFromStorage } from '@/utils/storage.js';
import { dateFormat } from '@/utils/format.js';
import useComment from '@/composable/useComment.js';
const { slug } = defineProps(['slug']);

const user = getUserFromStorage();
const userImage = user?.image;

const {
  comment,
  comments,
  handleGetComments,
  handleCreateComment,
  handleDeleteComment,
} = useComment();

// 获取文章所有评论
handleGetComments(slug);
</script>

<style scoped>
</style>
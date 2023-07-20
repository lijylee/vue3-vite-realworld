<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="articleContent"></div>
      </div>
      <ul class="tag-list">
        <!-- ngRepeat: tag in ::$ctrl.article.tagList -->
        <li v-for="tag in article.tagList" class="tag-default tag-pill tag-outline">{{ tag }}</li>
      </ul>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>

      <ArticleComments :slug="slug" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ArticleMeta from '../components/ArticleMeta.vue';
import ArticleComments from '../components/ArticleComments.vue';
import useArticle from '../composable/useArticle';

const route = useRoute();

const slug = computed(() => route.params.slug);
const { article, articleContent } = useArticle(slug);
</script>

<style scoped>
</style>
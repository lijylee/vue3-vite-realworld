<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="newTag"
                  @keypress.enter.prevent="handleAddTag"
                />
                <div class="tag-list" v-for="tag in article.tagList">
                  <span class="tag-default tag-pill">
                    <i class="ion-close-round" @click="handleDeleteTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="handleOperateArticle"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { getArticle, createArticle, updateArticle } from '@/api/article.js';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const article = reactive({
  title: '',
  description: '',
  body: '',
  tagList: [],
});
const slug = computed(() => route.params.slug);
if (slug.value) {
  getArticle(slug.value).then(({ data }) => {
    const editorArticle = data.article;
    article.title = editorArticle.title;
    article.description = editorArticle.description;
    article.body = editorArticle.body;
    article.tagList = editorArticle.tagList;
  });
}
async function handleCreateArticle() {
  try {
    const { data } = await createArticle(article);
    const { article: newArticle } = data;
    router.push({ name: 'Article', params: { slug: newArticle.slug } });
  } catch (error) {
    console.log(error);
  }
}

async function handleUpdateArticle() {
  try {
    const { data } = await updateArticle(slug.value, article);
    const { article: newArticle } = data;
    router.push({ name: 'Article', params: { slug: newArticle.slug } });
  } catch (error) {
    console.log(error);
  }
}

function handleOperateArticle() {
  if (slug.value) {
    handleUpdateArticle();
  } else {
    handleCreateArticle;
  }
}

const newTag = ref('');
function handleAddTag() {
  article.tagList.push(newTag.value.trim());
  newTag.value = '';
}
function handleDeleteTag(tag) {
  article.tagList = article.tagList.filter((item) => item !== tag);
}
</script>

<style scoped>
</style>
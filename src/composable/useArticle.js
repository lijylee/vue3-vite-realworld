import { ref, watch } from 'vue';
import { marked } from 'marked';
import { mangle } from "marked-mangle";
import { getArticle } from '@/api/article.js';

export default function useArticle(slug) {
  const article = ref({ author: { username: '' } });
  const articleContent = ref('');
  const fetchArticle = async slug => {
    try {
      const { data } = await getArticle(slug.value);
      article.value = data.article;
      marked.use(mangle());
      articleContent.value = marked.parse(data.article.body);
    } catch (error) {
      console.log(error);
    }
  };
  watch(slug, () => {
    fetchArticle(slug);
  }, { immediate: true });
  return {
    article,
    articleContent,
    fetchArticle
  };
}
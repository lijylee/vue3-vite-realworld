import { ref } from 'vue';
import { getArticles, getFeedArticles } from '@/api/article.js';

export function useArticle() {
  const articles = ref([]);
  const fetchArticles = async (params) => {
    try {
      const { data } = await getArticles(params);
      articles.value = data.articles;
    } catch (error) {
      console.log(error);
    }
  };
  fetchArticles();

  const fetchFeedArticles = async (params) => {
    try {
      const { data } = await getFeedArticles(params);
      articles.value = data.articles;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    articles,
    fetchArticles,
    fetchFeedArticles
  };
}


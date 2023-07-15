import { ref } from 'vue';
import { getArticles, getFeedArticles } from '@/api/article.js';

export function useArticle() {
  const articles = ref([]);
  const articlesCount = ref(0);
  const fetchArticles = async (params) => {
    try {
      const { data } = await getArticles(params);
      articles.value = data.articles;
      articlesCount.value = data.articlesCount;
    } catch (error) {
      console.log(error);
    }
  };

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
    articlesCount,
    fetchArticles,
    fetchFeedArticles
  };
}


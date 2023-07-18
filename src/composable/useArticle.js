import { ref, watch } from 'vue';
import { getArticles, getFeedArticles } from '@/api/article.js';

export function useArticle({ tag, feed, page, limit, feedDisable }) {
  const articles = ref([]);
  const articlesCount = ref(0);
  const fetchArticles = async (params) => {
    try {
      const { data } = await getArticles(params);
      articles.value = data.articles;
      articles.value.forEach((element) => {
        element.disabled = false;
      });
      articlesCount.value = data.articlesCount;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFeedArticles = async (params) => {
    try {
      const { data } = await getFeedArticles(params);
      articles.value = data.articles;
      articles.value.forEach((element) => {
        element.disabled = false;
      });
      articlesCount.value = data.articlesCount;
    } catch (error) {
      console.log(error);
    }
  };

  const generateParams = () => {
    return {
      tag: tag.value,
      offset: (page.value - 1) * limit.value,
    };
  };

  const doFetchArticles = () => {
    const params = generateParams();
    const fetchFn = feed.value === 'YourFeed' ? fetchFeedArticles : fetchArticles;
    feedDisable.value = true;
    fetchFn(params).then(() => {
      feedDisable.value = false;
    });
  };

  watch(feed, doFetchArticles, { immediate: true });
  watch(page, doFetchArticles, { immediate: true });
  watch(tag, doFetchArticles, { immediate: true });
  watch(limit, doFetchArticles, { immediate: true });

  return {
    articles,
    articlesCount
  };
}


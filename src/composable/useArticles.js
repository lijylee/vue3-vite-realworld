import { ref, watch } from 'vue';
import { getArticles, getFeedArticles } from '@/api/article.js';

export function useArticles({ tag, feed, page, limit, feedDisable }) {
  const articles = ref([]);
  const totalPage = ref(0);
  const fetchArticles = async (params) => {
    try {
      const { data } = await getArticles(params);
      articles.value = data.articles;
      articles.value.forEach((element) => {
        element.disabled = false;
      });
      totalPage.value = Math.ceil(data.articlesCount / limit.value);
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
      totalPage.value = Math.ceil(data.articlesCount / limit.value);
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
  doFetchArticles();

  watch(feed, doFetchArticles);
  watch(page, doFetchArticles);
  watch(tag, doFetchArticles);
  watch(limit, doFetchArticles);

  return {
    articles,
    totalPage
  };
}


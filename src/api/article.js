import request from '@/utils/request.js';

export const getArticles = params => {
  return request.get('/articles', {
    params
  });
};

export function getFeedArticles(params) {
  return request.get('/articles/feed', {
    params
  });
}

export function getArticle(slug) {
  return request.get(`/articles/${slug}`);
}
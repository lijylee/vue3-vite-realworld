import request from '@/utils/request.js';

export function getComments(slug) {
  return request.get(`/articles/${slug}/comments`);
}

export function createComment(slug, comment) {
  return request.post(`/articles/${slug}/comments`, {
    comment
  });
}

export function deleteComment(slug, id) {
  return request.delete(`/articles/${slug}/comments/${id}`);
}
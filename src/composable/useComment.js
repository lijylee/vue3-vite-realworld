import { ref } from 'vue';
import { getComments, createComment, deleteComment } from '@/api/comment.js';

export default function useComment() {
  // 所有的评论列表
  const comments = ref([]);
  // 当前评论
  const comment = ref('');

  /**
   * 获取所有评论
   * @param {*} slug 文章的slug
   */
  async function handleGetComments(slug) {
    try {
      const { data } = await getComments(slug);
      comments.value = data.comments;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 创建文章评论
   * @param {*} slug 文章的slug
   */
  async function handleCreateComment(slug) {
    try {
      const { data } = await createComment(slug, comment.value);
      const { comment: resComment } = data;
      comments.value.push(resComment);
      comment.value = '';
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 删除评论
   * @param {*} slug 文章slug
   * @param {*} id 评论id
   */
  async function handleDeleteComment(slug, id) {
    try {
      await deleteComment(slug, id);
      const index = comments.value.findIndex((item) => item.id === id);
      comments.value.splice(index, 1);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    comment,
    comments,
    handleGetComments,
    handleCreateComment,
    handleDeleteComment
  };
}
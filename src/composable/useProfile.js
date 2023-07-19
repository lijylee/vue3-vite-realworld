import { ref, watch } from 'vue';
import { getProfile, unFollowUser, followUser } from '@/api/profile';

export function useProfile(username) {
  let profile = ref({});
  let following = ref(false);
  const fetchProfile = async () => {
    try {
      const { data } = await getProfile(username.value);
      profile.value = data.profile;
      following.value = profile.value.following;
    } catch (error) {
      console.log(error);
    }
  };

  async function handleFollowUser(username) {
    try {
      await followUser(username);
      following.value = true;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUnFollowUser(username) {
    try {
      await unFollowUser(username);
      following.value = false;
    } catch (error) {
      console.log(error);
    }
  }

  watch(username, fetchProfile, { immediate: true });

  return {
    profile,
    fetchProfile,
    following,
    handleFollowUser,
    handleUnFollowUser
  };
}


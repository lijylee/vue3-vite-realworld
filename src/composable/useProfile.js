import { ref, watch } from 'vue';
import { getProfile } from '../api/profile';

export function useProfile(username) {
  let profile = ref({});
  const fetchProfile = async () => {
    const { data } = await getProfile(username.value);
    profile.value = data.profile;
  };

  watch(username, fetchProfile, { immediate: true });

  return {
    profile,
    fetchProfile
  };
}


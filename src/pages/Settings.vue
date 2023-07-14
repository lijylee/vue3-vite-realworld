<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  v-model="user.image"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="user.username"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="handleUpdateUser(user)"
              >Update Settings</button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getUserFromStorage } from '@/utils/storage.js';
import { updateUser } from '@/api/user.js';
import { saveUserToStorage } from '@/utils/storage.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(getUserFromStorage());
const handleUpdateUser = (user) => {
  updateUser(user).then(({ data }) => {
    const { user } = data;
    saveUserToStorage(user);
    router.push(`/profile/${user.username}`);
  });
};
</script>

<style scoped>
</style>
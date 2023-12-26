<template>
  <div class="auth-content">
    <div class="auth-content_switcher">
      <div
        class="auth-content_switcher__item"
        @click="active = 1"
        :class="{ active: active == 1 }"
      >
        Авторизация
      </div>
      <div
        class="auth-content_switcher__item"
        @click="active = 2"
        :class="{ active: active == 2 }"
      >
        Регистрация
      </div>
    </div>
    <div v-if="active == 1">
      <Login />
    </div>
    <div v-else>
      <Reg />
    </div>
  </div>
</template>

<script lang="ts">
import Login from "./LoginForm.vue";
import Reg from "./RegForm.vue";
import { ref } from "vue";
export default {
  components: {
    Login,
    Reg,
  },
  setup() {
    const active = ref(1);
    return {
      active,
    };
  },
};
</script>

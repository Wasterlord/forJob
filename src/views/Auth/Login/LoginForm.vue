<template>
  <div class="auth-content_form">
    <div class="header">
      Добро пожаловать на новостной портал для сотрудников «ПартКом»
    </div>
    <div class="number" style="margin-top: 3rem">
      <div class="number_text">Номер мобильного телефона</div>
      <div class="number_inupt">
        <input type="text"  v-model="phone" v-maska="'# (###) ###-##-##'"  placeholder="8 (000) 000-00-00" />
      </div>
    </div>
    <div class="password" style="margin-top: 1.2rem">
      <div class="number_text">Введите пароль</div>
      <div class="number_inupt">
        <input type="password" @keydown.enter="login" v-model="password" />
      </div>
    </div>
    <button @click="login"  :disabled="!(password.length > 2 && clearPhone.length > 10)">Войти в аккаунт</button>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { ref, computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const phone = ref("");
    const password = ref("");
    const clearPhone = computed(() => {
      return phone.value.replace(/[()+-\s]/g, "");
    });

    const login = () => {
      store.dispatch("login", { phone: clearPhone.value, password: password.value }).then(res => {
        store.commit('setSuccess', 'Успешная авторизация')
      }).catch(error => {
        console.log('error')
      })
    };
    return {
      phone,
      password,
      clearPhone,
      login,
    };
  },
};
</script>

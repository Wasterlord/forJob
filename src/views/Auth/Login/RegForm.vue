<template>
  <div class="auth-content_form">
    <div class="header">
      Добро пожаловать на новостной портал для сотрудников «ПартКом»
    </div>
    <div class="number" style="margin-top: 3rem">
      <div class="number_text">Номер мобильного телефона</div>
      <div class="number_inupt">
        <input
          type="text"
          v-model="phone"
          v-maska="'8 (###) ###-##-##'"
          placeholder="8 (000) 000-00-00"
        />
        <div v-if="phone.clearPhone < 10 && checkInputs">
          Неверный формат номера
        </div>
      </div>
    </div>
    <div class="password" style="margin-top: 1.2rem">
      <div class="number_text">Введите пароль</div>
      <div class="number_inupt">
        <input type="password" v-model="password" />
        <div v-if="password.length < 4 && checkInputs">
          Слишком короткий пароль
        </div>
      </div>
    </div>
    <div class="password" style="margin-top: 1.2rem">
      <div class="number_text">Повторите пароль</div>
      <div class="number_inupt">
        <input @keydown.enter="login" type="password" v-model="passwordConfirm" />
        <div v-if="!passwordsSame && checkInputs">Пароли не совпадают</div>
      </div>
    </div>
    <button
      @click="registration"
      :disabled="
        !(passwordsSame && clearPhone.length > 10 && password.length > 2)
      "
    >
      Зарегистрироваться
    </button>
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
    const checkInputs = ref(false);
    const passwordConfirm = ref("");
    const inputsValid = computed(() => {
      return passwordsSame && phone.value.length > 10;
    });
    const clearPhone = computed(() => {
      return phone.value.replace(/[()+-\s]/g, "");
    });
    const passwordsSame = computed(() => {
      return (
        password.value.length > 0 && password.value == passwordConfirm.value
      );
    });
    const login = () => {
      store.dispatch("login", { phone: clearPhone.value, password: password.value }).then(res => {
        console.log("data from login", 'sucseess')
      }).catch(error => {
      })
    };
    const registration = () => {
      if (inputsValid) {
        store
          .dispatch("registration", {
            phone: clearPhone.value,
            password: password.value,
          })
          .then(() => {
            store.commit('setSuccess', 'Успешная регистрация')
            login();
          });
      } else {
        checkInputs.value = true;
      }
    };
    return {
      phone,
      password,
      passwordConfirm,
      registration,
      login,
      inputsValid,
      passwordsSame,
      checkInputs,
      clearPhone,
    };
  },
};
</script>

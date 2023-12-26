<template>
  <div class="profile" v-if="resolvedValue">
    <div class="profile_header__outer">
      <div class="profile_header">
        <div class="profile_header__img">
          <label for="uppic">
            <div class="container_profile_img">
              <img
                :src="avatar ? avatar : '/assets/images/face.jpg'"
                alt="profile"
              />
            </div>
          </label>
          <input
            type="file"
            name="avatar"
            id="uppic"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            @change="onFileChange"
            ref="avatarInput"
            class="uppic"
          />

          <label for="uppic" class="small_icon_profile">
            <img src="/assets/images/camera.svg" alt="profile" />
          </label>
        </div>

        <div class="profile_header__name">
          <div v-if="name">{{ name + " " + surname }}</div>
          <div class="role" v-if="position">{{ position }}</div>
        </div>
      </div>
      <div class="switcher">
        <div
          class="switcher_item"
          :class="{ active: activeSwitch == 'profile' }"
          @click="changeSwitch('profile')"
        >
          Личные данные
        </div>
        <div
          class="switcher_item"
          :class="{ active: activeSwitch == 'history' }"
          @click="changeSwitch('history')"
        >
          История заявок
        </div>
        <div
          class="switcher_item"
          :class="{ active: activeSwitch == 'documents' }"
          @click="changeSwitch('documents')"
        >
          Документы
        </div>
        <div
          class="switcher_item"
          :class="{ active: activeSwitch == 'holidays' }"
          @click="changeSwitch('holidays')"
        >
          Отпуска
        </div>
      </div>
    </div>
    <div class="switcher-content">
      <div class="profile_main__outer" v-if="activeSwitch == 'profile'">
        <div>
          <div class="profile_main__header">Редактирование личных данных</div>
          <div class="profile_main">
            <div class="profile_main__item">
              <div class="item_name">Ваше имя</div>
              <div class="item_input">
                <input
                  type="text"
                  disabled
                  placeholder="Ваше имя"
                  v-model="name"
                />
              </div>
            </div>
            <div class="profile_main__item">
              <div class="item_name">Ваша фамилия</div>
              <div class="item_input">
                <input
                  type="text"
                  disabled
                  placeholder="Ваша фамилия"
                  v-model="surname"
                />
              </div>
            </div>
            <div class="profile_main__item">
              <div class="item_name">Ваше отчество</div>
              <div class="item_input">
                <input
                  type="text"
                  disabled
                  placeholder="Ваше отчество"
                  v-model="middlename"
                />
              </div>
            </div>
            <div class="profile_main__item">
              <div class="item_name">Номер телефона</div>
              <div class="item_input">
                <input type="text" v-model="phone" disabled="true" />
              </div>
            </div>
            <!-- <div class="profile_main__item">
              <div class="item_name">Основной отпуск</div>
              <div class="item_input">
                <input type="text" v-model="basic_vacation" disabled="true" />
              </div>
            </div>
            <div class="profile_main__item">
              <div class="item_name">Дополнительный отпуск</div>
              <div class="item_input">
                <input type="text" v-model="additional_vacation" disabled="true" />
              </div>
            </div> -->
            <!-- <div class="profile_main__item">
              <div class="item_name">Город работы</div>
              <div class="item_input">
                 <input type="text" v-model="city" disabled="true" />
              </div>
            </div> -->
            <!-- <div class="profile_main__item">
              <div class="item_name">Отдел работы</div>
              <div class="item_input">
                <select name="city" disabled v-model="department">
                  <option value="null" hidden>Выберите отдел</option>
                  <option
                    :value="dep.id"
                    v-for="dep in departaments"
                    :key="`department-${dep.id}`"
                  >
                    {{ dep.name }}
                  </option>
                </select>
              </div>
            </div> -->
          </div>
        </div>
        <div class="profile_bottom">
          <button :disabled="blockupdate" @click="setProfileInfo">
            Сохранить изменения
          </button>
        </div>
      </div>
      <div v-else-if="activeSwitch == 'history'" class="history">
        <History />
      </div>
       <div v-else-if="activeSwitch == 'holidays'" class="holidays">
        <Holidays :basicVacation="basic_vacation" :additionalVacation="additional_vacation" />
      </div>
      <div v-else class="documents">
        <Documents />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import History from "./History.vue";
import Documents from "./Documents.vue";
import Holidays from "./Holidays.vue";
export default {
  name: "Profile",
  components: {
    History,
    Documents,
    Holidays
  },
  setup() {
    const store = useStore();
    const dataResolved = ref(false);
    const activeSwitch = ref("profile");
    const getProfileInfo = () => {
      store.dispatch("getProfile").then((res) => {
        let info = res.data.data.profile;
        surname.value = info.surname;
        name.value = info.name;
        middlename.value = info.middlename;
        basic_vacation.value = info.basic_vacation;
        additional_vacation.value = info.additional_vacation;
        phone.value = info.phone_number;
        department.value = info.department;
        position.value = info.position;
        avatar.value = info.avatar;
        dataResolved.value = true;
        loadFinish(false);
      });
    };
    const changeSwitch = (value) => {
      activeSwitch.value = value;
    };
    const resolvedValue = computed(() => {
      return dataResolved.value;
    });
    const departaments = computed(() => {
      return store.state.departments;
    });
    const user = computed(() => {
      return store.state.user;
    });
    const errorSize = computed(() => {
      return store.state.sizeError;
    });
    const userName = computed(() => {
      return user.value.name;
    });
    const uploadAvatar = async () => {
      await store
        .dispatch("uploadAvatar", {
          avatar: image.value,
        })
        .then((res) => {
          avatarBeforeLoad.value = res.data.data[0].icon;
          blockupdate.value = false;
        });
    };
    const loadFinish = (status) => {
      store.commit("changeLoader", status);
    };
    const clearPhone = computed(() => {
      return phone.value.replace(/[()+-\s]/g, "");
    });
    const setProfileInfo = () => {
      store
        .dispatch("updateProfile", {
          surname: surname.value,
          name: name.value,
          middlename: middlename.value,
          basic_vacation: basic_vacation.value,
          additional_vacation: additional_vacation.value,
          phone_number: phone.value,
          department: department.value,
          city: city.value,
          avatar: avatarBeforeLoad.value
            ? avatarBeforeLoad.value
            : avatar.value,
        })
        .then(() => {
          store.commit("setSuccess", "Данные изменены");
          getProfileInfo();
        });
    };
    onBeforeMount(() => {
      loadFinish(true);
    });
    onMounted(() => {
      getProfileInfo();
    });
    const city = ref(null);
    const avatarBeforeLoad = ref(null);
    const department = ref(null);
    const position = ref("");
    const name = ref("");
    const surname = ref("");
    const middlename = ref("");
    const basic_vacation = ref("");
    const additional_vacation = ref("");
    const phone = ref("");
    const blockupdate = ref(false);
    const avatar: any = ref(null);
    const image: any = ref(null);
    const onFileChange = (e) => {
      blockupdate.value = true;
      let files = e.target.files || e.dataTransfer.files;
      image.value = e.target.files[0];
      uploadAvatar().then(() => {
        if (!errorSize.value) {
          reader.readAsDataURL(files[0]);
        }
      });
      blockupdate.value = false;
      if (!files.length) return;
      let reader = new FileReader();
      reader.onload = function (e) {
        avatar.value = reader.result;
      };
      store.commit("setErrorSize", false);
    };

    return {
      city,
      department,
      userName,
      resolvedValue,
      name,
      surname,
      middlename,
      basic_vacation,
      additional_vacation,
      position,
      phone,
      onFileChange,
      uploadAvatar,
      avatar,
      departaments,
      getProfileInfo,
      setProfileInfo,
      blockupdate,
      changeSwitch,
      activeSwitch,
    };
  },
};
</script>

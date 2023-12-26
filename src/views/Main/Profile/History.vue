<template>
  <div class="history_container">
    <div class="history_switcher d-flex">
      <div
        class="history_switcher__item"
        @click="activeTab = 'all'"
        :class="{ active: activeTab == 'all' }"
      >
        Все заявки
      </div>
      <div
        class="history_switcher__item"
        @click="activeTab = 'my'"
        :class="{ active: activeTab == 'my' }"
      >
        Мои заявки
      </div>
      <div
        class="history_switcher__item"
        @click="activeTab = 'friend'"
        :class="{ active: activeTab == 'friend' }"
      >
        Для друзей
      </div>
    </div>
    <div class="history_main">
      <div class="history_main__header">
        <div class="left d-flex">
          <!-- <input
            type="checkbox"
            class="mr-25"
            v-model="allSwitcher"
            @change="toggleSwitcher"
          /> -->
          <!-- <div class="icons d-flex mr-20">
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              class="mr-10"
            >
              <path
                d="M8.00065 1.33301L10.0607 5.50634L14.6673 6.17967L11.334 9.42634L12.1207 14.013L8.00065 11.8463L3.88065 14.013L4.66732 9.42634L1.33398 6.17967L5.94065 5.50634L8.00065 1.33301Z"
                stroke="#E3E3E3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              class="mr-10"
            >
              <path
                d="M2.66732 2.66699H13.334C14.0673 2.66699 14.6673 3.26699 14.6673 4.00033V12.0003C14.6673 12.7337 14.0673 13.3337 13.334 13.3337H2.66732C1.93398 13.3337 1.33398 12.7337 1.33398 12.0003V4.00033C1.33398 3.26699 1.93398 2.66699 2.66732 2.66699Z"
                stroke="#E3E3E3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.6673 4L8.00065 8.66667L1.33398 4"
                stroke="#E3E3E3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              class="mr-10"
            >
              <path
                d="M2 4H3.33333H14"
                stroke="#E3E3E3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.33398 3.99967V2.66634C5.33398 2.31272 5.47446 1.97358 5.72451 1.72353C5.97456 1.47348 6.3137 1.33301 6.66732 1.33301H9.33398C9.68761 1.33301 10.0267 1.47348 10.2768 1.72353C10.5268 1.97358 10.6673 2.31272 10.6673 2.66634V3.99967M12.6673 3.99967V13.333C12.6673 13.6866 12.5268 14.0258 12.2768 14.2758C12.0267 14.5259 11.6876 14.6663 11.334 14.6663H4.66732C4.3137 14.6663 3.97456 14.5259 3.72451 14.2758C3.47446 14.0258 3.33398 13.6866 3.33398 13.333V3.99967H12.6673Z"
                stroke="#E3E3E3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.66602 7.33301V11.333"
                stroke="#E3E3E3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.33398 7.33301V11.333"
                stroke="#E3E3E3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div> -->
          <div class="pages d-flex">
            <div>
              1-{{
                ordersOnPage > filtredOrders.length
                  ? filtredOrders.length
                  : ordersOnPage
              }}
              из {{ orders.length }}
            </div>
            <svg
              width="14"
              height="14"
              style="transform: rotate(180deg)"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 10.5L8.75 7L5.25 3.5"
                stroke="#6A6B6D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 10.5L8.75 7L5.25 3.5"
                stroke="#6A6B6D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div class="right">
          <div>
            Показывать по
            <select class="mx-10" v-model="ordersOnPage">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            сообщений
          </div>
        </div>
      </div>
      <div class="history_main__list">
        <div class="list_item" v-for="item in filtredOrders" :key="item.id">
          <!-- <input
            type="checkbox"
            class="mr-10"
            :value="item.id"
            v-model="item.checked"
          /> -->
          <!-- <svg
            style="margin-bottom: 0.2rem"
            width="16"
            height="15"
            @click="makeFavorite(item.id)"
            viewBox="0 0 16 15"
            :fill="item.favorite ? `rgb(255, 169, 64)` : '#FFF'"
            class="mr-10"
          >
            <path
              d="M8.00065 1.33301L10.0607 5.50634L14.6673 6.17967L11.334 9.42634L12.1207 14.013L8.00065 11.8463L3.88065 14.013L4.66732 9.42634L1.33398 6.17967L5.94065 5.50634L8.00065 1.33301Z"
              :stroke="item.favorite ? `rgb(255, 169, 64)` : '#E3E3E3'"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg> -->
          <div class="list_item__main">
            <div class="main-header">
              <div class="main-header_name">
                {{ `Заявка #${item.id} / VIN ${item.vin_code} / ${item.city}` }}
              </div>
              <div class="main-header_date">
                {{ getDate(item.created_date) }} в
                {{ getTime(item.created_date) }}
              </div>
            </div>
            <div class="main-body">{{ item.text }}</div>
            <div class="main-bottom">
              <router-link
                style="text-decoration: none"
                :to="{
                  name: 'sales',
                  params: {
                    vin: item.vin_code,
                    city: item.city,
                    friendName: item.friend_name,
                    friendPhone: item.friend_phone,
                  },
                }"
              >
                <div class="action">Повторить запрос</div>
              </router-link>
              <!-- <div class="cancel">Отменить запрос</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const activeTab = ref("all");
    const ordersOnPage = ref("10");
    const allSwitcher = ref(false);
    const test = ref([]);
    onMounted(() => {
      getOrdersHistory();
    });
    const getOrdersHistory = () => {
      let data = {
        page: 1,
        limit: ordersOnPage.value,
      };
      store.dispatch("getOrdersHistory", data).then((res) => {
        console.log(res.data);
      });
    };
    const getDate = (date) => {
      return moment(date).format("DD.MM.YY");
    };

    const getTime = (date) => {
      return moment(date).format("hh:mm");
    };
    const filtredOrders = computed(() => {
      if (activeTab.value == "all") {
        return orders.value;
      } else {
        return orders.value.filter((i) => i.type == activeTab.value);
      }
    });
    const checkedOrders = computed(() => {
      return orders.value.filter((i) => i.checked == true).map((j) => j.id);
    });
    const toggleSwitcher = () => {
      if (allSwitcher.value) {
        for (let i = 0; filtredOrders.value.length > i; i++) {
          filtredOrders.value[i].checked = true;
        }
      } else {
        for (let i = 0; filtredOrders.value.length > i; i++) {
          filtredOrders.value[i].checked = false;
        }
      }
      // if (allSwitcher) {
      //   filtredOrders.value.forEach((e) => {
      //     console.log(e.checked);
      //   });
      // } else {
      //   filtredOrders.value.forEach((e) => {
      //     e.checked = true;
      //   });
      // }
    };
    const makeFavorite = (id) => {
      let item = filtredOrders.value.find((i) => i.id == id);
      if (item) {
        item.favorite = !item.favorite;
      }
    };
    // const orders = ref([
    //   {
    //     id: 1,
    //     name: "Заявка #1234 / VIN 1234567890 / Москва",
    //     desc: "Lorem ipsum — классический текст-«рыба». Является искажённым отрывком из философского трактата Марка Туллия Цицерона «О пределах добра и зла», написанного в 45 году до н. э. на латинском языке, обнаружение сходства приписывается Ричарду Макклинтоку..",
    //     date: "15.04.2022",
    //     type: "friend",
    //     time: "12:56",
    //     checked: false,
    //     favorite: false,
    //   },
    //   {
    //     id: 2,
    //     name: "Заявка #1234 / VIN 1234567890 / Москва",
    //     desc: "Lorem ipsum — классический текст-«рыба». Является искажённым отрывком из философского трактата Марка Туллия Цицерона «О пределах добра и зла», написанного в 45 году до н. э. на латинском языке, обнаружение сходства приписывается Ричарду Макклинтоку..",
    //     date: "15.04.2022",
    //     type: "friend",
    //     time: "12:56",
    //     checked: false,
    //     favorite: false,
    //   },
    // ]);
    const orders = computed(() => {
      return store.state.ordersHistory || [];
    });
    return {
      ordersOnPage,
      orders,
      activeTab,
      filtredOrders,
      test,
      allSwitcher,
      checkedOrders,
      toggleSwitcher,
      makeFavorite,
      getDate,
      getTime,
    };
  },
};
</script>

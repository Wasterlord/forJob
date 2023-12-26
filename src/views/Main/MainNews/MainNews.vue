<template>
  <div
    class="wtf"
    :style="{
      height: toSmallVH ? '80vh' : 'auto',
      'overflow-y': toSmallVH ? 'hidden' : 'auto',
    }"
  >
    <div class="news" v-if="resolvedValue">
      <div class="news_header">Главные новости</div>
      <!-- <TopNews :news="topNews" /> -->
      <div class="news_main">
        <div class="news_main__left">
          <LeftNews :news="mainNews" :currentPage="currentPage" />
          <div class="paggination d-flex justify-center mb-30">
            <Paggination
              v-if="pagesNumber > 1"
              :currentPage="currentPage"
              :pagesNumber="pagesNumber"
              @changeValue="pageChanged"
            />
          </div>
        </div>
        <div class="news_main__right">
          <!-- <RightNews :news="dailyNews" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import LeftNews from "../News/NewsMainLeft.vue";
import Paggination from "../../../components/Paggination.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed, onBeforeMount, watch } from "vue";
export default {
  name: "news",
  components: {
    LeftNews,
    Paggination,
  },
  setup() {
    const store = useStore();
    const dataResolved = ref(false);
    const currentPage = ref(1);
    const pagesNumber = ref(1);
    const toSmallVH = ref(false);
    const getNews = () => {
      // loadFinish(true);
      const data = {
        page: currentPage.value,
        limit: currentPage.value == 1 ? 11 : 10,
      };
      store.dispatch("getNewsMain", data).then((res) => {
        pagesNumber.value = Math.ceil((res.data.data.count - 1) / 10);
        toSmallVH.value = false;
        dataResolved.value = true;
        loadFinish(false);
      });
    };
    const pageChanged = (value) => {
      currentPage.value = value;
      toSmallVH.value = true;
      loadFinish(true);
      getNews();
    };
    const resolvedValue = computed(() => {
      return dataResolved.value;
    });
    const loadFinish = (status) => {
      store.commit("changeLoader", status);
    };
    onBeforeMount(() => {
      loadFinish(true);
    });
    onMounted(() => {
      getNews();
    });
    const topNews = computed(() => {
      return store.state.news.owner || [];
    });
    const mainNews = computed(() => {
      return store.state.newsMainPage || [];
    });
    const dailyNews = computed(() => {
      return store.state.news.daily || [];
    });
    const topArray = ref([]);
    return {
      topArray,
      resolvedValue,
      toSmallVH,
      getNews,
      mainNews,
      dailyNews,
      topNews,
      currentPage,
      pagesNumber,
      pageChanged,
    };
  },
};
</script>

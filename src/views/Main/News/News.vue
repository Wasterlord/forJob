<template>
  <div class="news" v-if="resolvedValue">
    <div class="news_header">Новости</div>
    <!-- <TopNews :news="topNews" /> -->
    <div class="news_main">
      <div class="news_main__left">
        <LeftNews :news="mainNews" :currentPage="1" />
      </div>
      <div class="news_main__right">
        <RightNews :news="dailyNews" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TopNews from "./TopNews.vue";
import LeftNews from "./NewsMainLeft.vue";
import RightNews from "./NewsMainRight.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed, onBeforeMount } from "vue";
export default {
  name: "news",
  components: {
    TopNews,
    LeftNews,
    RightNews,
  },
  setup() {
    const store = useStore();
    const dataResolved = ref(false);

    const getNews = () => {
      // loadFinish(true);
      if (
        store.state.news.daily.length == 0 ||
        store.state.news.main.length == 0
      ) {
        store.dispatch("getNews").then(() => {
          dataResolved.value = true;
          loadFinish(false);
        });
      } else {
        loadFinish(false);
        dataResolved.value = true;
      }
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
      return store.state.news.main || [];
    });
    const dailyNews = computed(() => {
      return store.state.news.daily || [];
    });
    const topArray = ref([
      {
        id: 1,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        role: "Президент «ПартКом»",
        theme: "Благотворительность",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
      {
        id: 2,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        role: "Президент «ПартКом»",
        theme: "Благотворительность",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
      {
        id: 3,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        role: "Президент «ПартКом»",
        theme: "Благотворительность",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
      {
        id: 4,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        role: "Президент «ПартКом»",
        theme: "Благотворительность",
      },
      {
        id: 5,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        role: "Президент «ПартКом»",
        theme: "Благотворительность",
      },
      {
        id: 6,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        role: "Президент «ПартКом»",
        theme: "Благотворительность",
      },
      {
        id: 7,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title: "Что-то где-то почему-то",
        role: "Президент «ПартКом»",
        theme: "Благотворительность",
      },
      {
        id: 8,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        role: "Президент «ПартКом»",
        theme: "Благотворительность",
      },
      {
        id: 9,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        role: "Президент «ПартКом»",
        theme: "Благотворительность",
      },
      {
        id: 10,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        role: "Президент «ПартКом»",
        theme: "Благотворительность",
      },
      {
        id: 11,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        role: "Президент «ПартКом»",
        theme: "Благотворительность",
      },
    ]);
    return {
      topArray,
      resolvedValue,
      getNews,
      mainNews,
      dailyNews,
      topNews,
    };
  },
};
</script>

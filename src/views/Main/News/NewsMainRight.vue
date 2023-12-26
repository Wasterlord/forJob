<template>
  <div class="right-news">
    <div class="right-news_header">
      <router-link :to="{ name: 'daily-news' }">
        <div>Ежедневные</div>
      </router-link>
      <div class="line"></div>
    </div>
    <div class="right-news_last" v-if="!mq({ $to: 'mobile' })">
      <router-link
        :to="{ name: 'news-detail', params: { id: item.id } }"
        class="right-news_last__item"
        v-for="item in dailyNews"
        :key="item.id"
      >
        <div
          :style="{ background: `url(${item.img_medium}) 50% 50% no-repeat` }"
          class="img"
        ></div>
        <div class="text-top" style="margin-top: 0.4rem">
          <div class="text-top_left">
            {{ `${item.newsDate} в ${item.newsTime}` }}
          </div>
          <div class="text-top_right">
            <svg
              width="16"
              height="16"
              @click.prevent="likeNews(item.id)"
              viewBox="0 0 16 16"
              stroke-width="0.4"
              fill="none"
              :stroke="item.is_liked ? '' : '#A3A3A3'"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043ZM7.96649 12.75C-1.74438 6.33309 4.97653 1.3247 7.85502 3.97393C7.89302 4.00876 7.93039 4.04486 7.96649 4.08223C8.00222 4.0449 8.0394 4.00898 8.07795 3.97456C10.9558 1.32344 17.6774 6.33245 7.96649 12.75Z"
                :fill="item.is_liked ? '#EE2E27' : ''"
              />
              <path
                d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043Z"
                :fill="item.is_liked ? '#EE2E27' : ''"
              />
            </svg>
            <span style="margin-left: 0.5rem">{{ item.likes }}</span>
            <img
              style="margin-left: 1.2rem"
              src="/assets/images/comments.svg"
              alt="comments"
            /><span style="margin-left: 0.5rem">{{ item.comments }}</span>
          </div>
        </div>
        <div class="theme" v-if="item.theme">
          {{ item.theme }}
        </div>
        <div class="text-bottom">
          {{ item.shortTitle }}
        </div>
      </router-link>
    </div>
    <div v-else>
      <!-- <Slider :array="dailyNews" height="34.5" type="small" /> -->
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { computed } from "vue";
// import Slider from "../../../components/Slider.vue";
import useBreakpoints from "../../../mixins/breakpoits";
import { useStore } from "vuex";

export default {
  components: {
    // Slider,
  },
  props: ["news"],
  setup(props) {
    const { mq } = useBreakpoints();
    const store = useStore();
    const dailyNews = computed(() => {
      return props.news;
    });
    const topArray = ref([
      {
        id: 1,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        theme: "Новинки",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
      {
        id: 2,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        theme: "Новинки",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
      {
        id: 3,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        theme: "Новинки",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
      {
        id: 4,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        theme: "Новинки",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
      {
        id: 5,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        theme: "Новинки",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
      {
        id: 6,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        theme: "Новинки",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
      {
        id: 7,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        theme: "Новинки",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title: "Что-то где-то почему-то",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
      {
        id: 8,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        theme: "Новинки",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
      {
        id: 9,
        link: "/",
        img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
        theme: "Новинки",
        date: "18.04.2022",
        time: "19:33",
        likes: 12,
        comments: 24,
        title:
          "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
        description:
          "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.",
      },
    ]);
    const getNews = () => {
      store.dispatch("getNews");
    };
    const likeNews = (id) => {
      store.dispatch("likeNews", id).then(() => {
        getNews();
      });
    };
    const firstNews = computed(() => {
      return topArray.value[0];
    });
    const middleNews = computed(() => {
      return topArray.value.slice(1, 5);
    });
    const lastNews = computed(() => {
      return topArray.value.slice(0, 5);
    });
    return {
      firstNews,
      topArray,
      middleNews,
      getNews,
      likeNews,
      lastNews,
      dailyNews,
      mq,
    };
  },
};
</script>

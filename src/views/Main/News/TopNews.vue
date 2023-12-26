<template>
  <div class="top-news">
    <div class="top-news_header">
      <div>От собственников</div>
      <div class="line"></div>
    </div>
    <div class="top-news_items" v-if="!mq({ $to: 'mobile' })">
      <router-link
        :to="{ name: 'news-detail', params: { id: item.id } }"
        :style="{
          background: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.1) 60%, rgba(0,0,0,0) 100%), 
          linear-gradient(360deg, rgba(0,0,0,0.8) 0%, rgba(255,255,255,0.2) 60%, rgba(0,0,0,0) 100%), 
          url(${item.img}) 50% 50% no-repeat`,
        }"
        class="top-news_item"
        v-for="item in ownerNews"
        :key="item.id"
      >
        <div class="text-top">
          {{ item.shortTitle }}
        </div>
        <div class="text-bottom" v-if="item.name">
          {{ `${item.name}, ${item.role}` }}
        </div>
      </router-link>
    </div>
    <div v-else>
      <!-- <Slider :array="ownerNews" height="34.5" type="big" /> -->
    </div>
  </div>
</template>
<script lang="ts">
import useBreakpoints from "../../../mixins/breakpoits";
// import Slider from "../../../components/Slider.vue";
import { reactive, toRefs, ref, computed } from "vue";

export default {
  name: "top-news",
  components: {
    // Slider,
  },
  props: ["news"],
  setup(props) {
    const { mq } = useBreakpoints();
    const ownerNews = computed(() => {
      return props.news;
    });
    // const topArray = ref([
    //   {
    //     id: 1,
    //     link: "/",
    //     img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
    //     name: "Александр Аверин",
    //     title:
    //       "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
    //     role: "Президент «ПартКом»",
    //   },
    //   {
    //     id: 2,
    //     link: "/",
    //     img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
    //     name: "Александр Аверин",
    //     title:
    //       "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
    //     role: "Президент «ПартКом»",
    //   },
    //   {
    //     id: 3,
    //     link: "/",
    //     img: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
    //     name: "Александр Аверин",
    //     title:
    //       "New Studies Increase Confidence in NASA’s Measure of Earth’s Temperature",
    //     role: "Президент «ПартКом»",
    //   },
    // ]);
    return {
      ownerNews,
      mq,
    };
  },
};
</script>

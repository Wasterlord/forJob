<template>
  <div class="left-news">
    <div class="left-news_header" v-if="$route.name == 'news'">
      <router-link :to="{ name: 'main-news' }">
        <div>Главные новости</div>
      </router-link>

      <div class="line"></div>
    </div>
    <div class="left-news_items" v-if="news.length > 0">
      <router-link
        v-if="firstNews"
        :to="{ name: 'news-detail', params: { id: firstNews.id } }"
        :style="{
          background: `linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(255,255,255,0.1) 60%, rgba(0,0,0,0) 100%), 
          linear-gradient(360deg, rgba(0,0,0,0.7) 0%, rgba(255,255,255,0.1) 60%, rgba(0,0,0,0) 100%), 
          url(${firstNews.img_large}) 50% 50% no-repeat`,
        }"
        class="left-news_big"
      >
        <div class="text-top">
          <div class="text-top_left">
            {{ `${firstNews.newsDate} в ${firstNews.newsTime}` }}
          </div>
          <div class="text-top_right">
            <svg
              width="16"
              height="16"
              @click.prevent="likeNews(firstNews.id)"
              viewBox="0 0 16 16"
              stroke-width="0.4"
              fill="none"
              :stroke="firstNews.is_liked ? '' : '#FFF'"
            >
              <path
                d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043ZM7.96649 12.75C-1.74438 6.33309 4.97653 1.3247 7.85502 3.97393C7.89302 4.00876 7.93039 4.04486 7.96649 4.08223C8.00222 4.0449 8.0394 4.00898 8.07795 3.97456C10.9558 1.32344 17.6774 6.33245 7.96649 12.75Z"
                :fill="firstNews.is_liked ? '#EE2E27' : ''"
              />
              <path
                d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043Z"
                :fill="firstNews.is_liked ? '#EE2E27' : ''"
              />
            </svg>
            <span style="margin-left: 0.5rem">{{ firstNews.likes }}</span>
            <svg
              width="12"
              height="11"
              viewBox="0 0 12 11"
              style="margin-left: 1.2rem"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.80006 10.44H2.16006L2.54406 9.92795C2.80006 9.57595 2.96006 9.12795 3.05606 8.58395C1.45606 7.84795 0.560059 6.47195 0.560059 4.67995C0.560059 1.92795 2.64006 0.199951 6.00006 0.199951C9.36006 0.199951 11.4401 1.92795 11.4401 4.67995C11.4401 7.49595 9.39206 9.15995 6.00006 9.15995H5.77606C5.26406 9.76795 4.36806 10.44 2.80006 10.44ZM6.00006 0.839951C2.99206 0.839951 1.20006 2.27995 1.20006 4.67995C1.20006 6.72795 2.44806 7.68795 3.50406 8.10395L3.72806 8.19995L3.69606 8.45595C3.63206 8.96795 3.53606 9.41595 3.34406 9.79995C4.40006 9.67195 5.00806 9.12795 5.36006 8.67995L5.45606 8.55195H6.00006C10.3201 8.55195 10.8001 5.86395 10.8001 4.71195C10.8001 2.27995 9.00806 0.839951 6.00006 0.839951Z"
                fill="#FFF"
              /></svg
            ><span style="margin-left: 0.5rem">{{ firstNews.comments }}</span>
            <span class="theme" v-if="firstNews.theme">
              {{ firstNews.theme }}
            </span>
          </div>
        </div>
        <div>
          <div class="text-bottom">
            {{ firstNews.shortTitle }}
          </div>
          <div class="text-bottom_info">
            {{ firstNews.shortDescription }}
          </div>
        </div>
      </router-link>
      <div class="left-news_middle">
        <router-link
          :to="{ name: 'news-detail', params: { id: item.id } }"
          :style="{
            background: `linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(255,255,255,0.1) 60%, rgba(0,0,0,0) 100%), 
          linear-gradient(360deg, rgba(0,0,0,0.7) 0%, rgba(255,255,255,0.1) 60%, rgba(0,0,0,0) 100%), 
          url(${item.img_medium}) 50% 50% no-repeat`,
          }"
          class="left-news_middle__item"
          v-for="item in middleNews"
          :key="item.id"
        >
          <div class="text-top">
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
                :stroke="item.is_liked ? '' : '#FFF'"
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
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                style="margin-left: 1.2rem"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.80006 10.44H2.16006L2.54406 9.92795C2.80006 9.57595 2.96006 9.12795 3.05606 8.58395C1.45606 7.84795 0.560059 6.47195 0.560059 4.67995C0.560059 1.92795 2.64006 0.199951 6.00006 0.199951C9.36006 0.199951 11.4401 1.92795 11.4401 4.67995C11.4401 7.49595 9.39206 9.15995 6.00006 9.15995H5.77606C5.26406 9.76795 4.36806 10.44 2.80006 10.44ZM6.00006 0.839951C2.99206 0.839951 1.20006 2.27995 1.20006 4.67995C1.20006 6.72795 2.44806 7.68795 3.50406 8.10395L3.72806 8.19995L3.69606 8.45595C3.63206 8.96795 3.53606 9.41595 3.34406 9.79995C4.40006 9.67195 5.00806 9.12795 5.36006 8.67995L5.45606 8.55195H6.00006C10.3201 8.55195 10.8001 5.86395 10.8001 4.71195C10.8001 2.27995 9.00806 0.839951 6.00006 0.839951Z"
                  fill="#FFF"
                /></svg
              ><span style="margin-left: 0.5rem">{{ item.comments }}</span>
            </div>
          </div>
          <div class="w-100">
            <div class="text-bottom">
              {{ item.shortTitle }}
            </div>
            <div class="text-bottom_info">
              {{ item.shortDescription }}
            </div>
          </div>
        </router-link>
      </div>
      <div class="left-news_last" v-if="!mq({ $to: 'mobile' })">
        <router-link
          :to="{ name: 'news-detail', params: { id: item.id } }"
          class="left-news_last__item"
          v-for="item in lastNews"
          :key="item.id"
        >
          <div
            :style="{ background: `url(${item.img_medium}) 50% 50% no-repeat` }"
            class="img"
          ></div>
          <div class="text-top">
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
          <div v-if="item.theme" class="theme">
            {{ item.theme }}
          </div>
          <div class="text-bottom">
            {{ item.shortTitle }}
          </div>
        </router-link>
      </div>
      <div class="mb-60" v-else-if="news.length > 5">
        <div class="left-news_header mt-32 mb-16">
          <div>Еще новости</div>
          <div class="line"></div>
        </div>
        <!-- <Slider class="pl-16" :array="lastNews" height="34.5" type="small" /> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { computed } from "vue";
import useBreakpoints from "../../../mixins/breakpoits";
// import Slider from "../../../components/Slider.vue";
import { useStore } from "vuex";

export default {
  components: {
    // Slider,
  },
  props: ["news", "currentPage"],
  setup(props) {
    const store = useStore();
    const { mq } = useBreakpoints();
    const getNews = () => {
      store.dispatch("getNews");
    };
    const likeNews = (id) => {
      store.dispatch("likeNews", id).then(() => {
        getNews();
      });
    };
    const firstNews = computed(() => {
      if (props.currentPage && props.currentPage != 1) {
        return null;
      }
      return props.news[0];
    });
    const middleNews = computed(() => {
      return props.currentPage && props.currentPage == 1
        ? props.news.slice(1, 5)
        : props.news.slice(0, 4);
    });
    const lastNews = computed(() => {
      return props.currentPage && props.currentPage == 1
        ? props.news.slice(5)
        : props.news.slice(4);
    });
    return {
      firstNews,
      middleNews,
      likeNews,
      getNews,
      lastNews,
      mq,
    };
  },
};
</script>

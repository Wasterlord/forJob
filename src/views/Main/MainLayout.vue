<template>
  <div class="main-layout">

    <Header />
    <Loader v-if="!($route.name == 'connection' || $route.name == 'sales')" />
    <div class="main-container-body">
      <!-- <Loader v-if="!($route.name == 'connection' || $route.name == 'sales')" /> -->
      <!-- <router-link :to="{ name: 'news' }">to News</router-link>
      <router-link :to="{ name: 'login' }">to Login</router-link> -->
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>
<script lang="ts">
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import Loader from "@/components/Loader.vue";
import { useStore } from "vuex";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Main",
  components: {
    Header,
    Footer,
    Loader,
  },
  setup() {
  }
});
</script>

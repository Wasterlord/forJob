<template>
  <div class="main-layout">
    <Header />
    <div class="main-container-body" style="display: flex; align-items: center; justify-content: center;">
      <!-- <router-link :to="{ name: 'news' }">to News</router-link>
      <router-link :to="{ name: 'login' }">to Login</router-link> -->
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>
<script lang="ts">
import Header from "@/components/header/header-auth.vue";
import Footer from "@/components/footer/footer.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Main",
  components: {
    Header,
    Footer,
  },
});
</script>

<style scoped>
a {
  align-items: center;
  justify-content: center;
}
</style>

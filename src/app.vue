<template>
  <div class="app-all">
    <div class="for_all_container">
      <div
        class="error-container"
        v-if="store.state && store.state.errorMessage"
      >
        {{ store.state.errorMessage }}
      </div>
      <div
        class="success-container"
        v-if="store.state && store.state.successMessage"
      >
        {{ store.state.successMessage }}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const resize = () => {
      store.dispatch("templateBreakpoints", window.innerWidth);
    };

    store.dispatch("templateBreakpoints", window.innerWidth);
    window.addEventListener("resize", resize);

    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-all {
  position: relative;
}
.for_all_container {
  position: fixed;
  right: 2rem;
  top: 2rem;
  z-index: 100000;
  display: flex;
  flex-direction: column;
}
.error-container {
  background: rgba(252, 228, 228, 1);
  padding: 1rem 2rem;
  max-width: 20rem;
  border-left: 2px solid red;
 
}
.success-container{
  background: rgb(205, 225, 203);
  padding: 1rem 2rem;
  max-width: 20rem;
  border-left: 2px solid rgb(22, 122, 47);
  z-index: 100000;
}
</style>

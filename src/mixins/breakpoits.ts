import { ref, computed } from "vue";
import { useStore } from "vuex";
import { mediaQueryPoint } from "@/models/storeModels";
import { State } from "@/store/index";

export default function () {
  const store = useStore();
  //   const mediaQueryPoints: mediaQueryPoint[] = computed(() => store.state.mediaQueryPoints);
    // const mediaQueryPoints: mediaQueryPoint[] = store.state.mediaQueryPoints;
    //   const windowWidth: number = computed(() => store.state.windowWidth);
    // const windowWidth: number = store.state.windowWidth;

  function mq({ $from, $to }) {
    let minWidth = 0;
    let maxWidth = 0;

    if ($from) {
      const point = store.getters.querys.find((i: mediaQueryPoint) => i.name == $from);
      if (point) {
        minWidth = point.minWidth || 0;
      }
    }
    if ($to) {
      const point = store.getters.querys.find((i: mediaQueryPoint) => i.name == $to);
      if (point) {
        maxWidth = point.maxWidth || 0;
      }
    }

    if (minWidth !== 0 && maxWidth !== 0) {
      return store.getters.width >= minWidth && store.getters.width <= maxWidth;
    }
    if (minWidth !== 0) {
      return store.getters.width >= minWidth;
    }
    if (maxWidth !== 0) {
      return store.getters.width <= maxWidth;
    }
    return false;
  }

  return {
    mq,
  };
}

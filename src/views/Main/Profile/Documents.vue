<template>
  <div class="documents_container">
    <div class="documents_switcher">
      <!-- <div
        class="documents_switcher__item"
        :class="{ active: currentType == 'all' }"
        @click="currentType = 'all'"
      >
        Все документы
      </div> -->
      <div
        :class="{ active: currentType == type.id }"
        @click="currentType = type.id"
        class="documents_switcher__item"
        v-for="type in sections"
        :key="type.id"
      >
        {{ type.name }}
      </div>
    </div>
    <div class="documents_input mb-30">
      <svg
        class="search-svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
      >
        <g clip-path="url(#clip0_3534_46458)">
          <path
            d="M7.05542 0.519165C3.1651 0.519165 0 3.67561 0 7.55533C0 11.4351 3.16513 14.5915 7.05542 14.5915C10.9457 14.5915 14.1109 11.4351 14.1109 7.55533C14.1109 3.67561 10.9457 0.519165 7.05542 0.519165ZM7.05542 13.4348C3.80279 13.4348 1.15663 10.7972 1.15663 7.5553C1.15663 4.31327 3.80279 1.67576 7.05542 1.67576C10.3081 1.67576 12.9542 4.31327 12.9542 7.5553C12.9542 10.7972 10.3081 13.4348 7.05542 13.4348Z"
            fill="#A3A3A3"
          />
          <path
            d="M15.8287 15.4924L12.0311 11.7141C11.8046 11.4889 11.4385 11.4899 11.2132 11.7162C10.988 11.9427 10.989 12.3088 11.2153 12.5341L15.0129 16.3125C15.1259 16.4246 15.2731 16.4807 15.4208 16.4807C15.5694 16.4807 15.7179 16.4239 15.8308 16.3103C16.056 16.0838 16.055 15.7177 15.8287 15.4924Z"
            fill="#A3A3A3"
          />
        </g>
        <defs>
          <clipPath id="clip0_3534_46458">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
      <input
        v-model="search"
        type="text"
        placeholder="Поиск среди документов"
      />
    </div>
    <div class="documents">
      <div
        v-for="file in filtredDocuments"
        :key="`id-${file.id}`"
        v-show="file.name"
        class="documents_item"
      >
        <a
          :href="`${protocol}//${host}/profile/downloadFile?id=${file.id}`"
        >
          <div class="item_img">
            <img :src="`/assets/images/${file.ext}.svg`" alt="img" />
          </div>
          <div class="item_main">
            <div class="item_name">{{ file.name }}</div>
            <div class="item_size">{{ file.size }} KB</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "Profile",
  components: {
    History,
  },
  setup() {
    const store = useStore();
    const search = ref("");
    const sections = ref([]);
    const documents = ref([
      { id: 1, ext: ".pdf", name: "", size: 12, section_id: "" },
    ]);
    const currentType = ref("all");

    const getProfileFiles = () => {
      store.dispatch("getProfileFiles").then((res) => {
        documents.value = res.data.data.files
        sections.value = res.data.data.sections;
        currentType.value = res.data.data.sections[0].id;
      });
    };

    onMounted(() => {
      getProfileFiles();
    });

    const fileTypeIcon = computed(() => {});

    const searchedOrders = computed(() => {
      if (search.value.length > 0) {
        return documents.value.filter((i) =>
          i.name.toLowerCase().includes(search.value.toLowerCase())
        );
      } else return documents.value;
    });

    const filtredDocuments = computed(() => {
      if (currentType.value != "all") {
        return searchedOrders.value.filter(
          (i) => i.section_id == currentType.value
        );
      } else {
        return searchedOrders.value;
      }
    });
    const host = computed(() => {
      return document.location.host;
    });
    const protocol = computed(() => {
      return document.location.protocol;
    });

    const docTypes = ref([
      {
        id: 1,
        name: ".pdf",
        img: "@/assets/images/pdf.svg",
      },
      {
        id: 2,
        name: ".doc",
        img: "@/assets/images/doc.svg",
      },
      {
        id: 3,
        name: ".xls",
        img: "@/assets/images/xls.svg",
      },
      {
        id: 4,
        name: ".txt",
        img: "@/assets/images/txt.svg",
      },
      {
        id: 5,
        name: ".ptx",
        img: "@/assets/images/ptx.svg",
      },
      {
        id: 5,
        name: ".jpg",
        img: "@/assets/images/jpg.png",
      },
      
    ]);
    return {
      documents,
      docTypes,
      sections,
      filtredDocuments,
      currentType,
      search,
      host,
      protocol,
    };
  },
};
</script>

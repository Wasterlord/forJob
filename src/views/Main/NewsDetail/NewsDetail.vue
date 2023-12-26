<template>
  <div class="newsDetails">
    <div v-if="resolvedValue">
      <div style="visibility: hidden">{{ page }}</div>

      <div class="text-top">
        <div class="text-top_left">
          {{ `${details.published_date}` }}
        </div>
        <div class="text-top_right">
          <svg
            @click="likeNews(details.id)"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            stroke-width="0.4"
            fill="none"
            :stroke="details.is_liked ? '' : '#A3A3A3'"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043ZM7.96649 12.75C-1.74438 6.33309 4.97653 1.3247 7.85502 3.97393C7.89302 4.00876 7.93039 4.04486 7.96649 4.08223C8.00222 4.0449 8.0394 4.00898 8.07795 3.97456C10.9558 1.32344 17.6774 6.33245 7.96649 12.75Z"
              :fill="details.is_liked ? '#EE2E27' : ''"
            />
            <path
              d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043Z"
              :fill="details.is_liked ? '#EE2E27' : ''"
            />
          </svg>
          <span style="margin-left: 0.5rem">{{ details.like_count }}</span>
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
              fill="#A3A3A3"
            /></svg
          ><span style="margin-left: 0.5rem">{{ details.comment_count }}</span>
          <span class="theme" v-if="details.tags.length > 0">
            {{ details.tags[0] }}
          </span>
        </div>
      </div>
      <div class="newsDetails_title">
        {{ details.title }}
      </div>
      <div class="newsDetails_main">
        <div class="newsDetails_main__left">
          <div
            class="newsDetails_main__content"
            v-html="linkTargetContent(details.body)"
          ></div>
          <div class="newsDetails_documents">
            <div
              class="newsDetails_document"
              :title="file.name"
              v-for="file in files"
              :key="file.id"
            >
              <a
                :href="`${protocol}//${host}/discount/downloadFile?id=${file.id}`"
              >
                <img src="/assets/images/ssss.png" alt="sales" />
              </a>
              <div class="newsDetails_document__name">
                <div>
                  {{
                    file.name.length > 12
                      ? file.name.slice(0, 12) + ".."
                      : file.name
                  }}
                </div>
                <div class="newsDetails_document__size">{{ file.size }} МБ</div>
              </div>
            </div>
          </div>
          <div class="newsDetails_main__separate"></div>
          <div class="newsDetails_main__comments">
            <div class="comments-header">
              <div class="comments-header_left">Коментарии</div>
              <div
                class="comments-header_right"
                style="cursor: pointer"
                @click="likeNews(details.id)"
              >
                <!-- <svg
                  width="12"
                  v-if="!details.is_liked"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.96649 1.99043L5.51239 1.52366C4.44649 0.427997 2.49203 0.806096 1.7865 2.18359C1.45527 2.83149 1.38053 3.76692 1.98537 4.96075C2.56803 6.11025 3.78023 7.48711 5.96649 8.98684C8.15275 7.48711 9.36431 6.11025 9.94761 4.96075C10.5524 3.76629 10.4783 2.83149 10.1465 2.18359C9.44094 0.806096 7.48648 0.427364 6.42058 1.52303L5.96649 1.99043ZM5.96649 9.75C-3.74438 3.33309 2.97653 -1.6753 5.85502 0.973928C5.89302 1.00876 5.93039 1.04486 5.96649 1.08223C6.00222 1.0449 6.0394 1.00898 6.07795 0.974562C8.95581 -1.67656 15.6774 3.33245 5.96649 9.75Z"
                    fill="#A3A3A3"
                  />
                </svg> -->
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  stroke-width="0.4"
                  fill="none"
                  :stroke="details.is_liked ? '' : '#A3A3A3'"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043ZM7.96649 12.75C-1.74438 6.33309 4.97653 1.3247 7.85502 3.97393C7.89302 4.00876 7.93039 4.04486 7.96649 4.08223C8.00222 4.0449 8.0394 4.00898 8.07795 3.97456C10.9558 1.32344 17.6774 6.33245 7.96649 12.75Z"
                    :fill="details.is_liked ? '#EE2E27' : ''"
                  />
                  <path
                    d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043Z"
                    :fill="details.is_liked ? '#EE2E27' : ''"
                  />
                </svg>

                <span style="margin-left: 1rem">Мне нравится</span>
              </div>
            </div>
            <div class="comments-form">
              <div class="comments-form_header">
                Что вы думаете по этому поводу?
              </div>
              <textarea
                name="comment"
                cols="30"
                rows="10"
                v-model="comment"
                placeholder="Введите сообщение..."
              ></textarea>
              <button
                @click="addComment"
                :disabled="comment.length == 0 || disabableCommentButton"
              >
                Оставить комментарий
              </button>
            </div>
          </div>
          <div class="comments-array">
            <div
              class="comments-array_item"
              v-for="comment in detailsCommentsReverse"
              :key="comment.id"
            >
              <div style="display: flex">
                <div
                  class="logo"
                  :style="{
                    background: `url(${
                      comment.avatar
                        ? comment.avatar
                        : '../../../assets/images/hr-icon.svg'
                    }) 50% 50% no-repeat`,
                  }"
                ></div>
                <div class="main">
                  <div class="main_name">
                    {{ `${comment.name} ${comment.surname}` }}
                  </div>
                  <div class="main_role">{{ comment.departament }}</div>
                  <div class="main_text" v-if="editId != comment.id">
                    {{ comment.text }}
                  </div>
                  <div
                    class="comment_inline"
                    style="margin-left: 0"
                    v-if="editId == comment.id"
                  >
                    <textarea v-model="editText"></textarea>
                    <button @click.once="editComments(comment.id)">
                      Сохранить
                    </button>
                    <button @click="cancelEdit">Отмена</button>
                  </div>
                  <div class="main_likes">
                    <svg
                      @click="makeCommentLike(comment.id)"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      stroke-width="0.4"
                      fill="none"
                      :stroke="comment.is_liked ? '' : '#A3A3A3'"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043ZM7.96649 12.75C-1.74438 6.33309 4.97653 1.3247 7.85502 3.97393C7.89302 4.00876 7.93039 4.04486 7.96649 4.08223C8.00222 4.0449 8.0394 4.00898 8.07795 3.97456C10.9558 1.32344 17.6774 6.33245 7.96649 12.75Z"
                        :fill="comment.is_liked ? '#EE2E27' : ''"
                      />
                      <path
                        d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043Z"
                        :fill="comment.is_liked ? '#EE2E27' : ''"
                      />
                    </svg>

                    {{ comment.like_count }}
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
                        fill="#A3A3A3"
                      />
                    </svg>
                    <span
                      @click="answerId = comment.id"
                      style="cursor: pointer"
                    >
                      Ответить

                      <!-- ({{ comment.childs.length }}) -->
                    </span>
                    <span
                      class="ml-10"
                      v-if="userInfo.userId == comment.user_id"
                      @click="editCommentText(comment)"
                      ><svg
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="16px"
                        height="16px"
                      >
                        <path
                          d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"
                          fill="#a3a3a3"
                        /></svg
                    ></span>
                  </div>
                </div>
              </div>

              <div
                :style="{ marginLeft: mq({ $to: 'mobile' }) ? '0rem' : '8rem' }"
                class="children"
              >
                <div class="comment_inline" v-if="answerId == comment.id">
                  <textarea v-model="commentToComment"></textarea>
                  <button @click.once="addComment">Отправить</button>
                  <button @click="answerId = 0">Отмена</button>
                </div>

                <div
                  class="children_item"
                  v-for="child in comment.sub"
                  :key="child.id"
                >
                  <div style="display: flex">
                    <div
                      class="logo"
                      :style="{
                        background: `url(${
                          child.avatar
                            ? child.avatar
                            : '../../../assets/images/hr-icon.svg'
                        }) 50% 50% no-repeat`,
                      }"
                    ></div>
                    <div class="main">
                      <div class="main_name">
                        {{ `${child.name} ${child.surname}` }}
                      </div>
                      <div class="main_role">{{ child.departament }}</div>
                      <div class="main_text">{{ child.text }}</div>
                      <div
                        class="comment_inline"
                        style="margin-left: 0"
                        v-if="editId == child.id"
                      >
                        <textarea v-model="editText"></textarea>
                        <button @click.once="editComments(child.id)">
                          Сохранить
                        </button>
                        <button @click="cancelEdit">Отмена</button>
                      </div>
                      <div class="main_likes">
                        <svg
                          @click="makeChildCommentLike(comment.id, child.id)"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          stroke-width="0.4"
                          fill="none"
                          :stroke="child.is_liked ? '' : '#A3A3A3'"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043ZM7.96649 12.75C-1.74438 6.33309 4.97653 1.3247 7.85502 3.97393C7.89302 4.00876 7.93039 4.04486 7.96649 4.08223C8.00222 4.0449 8.0394 4.00898 8.07795 3.97456C10.9558 1.32344 17.6774 6.33245 7.96649 12.75Z"
                            :fill="child.is_liked ? '#EE2E27' : ''"
                          />
                          <path
                            d="M7.96649 4.99043L7.51239 4.52366C6.44649 3.428 4.49203 3.8061 3.7865 5.18359C3.45527 5.83149 3.38053 6.76692 3.98537 7.96075C4.56803 9.11025 5.78023 10.4871 7.96649 11.9868C10.1527 10.4871 11.3643 9.11025 11.9476 7.96075C12.5524 6.76629 12.4783 5.83149 12.1465 5.18359C11.4409 3.8061 9.48648 3.42736 8.42058 4.52303L7.96649 4.99043Z"
                            :fill="child.is_liked ? '#EE2E27' : ''"
                          />
                        </svg>
                        {{ child.like_count }}
                        <span
                          class="ml-10"
                          v-if="userInfo.userId == child.user_id"
                          @click="editCommentText(child)"
                        >
                          <svg
                            fill="#000000"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16px"
                            height="16px"
                          >
                            <path
                              d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"
                              fill="#a3a3a3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="newsDetails_main__right">
          <RightNews :news="dailyNews" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, onMounted, ref, computed, onBeforeMount } from "vue";
import RightNews from "../News/NewsMainRight.vue";
import { useStore } from "vuex";
// @ts-ignore
import useBreakpoints from "@/mixins/breakpoits.ts";
export default {
  components: {
    RightNews,
  },
  props: {
    id: String,
  },
  name: "newsDetail",
  setup(props) {
    const dataResolved = ref(false);
    const resolvedValue = computed(() => {
      return dataResolved.value;
    });
    const { mq } = useBreakpoints();
    const store = useStore();
    const comment = ref("");
    const commentToComment = ref("");
    const disabableCommentButton = ref(false);
    const answerId = ref(0);
    const editId = ref(0);
    const editText = ref("");
    const loadFinish = (status) => {
      store.commit("changeLoader", status);
    };
    const userInfo = computed(() => {
      return store.state.user;
    });
    const linkTargetContent = (body) => {
      return body.replace("<a href", '<a target="blank" href');
    };
    onBeforeMount(() => {
      loadFinish(true);
      console.log(store.state);
    });
    onMounted(() => {
      getDetails();
      if (dailyNews.value.length == 0) {
        getNews();
      }
    });
    const getNews = () => {
      store.dispatch("getNews");
    };
    const getDetails = () => {
      store.dispatch("getDetail", props.id).then(() => {
        loadFinish(false);
        dataResolved.value = true;
        // console.log(store.state.newsDetail.id);
      });
    };

    const host = computed(() => {
      return document.location.host;
    });
    const protocol = computed(() => {
      return document.location.protocol;
    });

    const page = computed(() => {
      loadFinish(true);
      dataResolved.value = false;
      getDetails();
      return props.id;
    });

    const makeCommentLike = (id) => {
      store.dispatch("likeComment", id).then(() => {
        // getDetails();
      });
    };

    const editCommentText = (comment) => {
      editId.value = comment.id;
      editText.value = comment.text;
    };

    const cancelEdit = () => {
      editId.value = 0;
      editText.value = "";
    };

    const makeChildCommentLike = (commentId, childId) => {
      store
        .dispatch("likeChildComment", {
          commentId: commentId,
          childId: childId,
        })
        .then(() => {
          // getDetails();
        });
    };

    const likeNews = (id) => {
      store.dispatch("likeNews", id).then(() => {
        getDetails();
      });
    };

    const editComments = (id) => {
      store
        .dispatch("editComments", {
          comment_id: id,
          comment_text: editText.value,
        })
        .then(() => {
          editId.value = 0;
          getDetails();
        });
    };

    const addComment = () => {
      if (answerId.value == 0) {
        disabableCommentButton.value = true;
      }
      store
        .dispatch("addComments", {
          news_id: props.id,
          parent_comment_id: answerId.value,
          text: answerId.value == 0 ? comment.value : commentToComment.value,
        })
        .then(() => {
          answerId.value = 0;
          disabableCommentButton.value = false;
          commentToComment.value = "";
          comment.value = "";
          getDetails();
        });
    };

    const dailyNews = computed(() => {
      return store.state.news.daily || [];
    });

    const details = computed(() => {
      return store.state.newsDetail || null;
    });

    const files = computed(() => {
      return store.state.newsDetail?.files || null;
    });
    const detailsCommentsReverse = computed(() => {
      return store.state.newsDetail.comments.reverse() || null;
    });

    const newsDetails = reactive({
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
      content:
        "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure laborum temporibus quas! Doloremque labore aliquam voluptas deleniti exercitationem officia incidunt impedit veritatis voluptatum maiores blanditiis consequuntur dolore maxime corporis amet</p> <p>illo voluptatibus et eius dolor error? Earum dignissimos consequuntur libero rerum incidunt delectus doloribus impedit, dolorum, vitae eaque quaerat perferendis suscipit quod nostrum maiores veritatis dicta obcaecati fugit velit? Pariatur repellendus quos voluptatem a rerum quod, repudiandae vitae ad eius quae culpa maxime cum illum voluptates expedita recusandae ex odit velit sunt, quisquam, corrupti consequuntur asperiores. Ullam soluta earum harum sint aperiam veniam nesciunt? Adipisci unde ipsa molestiae excepturi placeat nemo doloribus, laborum id ad tenetur nostrum vero voluptates accusamus atque provident voluptatum aspernatur? Eaque eum commodi laudantium odit a ex accusamus blanditiis aliquid, beatae voluptatum, ea reprehenderit dolores, sapiente corporis sed.</p> <p>Odit fuga, fugit numquam quasi dolorum delectus aliquid commodi nemo. Dolorum, quae voluptatum ducimus velit, debitis commodi obcaecati recusandae assumenda illo soluta, atque ullam totam rem laudantium tempora voluptates aspernatur dolore sapiente incidunt.</p> <p>Nulla doloribus, sequi veniam aspernatur accusamus explicabo doloremque natus, quo similique hic illum nisi harum libero! Nisi facere accusantium, cum dolorum veniam quidem repudiandae qui accusamus. At, hic itaque. Impedit distinctio iste quod a dolor necessitatibus est sunt, voluptatum illum recusandae nostrum tenetur quos dolorem consequuntur hic fugiat architecto temporibus, ea maiores porro deleniti sed rerum labore? Voluptates harum error est ipsum mollitia, cumque eum corporis! Molestias obcaecati, tenetur, ad laudantium doloremque sed dolorem quas ex ipsum quisquam voluptatem! Sit molestiae blanditiis quis amet sequi, totam non ducimus, quidem, libero nihil dolores officia laboriosam necessitatibus doloribus tempore esse modi incidunt. Molestias laudantium, voluptates rem praesentium tempore eveniet rerum dolorem doloremque nihil laborum ratione similique error delectus, commodi fugit eos quaerat provident laboriosam voluptatem eius? Pariatur itaque, culpa magni impedit assumenda ipsam ea nobis debitis, illum sed adipisci fugit possimus. Vitae optio, inventore quidem sit eligendi, ex eius provident voluptas aperiam accusantium dolores possimus cum vel quos consectetur nemo quis tempore neque nulla! Quo accusamus sit deleniti voluptatem minus suscipit itaque deserunt natus maxime culpa veritatis optio, vel libero error nisi hic ad molestiae ratione delectus doloremque id. Molestias ipsam modi, veritatis ex molestiae illum fuga error suscipit sapiente vel. Consectetur, consequuntur, inventore eum cupiditate amet quod facere similique quis eligendi repellendus reiciendis dolore. Fugit consectetur in consequuntur iusto ratione eveniet aliquam repudiandae amet quidem doloremque ex sapiente illo excepturi totam vero expedita, officiis, voluptatem provident. Corrupti magni eligendi maiores ratione quos quasi hic nobis doloremque sequi! Tenetur numquam nisi quia dolorem eos laboriosam sit voluptatum minus? Officia vitae praesentium a fugiat minus sequi maxime veniam, cumque culpa sapiente deleniti atque non sint! Hic minus est consequatur adipisci sed debitis, vel maiores itaque voluptatem eos obcaecati amet porro minima fugiat in voluptatum quia excepturi voluptatibus mollitia laborum similique maxime? Natus adipisci neque nihil? Odio, at earum mollitia dolore eius soluta illum omnis pariatur beatae reiciendis cum totam veritatis, quidem, in nisi magni. Labore fuga dolores ratione aliquam rerum soluta, facere cum, dolorem ipsam tenetur modi doloremque.</p>",
      commentsArray: [
        {
          id: 1,
          text: "Клевая новость",
          author: "Васильев Вася",
          icon: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
          role: "Админ",
          likes: 11,
          comments: 2,
          parentId: 0,
        },
        {
          id: 2,
          text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita temporibus minus, natus architecto inventore, odio optio nam tempora quia ratione ea, voluptas nisi nihil porro.",
          icon: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
          role: "Админ",
          author: "Петя Пупкин",
          likes: 10,
          comments: 0,
          parentId: 0,
        },
        {
          id: 3,
          text: "Odit fuga, fugit numquam quasi dolorum delectus aliquid commodi nemo. Dolorum, quae voluptatum ducimus velit, debitis commodi obcaecati recusandae assumenda illo soluta, atque ullam totam rem laudantium tempora voluptates aspernatur dolore sapiente incidunt.",
          icon: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
          role: "Админ",
          author: "Коментатор",
          likes: 10,
          comments: 0,
          parentId: 1,
        },
        {
          id: 4,
          text: "Я не согласен",
          icon: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
          role: "Админ",
          author: "Коментатор",
          likes: 10,
          comments: 0,
          parentId: 1,
        },
        {
          id: 5,
          text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita temporibus minus, natus architecto inventore, odio optio nam tempora quia ratione ea, voluptas nisi nihil porro.",
          icon: "https://rustur.ru/wp-content/uploads/2019/10/original-4-809x610.jpg",
          role: "Админ",
          author: "Коментатор",
          likes: 10,
          comments: 0,
          parentId: 2,
        },
      ],
    });
    const testArray = computed(() => {
      return store.state.newsDetail.comments
        .filter((i) => i.parent_id == 0)
        .map((i) => {
          return {
            id: i.id,
            text: i.text,
            icon: i.icon,
            author: i.name,
            role: i.department,
            likes: i.like_count,
            parentId: i.parent_id,
            childs: store.state.newsDetail.comments.filter(
              (y) => y.parent_id == i.id
            ),
          };
        });
    });
    const commentsArray = computed(() => {
      return newsDetails.commentsArray
        .filter((i) => i.parentId == 0)
        .map((i) => {
          return {
            id: i.id,
            text: i.text,
            icon: i.icon,
            author: i.author,
            role: i.role,
            likes: i.likes,
            comments: i.comments,
            parentId: i.parentId,
            childs: newsDetails.commentsArray.filter((y) => y.parentId == i.id),
          };
        });
    });

    return {
      newsDetails,
      comment,
      commentToComment,
      resolvedValue,
      commentsArray,
      answerId,
      editId,
      editText,
      page,
      disabableCommentButton,
      editCommentText,
      editComments,
      cancelEdit,
      getDetails,
      addComment,
      getNews,
      likeNews,
      makeCommentLike,
      makeChildCommentLike,
      linkTargetContent,
      userInfo,
      detailsCommentsReverse,
      details,
      files,
      host,
      protocol,
      dailyNews,
      testArray,
      mq,
    };
  },
};
</script>

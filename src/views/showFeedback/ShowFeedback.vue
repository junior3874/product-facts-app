<template>
  <div class="content" v-if="!loading">
    <div class="top-content">
      <GoBack :gray="true" />
      <GenericBtn
        v-bind:style="{ backgroundColor: 'var(--light-blue)', width: '142px' }"
        text="Edit feedback"
      />
    </div>
    <main>
      <FeedbackComponent v-bind:data="feedback" />
      <section v-if="feedback.comments" class="base-area">
        <h1>{{ feedback.comments.length }} Comments</h1>

        <CommentComponent
          v-for="item in feedback.comments"
          :key="item.id"
          v-bind:comment="item"
          :postReplyComment="postReplyComment"
          :deep="2"
        />
      </section>
      <aside class="base-area">
        <h1>Add comment</h1>

        <div class="post-comment">
          <CreateComment
            postName="Post Comment"
            v-bind:postEvent="postComment"
          />
        </div>
      </aside>
    </main>
  </div>
  <div class="loading" v-else>
    <img src="../../assets/loading-buffering.gif" alt="" />
  </div>
</template>

<script lang="ts">
// import libs
import { ref, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

// other imports

import Feedback, { User } from "@/entity/Feedback";

//components

import GoBack from "../../components/GoBack.vue";
import GenericBtn from "../../components/GenericBtn.vue";
import FeedbackComponent from "../../components/Feedback.vue";
import CommentComponent from "./components/Comment.vue";
import CreateComment from "./components/CreateComment.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const user = ref({} as User);

    user.value = store.state.authUser.currentUser;

    return {
      user,
    };
  },
  components: {
    GoBack,
    GenericBtn,
    FeedbackComponent,
    CommentComponent,
    CreateComment,
  },
  name: "ShowFeedback",
  data() {
    return {
      loading: true,
      feedback: {} as Feedback,
      currentIdParams: null as unknown as number,
    };
  },

  methods: {
    async postComment(message: string) {
      const response = await this.$requestService.createComment({
        content: this.user.username + message,
        id: this.currentIdParams,
        user: this.user,
      });

      if (response.error) {
        return;
      }

      const feedbacks = this.feedback;
      feedbacks.comments ??= [];
      feedbacks.comments.push(response.values);
      this.feedback = feedbacks;
    },
    async postReplyComment(message: string, commentId: number) {
      const response = await this.$requestService.createReplyComment({
        content: message,
        user: this.user,
        commentId,
      });

      if (response.error) {
        return;
      }

      return response.values;
    },
  },
  async mounted() {
    const route = useRoute();

    const currentIdParams = Number(route.params.id);

    const response = await this.$requestService.showFeedback(currentIdParams);

    if (response.error) {
      return;
    }
    this.currentIdParams = currentIdParams;

    this.loading = false;
    this.feedback = response.values;
  },
});
</script>
<style scoped src="./style.css" />

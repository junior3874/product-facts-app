<template>
  <div
    class="content-comment"
    :class="[{ replieBorder: commentData.replies, replieComment: deep > 2 }]"
  >
    <div class="user-image">
      <img :src="commentData.user.image" alt="" />
    </div>

    <h3>{{ commentData.user.name }}</h3>
    <h4>{{ commentData.user.username }}</h4>
    <button @click="commentIsVisible = true">replay</button>

    <p>
      <strong v-if="replyTo">@{{ replyTo }}</strong> {{ commentData.content }}
    </p>
    <div class="replies" v-if="commentData.replies">
      <Comment
        v-for="item in commentData.replies"
        :key="item.id"
        v-bind:comment="item"
        v-bind:postReplyComment="postReplyComment"
        :deep="deep + 1"
        :style="{
          marginLeft: deepcases[deep],
        }"
        :replyTo="commentData.user.username"
      />
    </div>

    <div class="comment-area" v-if="commentIsVisible">
      <CreateComment
        postName="Post Reply"
        v-bind:postEvent="postEventReplyComment"
        ref="replyCommentRef"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

import CreateComment from "./CreateComment.vue";
import { Comment } from "../../../entity/Feedback";
export default defineComponent({
  setup() {
    const replyCommentRef = ref();

    return {
      replyCommentRef,
    };
  },
  name: "Comment",
  components: { CreateComment },
  props: {
    comment: {
      type: Object as PropType<Comment>,

      required: true,
    },
    postReplyComment: {
      type: Function,
      required: true,
    },
    deep: {
      type: Number,
      required: true,
    },
    replyTo: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      commentIsVisible: false,
      commentData: this.comment,
      deepcases: {
        1: "0px",
        2: "25px",
        3: "10px",
      },
    };
  },
  methods: {
    async postEventReplyComment() {
      const message: string =
        this.replyCommentRef.$refs.messageField.$el.firstChild.value.trim();
      const res = await this.postReplyComment(message, this.comment.id);
      this.commentData.replies ??= [];
      this.commentData.replies.push(res);

      this.commentIsVisible = false;
    },
  },
});
</script>

<style scoped>
.content-comment {
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-rows: auto;

  grid-template-areas:
    "user-image user-name user-name"
    "user-image user-uuid replay"
    "user-comment user-comment user-comment"
    "user-replay user-replay user-replay"
    "replie replie replie";

  color: var(--grayish-blue);
  margin-bottom: 15px;
}

.content-comment.replieComment {
  margin-bottom: 0px;
}

.content-comment.replieComment .user-image {
  max-width: 25px;
  max-height: 25px;
}

@media (min-width: 768px) {
  .content-comment {
    grid-template-areas:
      "user-image user-name user-name"
      "user-image user-uuid replay"
      "user-image user-comment user-comment"
      "user-image user-replay user-replay"
      "replie replie replie";
  }
}

.user-image {
  grid-area: user-image;
  width: 40px;

  height: 40px;
  border-radius: 50%;
  margin-right: 0.5em;
  border: 1px solid rgb(128, 128, 128);
  overflow: hidden;
}

.user-image img {
  width: 100%;
}

h3 {
  grid-area: user-name;

  color: var(--dark-blue);
  margin-left: 0px;

  font-weight: bold;

  font-size: 0.8125em;

  justify-self: flex-start;
}
h4 {
  grid-area: user-uuid;
  font-weight: 500;
  font-size: 0.8125em;
}

button {
  grid-area: replay;
  justify-self: flex-end;
  font-size: 0.8125em;
  font-weight: 600;
  color: var(--light-blue);
  cursor: pointer;
  background-color: white;
  border: none;

  transition: all 300ms ease-in-out 0s;
}
button:hover {
  text-decoration: underline;
}
p {
  margin-top: 10px;
  word-break: break-word;
  grid-area: user-comment;
  font-weight: 500;

  word-break: break-word;
  margin-bottom: 30px;
}

.comment-area {
  display: flex;
  flex-direction: column;

  grid-area: user-replay;
  width: 100%;
  margin-bottom: 30px;
}

.replies {
  grid-area: replie;
}
</style>

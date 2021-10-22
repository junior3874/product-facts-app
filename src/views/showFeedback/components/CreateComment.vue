<template>
  <div class="content-create-comment">
    <InputField
      typeElement="textarea"
      limit="true"
      required
      ref="messageField"
      maxLength="10"
    />
    <div>
      <span> Characters left {{ quantCharacters }}</span>
      <GenericBtn
        v-bind:style="{
          backgroundColor: 'var(--purple-color)',
          width: '142px',
        }"
        v-bind:text="postName"
        @click="postComment"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import GenericBtn from "../../../components/GenericBtn.vue";
import InputField from "../../../components/InputField.vue";
import { Comment } from "../../../entity/Feedback";

export default defineComponent({
  name: "CreateComment",
  components: { GenericBtn, InputField },
  props: ["postName", "postEvent"],
  setup() {
    const messageField = ref();

    return {
      messageField,
    };
  },
  data() {
    return {
      quantCharacters: Comment.maxSizeCommentContent,
    };
  },
  methods: {
    postComment() {
      const inputField = this.messageField.$el.firstChild;
      console.log(inputField, "***");
      this.$props.postEvent(inputField.value);
    },
  },
  mounted() {
    this.messageField!.$el.firstChild.maxLength = Comment.maxSizeCommentContent;

    const changedEvent = () => {
      const inputField = this.messageField!.$el.firstChild;
      const tratedMessage = inputField.value.trim();
      this.quantCharacters =
        Comment.maxSizeCommentContent - tratedMessage.length;
    };

    this.messageField!.$el.firstChild.addEventListener("keyup", changedEvent);
  },
});
</script>

<style scoped>
.content-create-comment {
  display: flex;
  flex-direction: column;
}

.content-create-comment div {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>

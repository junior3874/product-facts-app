<template>
  <input ref="inputField" v-if="typeElement == 'input'" />
  <textarea v-else />
</template>

<script>
import commentConstants from "../lib/CommentConsts.js";

export default {
  name: "InputField",
  props: ["typeElement", "limit"],
};
</script>
<style scoped>
input,
textarea {
  width: 100%;
  height: 48px;
  border-radius: 5px;
  background-color: var(--background-color);
  transition: all 300ms ease-in-out 0s;
  color: var(--dark-blue);
  padding: 0px 1.5em;
  outline: none;
  border: 1px solid transparent;
  font-size: 0.8125em;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  border-color: var(--light-blue);
  outline: var(--light-blue);
}

textarea {
  padding: 1.5em;
  height: 100px;
  resize: none;
  margin-bottom: 1.23em;
}
</style>

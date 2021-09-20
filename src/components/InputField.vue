<template>
  <input v-if="element == 'input'" name="" id="" />
  <textarea v-else />
</template>

<script>
export default {
  name: "inputField",
  props: ["element"],
};
</script>
<style scoped>
input {
  width: 100%;
  height: 48px;
  border-radius: 5px;
  background-color: var(--background-color);
  transition: all 300ms ease-in-out 0s;
  color: var(--dark-blue);
  padding: 0px 1.5em;
  outline: none;
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
  height: 150px;
  resize: none;
  margin-bottom: 1.23em;
}
</style>

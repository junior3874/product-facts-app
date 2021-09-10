<template>
  <button @click="onPressed">{{ text }}</button>
</template>

<script>
export default {
  name: "GenericBtn",
  props: ["text", "onPressed"],
};
</script>

<style scoped>
button {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  font-size: 0.8125em;
  color: var(--white);
  font-weight: bold;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 300ms ease-in-out 0s;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

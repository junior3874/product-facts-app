<template>
  <div @click="onPressed">
    <img src="../assets/arrow-left.svg" alt="" />
    <a>Go back</a>
  </div>
</template>

<script>
export default {
  name: "GoBack",
  props: ["onPressed"],
};
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
}

div img {
  width: 9px;
  height: 9px;
}

div a {
  color: var(--grayish-blue);
  font-weight: bold;
  font-size: 0.8125em;
  margin-left: 1.153em;
  transition: all 300ms ease-in-out 0s;
  text-decoration: none;
}
div a:hover {
  text-decoration: underline;
}
</style>

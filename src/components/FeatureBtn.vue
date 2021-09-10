<template>
  <button @click="this.onPressed(name)">{{ name }}</button>
</template>

<script>
export default {
  name: "FeatureBtn",
  props: ["name", "onPressed", "active"],
};
</script>
<style scoped>
button {
  color: var(--light-blue);
  background-color: var(--light-gray);
  border: none;
  padding: 0 15px;

  height: 2.307em;

  margin: 0 10px 10px 0;

  border-radius: 10px;
  text-transform: capitalize;
  font-size: 0.8125em;
  font-weight: 600;

  cursor: pointer;
}
button.active {
  background-color: black;
}
</style>

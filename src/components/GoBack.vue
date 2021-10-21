<template>
  <div @click="returnPreviousPage">
    <img src="../assets/arrow-left.svg" alt="" />
    <a :class="{ gray: gray }">Go back</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GoBack",
  props: ["gray"],
  methods: {
    returnPreviousPage() {
      this.$router.back();
    },
  },
});
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
  color: white;
  font-weight: bold;
  font-size: 0.8125em;
  margin-left: 1.153em;
  transition: all 300ms ease-in-out 0s;
  text-decoration: none;
  cursor: pointer;
}

div a.gray {
  color: var(--grayish-blue);
}
div a:hover {
  text-decoration: underline;
}
</style>

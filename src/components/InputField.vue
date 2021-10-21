<template>
  <div class="content-input-field">
    <input
      v-if="typeElement == 'input'"
      :class="{ error: fieldErrorMessageVisible }"
    />
    <input
      v-else-if="typeElement == 'input-readonly'"
      :value="value"
      :class="{ error: fieldErrorMessageVisible }"
      readonly
    />

    <textarea v-else :class="{ error: fieldErrorMessageVisible }" />
    <span :class="{ error: fieldErrorMessageVisible }">{{ messageError }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputField",
  props: ["typeElement", "limit", "messageError", "value", "onPressed"],
  data() {
    return {
      fieldErrorMessageVisible: false,
    };
  },
  methods: {
    toggleFieldError(status: boolean) {
      this.fieldErrorMessageVisible = status;
    },
  },
});
</script>
<style scoped>
.content-input-field {
  margin-bottom: 0px !important;
  cursor: pointer;
  position: relative;
}
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
  position: relative;
}

input.error,
textarea.error {
  border-color: red !important;

  transition: none;
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
}

span {
  margin: 5px 0;
  visibility: hidden;
  font-size: 0.8rem;
  position: inherit;
  color: rgb(255, 90, 90);

  position: absolute;
  left: 0;
  bottom: -50%;
}
span.error {
  visibility: visible;
}
</style>

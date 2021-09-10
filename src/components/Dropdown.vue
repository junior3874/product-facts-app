<template>
  <transition name="dropdown">
    <div
      tabIndex="-1"
      v-show="isVisible"
      ref="dropdown"
      @blur="middlewareEventClickedOutside"
    >
      <ul>
        <li
          v-for="option in options"
          v-bind:class="[selectedOption === option ? 'active' : '']"
          :key="option"
          @click="onPressedOption(option), clickedOutside()"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const dropdown = ref(null);
    return {
      dropdown,
    };
  },
  name: "Dropdown",
  props: [
    "options",
    "onPressedOption",
    "selectedOption",
    "isVisible",
    "clickedOutside",
  ],
  watch: {
    isVisible() {
      this.$nextTick(() => {
        if (this.isVisible) this.dropdown.focus();
      });
    },
  },
  methods: {
    middlewareEventClickedOutside($event) {
      if ($event.relatedTarget == $event.target.previousSibling) return;
      this.clickedOutside();
    },
  },
};
</script>
<style scoped>
div {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 15px;
}
div ul {
  background: white;
  min-width: 250px;
  border-radius: 10px;
  color: var(--grayish-blue);
  box-shadow: rgba(55, 63, 104, 0.35) 0px 10px 40px -7px;
  background-color: var(--white);
}

ul li {
  list-style-type: none;
  padding: 12px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

ul li:hover {
  color: var(--purple-color);
}

ul li + li {
  border-top: 1px solid rgba(58, 67, 116, 0.15);
}

ul li.active::after {
  content: "";
  width: 8px;
  height: 8px;
  background-color: var(--purple-color);
  border-radius: 50%;
  display: block;
}

@keyframes dropdown {
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes dropdown-leave {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-100px);
  }
}

.dropdown-enter-active {
  animation: dropdown 0.25s ease-in;
}
.dropdown-leave-active {
  animation: dropdown-leave 0.25s ease-in;
}
</style>

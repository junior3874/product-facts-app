<template>
  <div
    class="content-feedback"
    ref="containerRef"
    v-bind:class="[view ? 'roadmap' : '', view]"
  >
    <div v-if="data" class="feedback-state">
      <p v-bind:class="data.name">{{ data.name }}</p>
    </div>
    <div class="count-votes">
      <img src="../assets/arrow-up.svg" alt="" />
      <span>{{ data.upvotes }}</span>
    </div>
    <div class="mid-content">
      <h1 @click="goToFeedback">{{ data.title }}</h1>
      <h2>{{ data.description }}</h2>
      <span>{{ data.category }}</span>
    </div>

    <div class="count-coments">
      <img src="../assets/coment.png" alt="" />
      <span>{{ data.comments?.length }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Feedback from "@/entity/Feedback";
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  setup() {
    const containerRef = ref({} as HTMLDivElement);
    return { containerRef };
  },
  props: {
    data: {
      required: true,
      type: Object as PropType<Feedback>,
    },
    view: {
      required: false,
      type: String,
    },
  },
  methods: {
    goToFeedback() {
      this.$router.push(`/feedback/${this.data.id}`);
    },
  },

  mounted() {
    this.containerRef.addEventListener("click", () => {});
  },
});
</script>

<style scoped lang="css">
.content-feedback {
  display: grid;

  grid-template-columns: min-content auto;
  grid-template-rows: auto;
  grid-template-areas:
    "feedback-state feedback-state"
    "mid-content mid-content"
    "count-votes count-coments";
  padding: 1.5em;

  gap: 5px;
  background-color: white;

  position: relative;

  margin-bottom: 10px;
  border-radius: 10px;
  min-width: 100% !important;
}

.content-feedback.roadmap.planned {
  border-top: 5px solid var(--planned-color);
}
.content-feedback.roadmap.in-progress {
  border-top: 5px solid var(--purple-color);
}
.content-feedback.roadmap.live {
  border-top: 5px solid var(--very-light-blue);
}

.feedback-state {
  width: 100%;
  grid-area: feedback-state;
}

.feedback-state p {
  display: flex;
  align-items: center;
}

.feedback-state p::before {
  width: 8px;
  height: 8px;
  display: flex;
  content: "";
  border-radius: 50%;
  margin-right: 5px;
}

.feedback-state p.planned::before {
  background-color: var(--planned-color);
}
.feedback-state p.in-progress::before {
  background-color: var(--purple-color);
}
.feedback-state p.live::before {
  background-color: var(--very-light-blue);
}

.count-votes {
  grid-area: count-votes;
  background-color: var(--light-gray);
  width: 5.307em;
  height: 2.46em;

  color: var(--dark-blue);
  font-weight: bold;
  font-size: 0.8125em;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
}

.count-votes img {
  width: 11px;
  margin-right: 5px;
}

.count-votes:hover {
  background-color: rgb(207, 215, 255);
}
.mid-content {
  grid-area: mid-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.mid-content h1 {
  margin-top: 0px;
  margin-bottom: 1.09em;
  font-size: 0.8125em;

  color: var(--dark-blue);

  cursor: pointer;
}

.mid-content h2 {
  font-size: 0.8125em;
  color: var(--grayish-blue);

  margin-bottom: 0.615em;
}

.mid-content span {
  padding: 0px 1.23em;
  height: 2.307em;
  background-color: var(--light-gray);
  border-radius: 10px;
  font-size: 0.8125em;
  font-weight: 600;
  color: var(--light-blue);
  cursor: pointer;
  transition: background-color 0.3s ease 0s;
  width: min-content;

  display: flex;
  align-items: center;
  justify-content: center;
}
.count-coments {
  grid-area: count-coments;
  justify-self: flex-end;

  display: flex;
  align-items: center;

  color: var(--dark-blue);
  font-weight: bold;
}

.count-coments img {
  margin-right: 5px;
}

@media (min-width: 768px) {
  [class="content-feedback"] {
    grid-template-areas:
      "count-votes feedback-state count-coments"
      "count-votes mid-content count-coments"
      "count-votes mid-content count-coments";
  }

  [class="content-feedback"] .count-votes {
    align-self: center;
    flex-direction: column;

    justify-content: space-between;

    padding: 10px 0 !important;
    height: 60px;
    width: 40px;
    padding: 0;
  }

  [class="content-feedback"] .mid-content {
    width: 100%;
    margin-left: 20px;
  }

  .mid-content h1 {
    font-size: 1.125em;
  }

  .mid-content h2 {
    font-size: 1em;
  }
}
</style>

<template>
  <div id="roadmap-page">
    <header>
      <div>
        <GoBack />

        <h1>Roadmap</h1>
      </div>
      <GenericBtn
        v-bind:style="{
          backgroundColor: 'var(--purple-color)',
          width: '134px',
        }"
        text="+ Add Feedback"
        @click="goTo('/add-feedback')"
      />
    </header>

    <main>
      <nav>
        <ul>
          <li
            v-for="item in status"
            :key="item"
            v-bind:class="{ active: currentTab === item }"
          >
            <a @click="toggleSectionView(item)">
              {{ item }} ({{ getFeedbackByStatus(item).length }})
            </a>
          </li>
        </ul>
      </nav>

      <div class="grid-roadmap">
        <section
          v-for="item in status"
          :key="item"
          :class="[item, { active: currentTab === item }]"
        >
          <h3>{{ item }}</h3>
          <span>{{ textStatus[item] }}</span>
          <FeedbackComponent
            v-for="data in getFeedbackByStatus(item)"
            :key="data.id"
            :view="item"
            :data="data"
          />
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { useStore } from "vuex";
import { defineComponent, reactive } from "vue";

import GenericBtn from "@/components/GenericBtn.vue";
import FeedbackComponent from "@/components/Feedback.vue";
import GoBack from "@/components/GoBack.vue";
import Feedback, { Status, User } from "@/entity/Feedback";

export default defineComponent({
  setup() {
    const store = useStore();

    const user = reactive(store.state.authUser.currentUser as User);

    return { user };
  },
  data() {
    return {
      currentTab: "in-progress",
      feedbacks: [] as Feedback[],
      status: Status.status,
      textStatus: {
        ["planned"]: "Ideas prioritized for research",
        ["in-progress"]: "Currently being developed",
        ["live"]: "Released features",
      },
    };
  },

  components: { GenericBtn, FeedbackComponent, GoBack },
  methods: {
    toggleSectionView(name: string) {
      this.currentTab = name;
    },
    getFeedbackByStatus(statusName: string) {
      const filteredFeedback = this.feedbacks.filter(
        (feedback) => feedback.status === statusName
      );

      return filteredFeedback;
    },
    goTo(routeName: string) {
      this.$router.push(routeName);
    },
  },
  async mounted() {
    const feedbacks = await this.$requestService.userIndexFeedbacks(
      this.user.id
    );
    if (feedbacks.error) {
      return;
    }

    this.feedbacks = feedbacks.values;
  },
});
</script>

<style scoped src="./style.css" />

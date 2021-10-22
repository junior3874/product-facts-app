/* eslint-disable no-unused-vars */
<template>
  <div id="home-page">
    <section class="sub-header">
      <div class="board">
        <h1>Frontend Mentor</h1>
        <h2>Feedback Board</h2>
        <button v-if="hamburguerMenu" class="btn-hamburguer">
          <img
            v-if="!modalMode"
            src="../../assets/hamburguer.svg"
            alt="open"
            v-on:click="modalMode = !modalMode"
          />

          <img
            v-if="modalMode"
            v-on:click="modalMode = !modalMode"
            src="../../assets/close.png"
            alt=""
          />
        </button>
      </div>

      <transition name="root_leaving">
        <aside v-show="modalMode">
          <transition name="aside_group_leaving">
            <div v-show="modalMode" class="aside_group">
              <div class="page_information_box filter">
                <FeatureBtn
                  v-for="button in [...categorys, 'All']"
                  :key="button"
                  v-bind:name="button"
                  v-bind:class="[filteredBy === button ? 'active' : '']"
                  v-bind:onPressed="onPressedBtnFeature"
                />
              </div>
              <div class="page_information_box roadmap">
                <div class="roadmap_header">
                  <h1>My roadmap</h1>
                  <a @click="goTo('/roadmap')">View</a>
                </div>
                <ul>
                  <li>
                    <p class="roadmap_prop planned">Planned</p>
                    <span>2</span>
                  </li>
                  <li>
                    <p class="roadmap_prop in_progress">In-Progress</p>
                    <span>3</span>
                  </li>
                  <li>
                    <p class="roadmap_prop live">Live</p>
                    <span>1</span>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </aside>
      </transition>
    </section>

    <header>
      <div class="order-menu">
        <span class="detail-box">
          <img src="@/assets/suggestion-icon.svg" alt="" />
          Suggestions
        </span>
        <span>Sort by : </span>
        <button @click.stop="dropdownVisible = !dropdownVisible">
          {{ sortedBy }}
          <img src="../../assets/arrow-down.svg" alt="" />
        </button>
        <Dropdown
          v-bind:isVisible="dropdownVisible"
          v-bind:options="[
            'Most Upvotes',
            'Least Upvotes',
            'Most Comments',
            'Least Comments',
          ]"
          v-bind:onPressedOption="onPressedOption"
          v-bind:selectedOption="sortedBy"
          v-bind:clickedOutside="disableDropdown"
        />
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
    <main v-if="feedbacks">
      <section class="feedback-list" v-for="item in feedbacks" :key="item.id">
        <p v-if="feedbacks.length === 0">Sem resultados</p>
        <FeedbackComponent v-bind:data="item" />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import GenericBtn from "../../components/GenericBtn.vue";
import FeedbackComponent from "../../components/Feedback.vue";
import Dropdown from "../../components/Dropdown.vue";
import FeatureBtn from "../../components/FeatureBtn.vue";
import verifyFilterHasExist from "./utils/verifyFiltersHasExist";
import Feedback, { Category } from "@/entity/Feedback";
import { useRoute } from "vue-router";

const sorteds = [
  "Most Upvote",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
];
export default defineComponent({
  name: "home",
  components: { GenericBtn, FeedbackComponent, Dropdown, FeatureBtn },
  setup() {
    const route = useRoute();

    const getCurrentFilteredByInQuery =
      verifyFilterHasExist(
        route.query.filteredBy as string,
        Category.categorys
      ) || "All";

    const getCurrentSortedByInQuery = ref(
      verifyFilterHasExist(route.query.sorted as string, sorteds) ||
        "Most Upvotes"
    );

    return {
      categorys: Category.categorys,
      filteredBy: ref(getCurrentFilteredByInQuery),
      sortedBy: getCurrentSortedByInQuery,
    };
  },

  data() {
    return {
      hamburguerMenu: false,
      modalMode: false,
      dropdownVisible: false,
      feedbacks: [] as Feedback[],
    };
  },

  methods: {
    disableDropdown: function () {
      this.dropdownVisible = false;
    },
    onPressedOption(option: string) {
      this.sortedBy = option;
    },
    onPressedBtnFeature(feature: string) {
      this.filteredBy = feature;
      this.modalMode && this.hamburguerMenu ? (this.modalMode = false) : null;
    },
    goTo(routeName: string) {
      this.$router.push(routeName);
    },
  },
  watch: {
    modalMode() {
      if (this.modalMode && this.hamburguerMenu) {
        document.querySelector("body")!.style.overflow = "hidden";
        return;
      }
      document.querySelector("body")!.style.overflow = "auto";
    },
    async sortedBy() {
      await this.$router.push({
        path: "/",
        query: { ...this.$route.query, sorted: this.sortedBy },
      });

      const params = this.$route.query;
      const feedbacks = await this.$requestService.indexFeedbacks(params);
      if (feedbacks.error) {
        return;
      }

      this.feedbacks = feedbacks.values;
    },
    async filteredBy() {
      await this.$router.push({
        path: "/",
        query: {
          ...this.$route.query,
          filteredBy: this.filteredBy === "All" ? undefined : this.filteredBy,
        },
      });

      const params = this.$route.query;
      const feedbacks = await this.$requestService.indexFeedbacks(params);
      if (feedbacks.error) {
        return;
      }

      this.feedbacks = feedbacks.values;
    },
  },

  async mounted() {
    const response = await this.$requestService.indexFeedbacks(
      this.$route.query
    );

    if (response.error) {
      return;
    }

    this.feedbacks = response.values;

    const matchMedia = window.matchMedia("(min-width: 768px)");

    const fn = () => {
      matchMedia.matches
        ? (() => {
            this.hamburguerMenu = false;
            this.modalMode = true;
          })()
        : (() => {
            this.hamburguerMenu = true;
            this.modalMode = false;
          })();
    };
    fn();
    matchMedia.addListener(fn);
  },

  unmounted() {
    document.querySelector("body")!.style.overflow = "auto";
  },
});
</script>

<style scoped src="./style.css" />

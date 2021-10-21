<template>
  <div class="root-content-area">
    <div class="content-area">
      <GoBack :gray="true" />
      <form @submit="submitFeedback">
        <h1>Create new Feedback</h1>

        <fieldset>
          <label>Feedback Title</label>
          <p for="">Add a short, descriptive headline</p>
          <InputField
            typeElement="input"
            ref="feedbackTitleRef"
            messageError="Title have more than or empty 60 characters"
          />
        </fieldset>

        <fieldset class="select-category">
          <label>Category</label>
          <p>Choose a category for your feedback</p>
          <img src="../../assets/arrow-down.svg" alt="" />

          <InputField
            typeElement="input-readonly"
            :value="selectedCategory"
            @click="toggleDropdown"
            messageError="please, select one category"
            ref="feedbackCategoryRef"
          />

          <Dropdown
            :isVisible="dropdownVisible"
            :options="categorys"
            :onPressedOption="onPressedOption"
            :selectedOption="selectedCategory"
            :clickedOutside="disableDropdown"
          />
        </fieldset>

        <fieldset>
          <label>Description</label>
          <p>set description for this feedback</p>
          <InputField
            typeElement="textarea"
            ref="feedbackDescriptionRef"
            messageError="please, put one description"
          />
        </fieldset>

        <div class="buttons-actions">
          <GenericBtn
            v-bind:style="{
              backgroundColor: 'var(--purple-color)',
              marginBottom: '1.23em',
            }"
            text="Add feedback"
          />
          <GenericBtn
            v-bind:style="{
              backgroundColor: ' var(--dark-blue)',
            }"
            text="Cancel"
          />
        </div>

        <div class="icon-top">
          <img src="../../assets/new-feedback.svg" alt="" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";

import { Category, Title, Comment, Description } from "../../entity/Feedback";

import validationFields, {
  FieldForValidation,
} from "../utils/validationFields";

import { fields } from "./utils/fieldsForAddFeedbackForm";

import GoBack from "../../components/GoBack.vue";
import Dropdown from "../../components/Dropdown.vue";
import GenericBtn from "../../components/GenericBtn.vue";
import InputField from "../../components/InputField.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "AddFeedback",
  components: { GoBack, Dropdown, GenericBtn, InputField },
  setup() {
    const store = useStore();
    const feedbackDescriptionRef = ref();
    const feedbackTitleRef = ref();
    const feedbackCategoryRef = ref();

    const user = ref();
    onMounted(() => {
      user.value = store.state.authUser.currentUser;
    });

    return {
      feedbackDescriptionRef,
      feedbackTitleRef,
      feedbackCategoryRef,
    };
  },
  data() {
    return {
      dropdownVisible: false,
      selectedCategory: "",
      categorys: Category.categorys,
    };
  },
  methods: {
    disableDropdown() {
      this.dropdownVisible = false;
    },

    onPressedOption(category: string) {
      this.selectedCategory = category;
    },
    toggleDropdown($event: Event) {
      this.dropdownVisible = this.dropdownVisible ? false : true;
    },
    submitFeedback($event: Event) {
      $event.preventDefault();

      const title: FieldForValidation = {
        value: this.feedbackTitleRef.$el.firstChild.value,
        fieldName: "title",
        togglingError: this.feedbackTitleRef.toggleFieldError,
      };

      const description: FieldForValidation = {
        value: this.feedbackDescriptionRef.$el.firstChild.value,
        fieldName: "description",
        togglingError: this.feedbackDescriptionRef.toggleFieldError,
      };

      const category: FieldForValidation = {
        value: this.selectedCategory,
        fieldName: "category",
        togglingError: this.feedbackCategoryRef.toggleFieldError,
      };

      const res = validationFields(fields, title, description, category);
      if (!res) return;

      this.$requestService.createFeedback({
        title: title.value as string,
        category: category.value as string,
        description: description.value as string,
        status: "planned",
      });
    },
  },
});
</script>

<style scoped src="./style.css" />

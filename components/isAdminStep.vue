<template>
  <div>
    <b-row style="padding-top:10px;padding-bottom:10px;">
      <b-col cols="12">
        <b-button
          size="lg"
          v-on:click="isAdmin(1)"
          class="full_width btn_orange"
          >יצירת בית</b-button
        >
      </b-col>
    </b-row>

    <b-row style="padding-bottom:10px;">
      <b-col cols="12">
        <b-button
          size="lg"
          v-on:click="isAdmin(0)"
          class="full_width btn_orange"
          >הצטרפות לבית</b-button
        >
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    isAdmin(is_admin) {
      this.$parent.handleSubmit(is_admin);
    }
  }
};
</script>

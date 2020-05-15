<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2 v-if="isAdmin == 1">
          יצירת בית
        </h2>
        <h2 v-if="isAdmin == 0">
          הצטרפות לבית
        </h2>
      </b-col>
    </b-row>
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        :state="houseNameState"
        :label="labelName"
        label-for="houseName-input"
        :invalid-feedback="houseName_f"
      >
        <b-form-input
          id="houseName-input"
          v-model="houseName"
          ref="houseName"
          type="text"
          :state="houseNameState"
          required
        ></b-form-input>
      </b-form-group>
      <span style="color: #dc3545;" v-if="houseErr">{{ houseErrMsg }}</span>
    </form>
  </div>
</template>

<script>
export default {
  props: [
    "isAdmin",
    "houseNameStateP",
    "houseName_fp",
    "houseErr",
    "houseErrMsg"
    // ,  "houseNameP"
  ],
  computed: {
    labelName: function() {
      if (this.isAdmin == 1) {
        return "שם בית";
      }
      return "קוד בית";
    },
    houseName_f: function() {
      if (this.isAdmin == 1) {
        return "הכנס שם בית";
      }
      return "הכנס קוד בית";
    }
  },

  data() {
    return {
      houseName: "",
      houseNameState: null
    };
  },

  // beforeMount() {
  //   this.houseName = this.houseNameP;
  // },
  methods: {
    checkFormValidity() {
      let valid = this.$refs.form.checkValidity();
      const validhouseName = this.$refs.houseName.checkValidity();
      this.houseNameState = validhouseName;

      return valid;
    },

    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      //if is ok from server then move to the rigth page - user: user tasks or admin: admin index
      this.$parent.houseCreateUpdate(this.houseName);

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
};
</script>

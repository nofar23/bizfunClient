<template>
  <form ref="form" @submit.stop.prevent="handleSubmit">
    <b-form-group
      :state="emailState"
      label="מייל"
      label-for="email-input"
      :invalid-feedback="email_f"
    >
      <b-form-input
        id="email-input"
        v-model="email"
        ref="email"
        type="email"
        :state="emailState"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      :state="nameState"
      label="שם"
      label-for="name-input"
      invalid-feedback="הכנס שם"
    >
      <b-form-input
        id="name-input"
        v-model="name"
        ref="name"
        type="text"
        :state="nameState"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      :state="passwordState"
      label="סיסמה"
      label-for="password-input"
      invalid-feedback="הכנס סיסמה באורך 6 תווים"
    >
      <b-form-input
        id="password-input"
        v-model="password"
        ref="password"
        type="number"
        :state="passwordState"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      :state="passwordVState"
      label="אימות סיסמה"
      label-for="passwordV-input"
      invalid-feedback="סיסמה לא תואמת"
    >
      <b-form-input
        id="passwordV-input"
        v-model="passwordV"
        ref="passwordV"
        type="number"
        :state="passwordVState"
        required
      ></b-form-input>
    </b-form-group>
  </form>
</template>

<script>
export default {
  props: ["emailP", "email_fp", "emailStateP", "nameP"],
  data() {
    return {
      email: "",
      name: "",

      password: "",
      passwordV: "",
      emailState: null,
      nameState: null,
      passwordState: null,
      passwordVState: null,
      isAdmin: false,
      email_f: "הכנס מייל"
    };
  },
  watch: {
    emailStateP: function(val) {
      console.log(val);
      this.emailState = val;
    },
    email_fp: function(val) {
      this.email_f = val;
    }
  },
  beforeMount() {
    this.email = this.emailP;
    this.name = this.nameP;
  },
  methods: {
    checkFormValidity() {
      let valid = this.$refs.form.checkValidity();
      const validEmail = this.$refs.email.checkValidity();
      this.emailState = validEmail;
      if (this.emailState == false) {
        this.email_f = "הכנס מייל";
      }

      const validName = this.$refs.name.checkValidity();
      this.nameState = validName;

      const validPassword = this.$refs.password.checkValidity();
      this.passwordState = validPassword;
      if (this.password.length < 6) {
        this.passwordState = false;
        valid = false;
      } else {
        this.passwordVState = null;
      }
      if (this.password != this.passwordV) {
        this.passwordVState = false;
        valid = false;
      } else {
        this.passwordVState = null;
      }
      return valid;
    },

    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      //if is ok from server then move to the rigth page - user: user tasks or admin: admin index
      this.$parent.userInformationUpdate(this.email, this.name, this.password);

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
};
</script>

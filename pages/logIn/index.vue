<template>
  <div>
    <div v-if="loadPage == 1">
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="auto" class="pt-2 text_center"
          ><h5>ברוך הבא לאפליקצית</h5></b-col
        >
      </b-row>

      <b-row class="justify-content-md-center">
        <b-col cols="12" style="text-align: center;"
          ><img style="width:180px;height:100px;" src="~/assets/img/logo2.png"
        /></b-col>
      </b-row>
    </div>
    <b-container v-else class="bv-example-row">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-col cols="12">
          <b-form-group
            :state="emailState"
            label="מייל"
            label-for="email-input"
            invalid-feedback="הכנס מייל"
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
        </b-col>
        <b-col cols="12">
          <b-form-group
            :state="passwordState"
            label="סיסמה"
            label-for="password-input"
            invalid-feedback="הכנס סיסמה"
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
          <p class="mb-2" style="color: #dc3545;" v-if="userNotExsist == 1">
            מייל או סיסמה אינם נכונים
          </p>
        </b-col>
        <b-col cols="12">
          <b-button class="full_width mb-2 btn_step" v-on:click="handleSubmit"
            >התחבר</b-button
          >
        </b-col>
        <b-col cols="12" class="text-center">
          <b-link to="/signUp">
            עוד לא נרשמת? לחץ להרשם
          </b-link>
        </b-col>
      </form>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: "logIn",
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      emailState: null,
      passwordState: null,
      userNotExsist: 0,
      loadPage: 1
    };
  },
  async beforeMount() {
    if (localStorage.getItem("userToken") !== null) {
      this.autoLoginRequest = await this.$axios
        .$post(this.$axios.defaults.baseURL + "users/isTokenExist", {
          token: localStorage.getItem("userToken")
        })
        .then(user => {
          console.log(user);
          if (user.result.user.length != 0) {
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user.result.user[0]));
            localStorage.setItem("loadPage", 1);
            if (user.result.user[0].userRole == 1) {
              // window.location.href = "/admin";
              this.$router.push("/admin");
            } else if (user.result.user[0].userRole == 0) {
              // window.location.href = "/user";
              this.$router.push("/user");
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.loadPage = 0;
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      const validEmail = this.$refs.email.checkValidity();
      this.emailState = validEmail;
      const validPassword = this.$refs.password.checkValidity();
      this.passwordState = validPassword;
      return valid;
    },

    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      //if is ok from server then move to the rigth page - user: user tasks or admin: admin index
      console.log("login");
      this.loginRequest = await this.$axios
        .$post(this.$axios.defaults.baseURL + "users/login", {
          userEmail: this.email,
          userPassword: this.password
        })
        .then(user => {
          console.log(user);
          if (user.result.user.length == 0) {
            this.emailState = null;
            this.passwordState = null;
            console.log("no such user");
            this.userNotExsist = 1;
          } else {
            console.log(user);
            localStorage.setItem("userToken", user.result.token);
            localStorage.setItem("user", JSON.stringify(user.result.user));
            if (user.result.user.userRole == 1) {
              // window.location.href = "/admin";
              this.$router.push("/admin");
            } else if (user.result.user.userRole == 0) {
              // window.location.href = "/user";
              this.$router.push("/user");
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
};
</script>

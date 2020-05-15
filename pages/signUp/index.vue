<template>
  <b-container class="bv-example-row">
    <userInformationStep
      :emailP="email"
      :nameP="name"
      :email_fp="email_fp"
      :emailStateP="emailStateP"
      v-if="step == 0"
      ref="formProfile"
    />
    <isAdminStep v-if="step == 1" />
    <HouseStep
      :isAdmin="isAdmin"
      :houseNameP="houseName"
      :houseErr="houseErr"
      :houseErrMsg="houseErrMsg"
      v-if="step == 2 && load == 0"
      ref="formHouse"
    />

    <div class="d-flex justify-content-center mb-3 pt-2">
      <b-spinner
        v-if="load == 1"
        variant="primary"
        label="Spinning"
      ></b-spinner>
    </div>

    <b-row style="padding-bottom:10px;">
      <b-col cols="6">
        <b-button
          v-if="step != 0 && load == 0"
          v-on:click="backStepClick"
          class="full_width btn_step"
          >הקודם</b-button
        >
      </b-col>

      <b-col cols="6">
        <b-button
          v-if="step == 0"
          class="full_width btn_step"
          v-on:click="handleSubmit"
          >הבא</b-button
        >
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" class="pb-2">
        <b-button
          v-on:click="handleSubmit"
          v-if="step == 2"
          class="full_width btn_step"
          >הרשם</b-button
        >
      </b-col>
      <b-col cols="12" class="text-center">
        <b-link to="/logIn" active>
          יש לי כבר משתמש
        </b-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import userInformationStep from "~/components/userInformationStep.vue";
import isAdminStep from "~/components/isAdminStep.vue";
import HouseStep from "~/components/HouseStep.vue";

export default {
  layout: "logIn",
  components: {
    userInformationStep,
    isAdminStep,
    HouseStep
  },
  data() {
    return {
      step: 0,
      load: 0,
      email: "",
      name: "",
      email_fp: "הכנס מייל",
      emailStateP: null,

      password: "",
      isAdmin: "",
      houseName: "",
      houseErr: 0,
      houseErrMsg: ""
    };
  },
  methods: {
    backStepClick() {
      if (this.step == 2) {
        this.houseCodeNotExsist = 0;
      }
      this.step--;
    },
    handleSubmit(is_admin = null) {
      switch (this.step) {
        case 0:
          this.$refs.formProfile.handleSubmit();
          break;
        case 1:
          this.isAdmin = is_admin;

          this.step = 2;

          break;
        case 2:
          this.$refs.formHouse.handleSubmit();
          break;
      }
    },

    async userInformationUpdate(email, name, password) {
      this.userIsExsistRequest = await this.$axios
        .$post(this.$axios.defaults.baseURL + "users/isUserExsist", {
          userEmail: email
        })
        .then(isUserExsist => {
          this.email_fp = "הכנס מייל";
          if (isUserExsist.message == "user already exist!") {
            this.email_fp = "מייל קיים במערכת";
            this.emailStateP = false;
          } else {
            this.emailStateP = true;
            this.email = email;
            this.name = name;
            this.password = password;
            this.step++;
            console.log(this.step);
          }
        });
    },
    houseCreateUpdate(houseName) {
      this.houseName = houseName;
      this.load = 1;
      this.signUp();
    },
    async signUp() {
      if (this.isAdmin == 1) {
        this.signUpRequest = await this.$axios
          .$post(this.$axios.defaults.baseURL + "users/signUpAdmin", {
            userEmail: this.email,
            userName: this.name,
            userPassword: this.password,
            houseNameOrId: this.houseName
          })
          .then(user => {
            console.log(user);
            localStorage.setItem("userToken", user.result.token);
            localStorage.setItem("user", JSON.stringify(user.result.user));
            // window.location.href = "/admin";
            this.$router.push("/admin");
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.isAdmin == 0) {
        this.signUpRequest = await this.$axios
          .$post(this.$axios.defaults.baseURL + "users/signUpUser", {
            userEmail: this.email,
            userName: this.name,
            userPassword: this.password,
            houseNameOrId: this.houseName
          })
          .then(isCreate => {
            if (isCreate.message == "house doesn't exist!") {
              console.log("no such house code");
              this.load = 0;
              this.houseErr = 1;
              this.houseErrMsg = "קוד לא קיים במערכת";
            } else if (isCreate.message == "user full in this house") {
              this.load = 0;
              this.houseErr = 1;
              this.houseErrMsg = "מקסימום משתמשים עבור בית זה";
            } else {
              localStorage.setItem("userToken", isCreate.result.token);
              localStorage.setItem(
                "user",
                JSON.stringify(isCreate.result.user)
              );
              // window.location.href = "/user";
              this.$router.push("/user");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }

      // let that = this;
      // setTimeout(function() {
      //   console.log(that.$data);
      //   if (that.isAdmin == 0) {
      //     window.location.href = "/user";
      //   } else {
      //     window.location.href = "/admin";
      //   }
      // }, 2000);
    }
  }
};
</script>

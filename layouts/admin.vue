<template>
  <div>
    <div v-if="loadPage == 1">
      <div class="header">
        <b-container class="bv-example-row ">
          <b-row class="justify-content-md-center">
            <b-col cols="6"></b-col>
            <b-col cols="6" style="text-align: left;"
              ><img
                style="width:110px;height:55px;"
                class="mt-2"
                src="~/assets/img/logo2.png"
            /></b-col>
          </b-row>

          <hr />
        </b-container>
      </div>
      <b-container
        class="bv-example-row "
        style="padding-bottom:50px;padding-top:90px;"
      >
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
      </b-container>
    </div>
    <div v-if="loadPage == 0" class="header">
      <b-container class="bv-example-row ">
        <b-row class="justify-content-md-center">
          <b-col cols="6" v-on:click="isOpen = !isOpen">
            <b-icon
              style="cursor: pointer;z-index: 9999;position: absolute;"
              font-scale="2"
              class="mt-4"
              icon="list"
            ></b-icon>
            <div
              v-if="isOpen == true"
              class="w3-sidebar w3-bar-block w3-card w3-animate-right"
              style="right:0;top:0;padding-top:70px;padding-right:20px;"
            >
              <b-row>
                <b-col cols="12">
                  <b-row>
                    <b-col class="mb-2 mt-2" style="padding-left:0px;" cols="6">
                      {{ houseCode }} #
                    </b-col>
                    <b-col cols="5">
                      <span
                        class="btn btn-info text-white copy-btn ml-auto"
                        @click.stop.prevent="copyTestingCode"
                      >
                        העתק
                      </span>
                    </b-col>
                    <input type="hidden" id="testing-code" :value="houseCode" />
                  </b-row>
                </b-col>
                <b-col cols="12">
                  <a v-on:click="logOut()"
                    ><b-icon class="ml-1" icon="power"></b-icon>התנתקות</a
                  >
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col cols="6" style="text-align: left;"
            ><img
              style="width:110px;height:55px;"
              class="mt-2"
              src="~/assets/img/logo2.png"
          /></b-col>
        </b-row>

        <hr />
      </b-container>
    </div>

    <b-container
      v-if="loadPage == 0"
      class="bv-example-row"
      style="padding-bottom:50px;padding-top:100px;"
    >
      <nuxt />
    </b-container>

    <div v-if="loadPage == 0" class="navbar">
      <b-container class="bv-example-row">
        <b-row class="justify-content-md-center nav_row">
          <b-col cols="4"
            ><b-button
              v-bind:class="[is_active == 0 ? 'nav_press' : 'nav_non_press']"
              variant="#484F59"
              to="/admin/tasks"
              ><b-icon icon="list-task"></b-icon>מטלות</b-button
            ></b-col
          >
          <b-col cols="4"
            ><b-button
              v-bind:class="[is_active == 1 ? 'nav_press' : 'nav_non_press']"
              to="/admin/users"
              style="padding-right: 0px;"
              variant="#484F59"
              ><b-icon icon="people"></b-icon>משתמשים</b-button
            ></b-col
          >
          <b-col cols="4"
            ><b-button
              to="/admin/benefits"
              v-bind:class="[is_active == 2 ? 'nav_press' : 'nav_non_press']"
              variant="#484F59"
              ><b-icon icon="gift"></b-icon>הטבות</b-button
            ></b-col
          >
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: "admin",
  data() {
    return {
      // is_active: -1,
      isOpen: false,
      houseCode: "",
      houseName: "",
      user: null
      // loadPage: 0
    };
  },
  computed: {
    is_active() {
      let url = this.$route.path;

      if (url.includes("/users")) {
        return 1;
      } else if (url.includes("/tasks")) {
        return 0;
      } else if (url.includes("/benefits")) {
        return 2;
      }
    },
    loadPage() {
      // return 0;
      return this.$store.state.loadPage;
      // return localStorage.getItem("loadPage");
    }
  },

  async beforeMount() {
    // this.loadPage = localStorage.getItem("loadPage");
    if (localStorage.getItem("user") === null) {
      this.$store.dispatch("setLoadPage", 1);
      // window.location.href = "/login";
      this.$router.push("/login");
      return;
    }

    var userObject = localStorage.getItem("user");
    let user = JSON.parse(userObject);
    this.$store.dispatch("setUser", user);
    this.user = this.$store.state.loadUser;
    console.log(this.user);
    if (this.user.userRole == 0) {
      this.$store.dispatch("setLoadPage", 1);
      this.$router.push("/login");
      // window.location.href = "/login";
      return;
    }
    this.$store.dispatch("setLoadPage", 0);
    // localStorage.setItem("loadPage", 0);
    // this.loadPage = localStorage.getItem("loadPage");

    // var userObject = localStorage.getItem("user");
    // this.user = JSON.parse(userObject);

    //
    let houseCodeReq = await this.$axios
      .$get(
        this.$axios.defaults.baseURL + "houses/houseId/" + this.user.houseId
      )
      .then(house => {
        this.houseCode = house[0].code;
        this.houseName = house[0].name;
      })
      .catch(err => {
        console.log(err);
      });
    //
    // let url = $nuxt.$route.path;

    // if (url.includes("/users")) {
    //   this.is_active = 1;
    // } else if (url.includes("/tasks")) {
    //   this.is_active = 0;
    // } else if (url.includes("/benefits")) {
    //   this.is_active = 2;
    // }
    // console.log($nuxt.$route.path);
  },
  methods: {
    logOut() {
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
      this.$router.push("../logIn");
      // window.location.href = "/login";
    },
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        // var msg = successful ? 'successful' : 'unsuccessful';
        // alert('Testing code was copied ' + msg);
      } catch (err) {
        // alert('Oops, unable to copy');
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

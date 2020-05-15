<template>
  <div>
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
      <nuxt />
    </b-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      is_active: 0
    };
  },

  beforeMount() {}
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

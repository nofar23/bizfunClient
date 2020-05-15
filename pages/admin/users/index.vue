<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="12">
          <b-card class=" mb-3 card_title" title="Card Title" no-body>
            <b-card-body style="text-align:center;">
              <b-row>
                <b-col cols="12" class="benefit_name">משתמשים</b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col v-if="all_users.length != 0" v-for="user in all_users" cols="12">
          <a class="a_card" :to="`/admin/users/${user.userId}`">
            <b-card
              class=" mb-3 card_benefit"
              style="cursor:pointer;"
              v-on:click="
                is_active = 1;
                user = user;
              "
              title="Card Title"
              no-body
            >
              <b-card-body style="text-align:center;">
                <b-row>
                  <b-col cols="6" class="user_name_card"
                    >{{ user.fullname.split(" ")[0] }} <br />
                    {{ user.points }} נקודות</b-col
                  >
                  <b-col cols="6" class="benefit_name">צפה בנתונים</b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </a>
        </b-col>
      </b-row>
      <b-row
        v-if="all_users.length == 0"
        class="justify-content-md-center  pb-1"
        style="text-align:center;"
      >
        <h6>הוסף משתמשים</h6>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: "admin",
  component: {},

  data() {
    return {
      houseId: -1,
      all_users: {}
      // user: []
      // all_users: [
      //   { id: 1, name: "מיכל", amount: 50 },
      //   { id: 2, name: "איתי", amount: 30 },
      //   { id: 3, name: "מיכל", amount: 40 }
      // ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.loadUser;
    }
  },

  async fetch() {
    console.log(this.$store.getters);
    // this.user = this.$store.getters.loadUser;
    // console.log("ddd");
    // console.log(this.user);

    this.houseId = this.user.houseId;
    this.all_users = await this.$axios.$get(
      this.$axios.defaults.baseURL + "users/houseId/" + this.houseId
    );
  },
  fetchOnServer: false,

  methods: {}
};
</script>

<style>
.a_card:hover {
  text-decoration: none;
}
</style>

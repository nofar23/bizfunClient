<template>
  <b-container class="bv-example-row" style="padding-bottom:50px">
    <b-row class="pb-4 justify-content-md-center">
      <b-col cols="6" class="text_center" style="padding-left:5px;"
        ><b-button
          v-bind:class="[is_active == 0 ? 'btn_press' : 'btn_non_press']"
          size="lg"
          v-on:click="is_active = 0"
          class="full_width"
        >
          הטבות</b-button
        ></b-col
      >
      <b-col cols="6" class="text_center" style="padding-right:5px;"
        ><b-button
          class="full_width"
          v-bind:class="[is_active == 1 ? 'btn_press' : 'btn_non_press']"
          size="lg"
          v-on:click="is_active = 1"
          >ממתין לאישור</b-button
        ></b-col
      >
    </b-row>

    <AllBenefits v-if="is_active == 0" :benefits="all_benefits" />
    <BenefitsWaiting
      v-if="is_active == 1"
      :benefitsWaiting="benefits_waiting"
    />
  </b-container>
</template>

<script>
import BenefitsWaiting from "~/components/admin/BenefitsWaiting.vue";
import AllBenefits from "~/components/admin/AllBenefits.vue";

export default {
  layout: "admin",
  components: {
    AllBenefits,
    BenefitsWaiting
  },

  data() {
    return {
      is_active: 0,
      all_benefits: {},
      benefits_waiting: {},
      houseId: -1
    };
  },
  computed: {
    user() {
      return this.$store.state.loadUser;
    }
  },

  async fetch() {
    this.houseId = this.user.houseId;
    this.all_benefits = await this.$axios.$get(
      this.$axios.defaults.baseURL + "houses/rewards/houseId/" + this.houseId
    );

    this.benefits_waiting = await this.$axios.$get(
      this.$axios.defaults.baseURL +
        "houses/rewardsWaiting/houseId/" +
        this.houseId
    );
  },
  fetchOnServer: false,
  methods: {
    async approveReward(reward_id, user_id) {
      let data = {
        rewardId: reward_id,
        userId: user_id,
        newStatus: "user_reward_completed"
      };
      console.log(data);

      let approveRewardResult = await this.$axios.put(
        this.$axios.defaults.baseURL + "users/approveUserReward",
        data
      );

      if (approveRewardResult.status == 200) {
        for (let i = 0; i < this.benefits_waiting.length; i++) {
          if (this.benefits_waiting[i].rewardId == reward_id) {
            this.benefits_waiting.splice(i, 1);
          }
        }
      }
    },
    async hideBenefit(benefit_id, index, status, isOnBoard) {
      let data = {
        houseId: this.houseId,
        rewardId: benefit_id,
        status
      };

      let that = this;
      let updateRewardStatus = await this.$axios
        .put(this.$axios.defaults.baseURL + "houses/updateRewardStatus", data)
        .then(() => {
          that.all_benefits[index].status = status;
          that.all_benefits[index].isOnBoard = isOnBoard;
        })
        .catch(error => {
          that.all_benefits[index].status = status;
          that.all_benefits[index].isOnBoard = isOnBoard;

          let currStatus = that.all_tasks[index].status;
          if (currStatus == "reward onBoard") {
            that.all_benefits[index].status = "reward offBoard";
            that.all_benefits[index].isOnBoard = false;
          } else {
            that.all_benefits[index].status = "reward onBoard";
            that.all_benefits[index].isOnBoard = true;
          }

          console.log(that.all_benefits[index].status);
          console.log(error.response);
        });
    },
    async removeBenefit(benefit_id) {
      let data = {
        houseId: this.houseId,
        rewardId: benefit_id
      };
      let removeRewardResult = await this.$axios.post(
        this.$axios.defaults.baseURL + "houses/deleteReward",
        data
      );
      if (removeRewardResult.status == 200) {
        for (let i = 0; i < this.all_benefits.length; i++) {
          if (this.all_benefits[i].rewardId == benefit_id) {
            this.all_benefits.splice(i, 1);
          }
        }
      }
    },
    async addBenefit(benefit_id, benefit_name, benefit_amount) {
      let data = {
        name: benefit_name,
        price: benefit_amount,
        houseId: this.houseId,
        rewardId: benefit_id
      };
      console.log(data);
      if (benefit_id == -1) {
        //create
        let createRewardResult = await this.$axios.post(
          this.$axios.defaults.baseURL + "houses/createReward",
          data
        );
        if (createRewardResult.status == 200) {
          let newTaskId = createRewardResult.data.result.rewardId;
          let benefit = {
            rewardId: newTaskId,
            name: benefit_name,
            price: benefit_amount,
            isOnBoard: true
          };
          this.all_benefits.push(benefit);
        }
      } else {
        //update
        let result = await this.$axios.put(
          this.$axios.defaults.baseURL + "houses/updateReward",
          data
        );
        if (result.status == 200) {
          this.all_benefits.forEach(function(obj) {
            if (obj.rewardId === benefit_id) {
              obj.name = benefit_name;
              obj.price = benefit_amount;
            }
          });
        }
      }
    }
  }
};
</script>

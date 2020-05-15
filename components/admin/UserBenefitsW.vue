<template>
<div>
  <div>
    <b-card class=" mb-3 card_background" title="Card Title" no-body>
      <b-card-body style="text-align:center;">
        <b-row>
          <b-col v-if="benefitsW.length != 0" cols="12" class="benefit_name pb-2">הטבות ממתינות לאישור</b-col></b-col
          >
          <b-col v-else cols="12" class="benefit_name pb-2">אין הטבות ממתינות לאישור</b-col></b-col
          >
        </b-row>
        <b-row>
          <b-col v-for="(benefit,index) in benefitsW" cols="6" v-on:click="
              reward_index = index;
              reward_id = benefit.rewardId;
            "
            v-b-modal.modal-center-2 >
                <b-card class="card_custom_task card_waiting mb-3"    title="Card Title" no-body>
                    <b-card-body   class="card_body">
                        <b-col cols="12" class="task_name">{{benefit.name}}</b-col>
                        <b-col cols="12" class="task_amount">{{benefit.price}}  </b-col>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
  <div>
      <b-modal
        centered
        v-if="reward_index != -1"
        ok-title="אישור"
        cancel-title="ביטול"
        id="modal-center-2"
        title="BootstrapVue"
        @ok="approveReward"
      >
        <b-row class="text-center">
         
          <b-col cols="6">
            {{ benefitsW[reward_index].name }}
          </b-col>
        </b-row>
      </b-modal>
    </div>
    </div>
</template>

<script>
export default {
  name: "UserBenefitW",
  props: ['userId', 'benefitsW'],

  data() {
    return {
     
      reward_index: -1,
      reward_id: -1,
    };
  },
  // async fetch() {
  //   // console.log(
  //   //   this.$axios.defaults.baseURL + "users/userRewards/userId/" + this.$route.params.id + "/user_reward_waitForApprovement"
  //   // );
  //   // this.benefitsW = await this.$axios.$get(
  //   //   this.$axios.defaults.baseURL + "users/userRewards/userId/" + this.$route.params.id + "/user_reward_waitForApprovement"
  //   // );
   
  // },
  methods: {
    approveReward(){
      this.$parent.approveReward(this.reward_id, this.reward_index);
      this.$bvModal.hide("modal-center-2");
      this.reward_index = -1;
      this.reward_id = -1;
    }
 
  }
};
</script>

<style>
.card_custom_task {
 color: #fff;
 height: 120px;

} 

.overflow_title_card{
      display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.bold{
  font-weight: 700;
}


</style>

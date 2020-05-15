<template>
    <b-container class="bv-example-row"> 
        <b-row class="pb-4 justify-content-md-center">
            <b-col cols="6" style="padding-left:5px;" class="text_center"><b-button v-bind:class="[is_active == 0 ? 'btn_press' : 'btn_non_press']" class="full_width" :disabled="is_enough_money == 0" size="lg" v-on:click="is_active = 0">כל ההטבות</b-button></b-col>
            <b-col cols="6" style="padding-right:5px;" class="text_center"><b-button v-bind:class="[is_active == 1 ? 'btn_press' : 'btn_non_press']" class="full_width" :disabled="is_enough_money == 0" size="lg" v-on:click="is_active = 1">ההטבות שלי</b-button></b-col>
        </b-row>

        <MyBenefit :myBenefits="my_benefits" :benefitsW="benefitsW" v-if="is_active == 1 && is_enough_money != 0"/>
       

         <AllBenefit :benefits="all_benefit" v-if="is_active == 0 && is_enough_money != 0"/>
        

        <b-row v-if="is_enough_money == 0" class="justify-content-md-center">
            <b-col  cols="12" >
                <b-card class="card_enough_money mb-3"   title="Card Title" no-body>
                    <b-card-body   style="text-align:center;">
                        <b-col cols="12" class="task_name">אין לך מספיק נקודות כדי לממש את ההטבה הזו </br> לך לבצע מטלה <hr class="hr_custome"/></b-col>
                        <b-col cols="6" style="float: left;"><img src="~/assets/img/Rabbit1.png" class="rabbit_icon"/></b-col>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col  cols="12" >
                <img class="arrow_icon" src="~/assets/img/arrow.png"/>
            </b-col>
        </b-row>

        
    </b-container>
</template>


<script>
import MyBenefit from '~/components/user/MyBenefit.vue'
import AllBenefit from '~/components/user/AllBenefit.vue'


export default {
    layout: "user",
  components: {
    MyBenefit,
    AllBenefit
  },
  props: [ ],
 data() {
    return {
      is_active: 0,
      
      is_enough_money: -1,
      houseId:-1,
      userId: -1,
     
      all_benefit: {},
      my_benefits: {},
      benefitsW:{}
    };
  },
  computed: {
    user() {
      return this.$store.state.loadUser;
    }
  },
  async fetch() {
    this.userId = this.user.userId;
    this.houseId = this.user.houseId;
    this.all_benefit = await this.$axios.$get(
      this.$axios.defaults.baseURL +
        "houses/rewardsOnBoard/houseId/" +
        this.houseId
    );
    // console.log(this.all_benefit);
    let data = {
      userId: this.userId,
      houseId: this.houseId,
      status: "user reward waitForApprovement"
    }

      this.benefitsW = await this.$axios.$post(
      this.$axios.defaults.baseURL +
        "users/userRewards", 
        data
    );
    console.log("w");
console.log(this.benefitsW);

this.my_benefits = await this.$axios.$post(
      this.$axios.defaults.baseURL +
        "users/userRewards", 
        {
          userId: this.userId,
      houseId: this.houseId,
      status: "user reward completed"
        }
    );

    // this.my_benefits = await this.$axios.$get(
    //   this.$axios.defaults.baseURL + "users/myReward/userId/" + this.userId
    // );

    // console.log(this.my_benefits);
  },
  fetchOnServer: false,
  methods: {
    
    
    async addBenefit(benefit_id, benefit_index) {
      let data = {
        userId: this.userId,
        rewardId: benefit_id,
        houseId: 1,
        status: "user reward waitForApprovement"
      };
      console.log(data);
      let that = this;
      let addRewardUser = await this.$axios
        .post(this.$axios.defaults.baseURL + "users/requestReward", data)
        .then((isEnoughMoney) => {
          let msg = isEnoughMoney.data.message;
          console.log(isEnoughMoney);
          
          if (msg == "not enough money") {
            that.is_enough_money = 0;
          } else {
            that.is_enough_money = 1;
          
            that.benefitsW.push(
              that.all_benefit[benefit_index]
            );
          }
            
          
        })
        .catch((err) =>{
          console.log(err);
        })

       
      
    }
  }
};
</script>
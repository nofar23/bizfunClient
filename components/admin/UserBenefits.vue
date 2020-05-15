<template>
  <div>
    <b-card class=" mb-3 card_background" title="Card Title" no-body>
      <b-card-body style="text-align:center;">
        <b-row>
          <b-col v-if="benefits.length != 0" cols="12" class="benefit_name pb-2">הטבות שנוצלו</b-col></b-col
          >
          <b-col v-else cols="12" class="benefit_name pb-2">לא נוצלו הטבות</b-col></b-col
          >
        </b-row>
        <b-row>
          <b-col v-for="benefit in benefits" cols="12" >
                <b-card class="mb-3 card_benefit"    title="Card Title" no-body>
                    <b-card-body   class="card_body">
                        <b-col cols="12" class="benefit_name">{{benefit.name}} <b-icon font-scale="1"  icon="check"></b-icon></b-col>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "UserBenefits",
  props: ['userId', 'benefits'],

  data() {
    return {
      
    };
  },
  // async fetch() {
  //   // console.log(
  //   //   this.$axios.defaults.baseURL + "users/userRewards/userId/" + this.$route.params.id + "/user_reward_completed"
  //   // );
  //   this.benefits = await this.$axios.$get(
  //     this.$axios.defaults.baseURL + "users/userRewards/userId/" + this.$route.params.id + "/user_reward_completed"
  //   );
    
  // },
  methods: {}
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

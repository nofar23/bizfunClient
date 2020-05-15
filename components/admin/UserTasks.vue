<template>
  <div>
    <b-card class=" mb-3 card_background" title="Card Title" no-body>
      <b-card-body style="text-align:center;">
        <b-row>
          <b-col v-if="all_task.length != 0" cols="12" class="benefit_name pb-2">המשימות שנבחרו</b-col></b-col
          >
          <b-col v-else cols="12" class="benefit_name pb-2">לא נבחרו משימות</b-col></b-col
          >
        </b-row>
        <b-row>
          <b-col v-for="task in all_task" cols="6" >
                <b-card class="card_custom_task mb-3 " :class="`${user.color}`"  title="Card Title" no-body>
                    <b-card-body   class="card_body">
                        <b-col cols="12" class="bold overflow_title_card">{{task.name}}</b-col>
                        <b-col cols="12" class="bold">{{task.givenPoints}}  <b-icon v-if="task.status == 2"   icon="plus"></b-icon></b-col>
                       
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
  name: "UserTasks",
  props: ['userId', 'user'],

  data() {
    return {
     
      all_task: {}
    };
  },
  async fetch() {
    // console.log("dfdffdsfdf");
    // console.log(
    //   this.$axios.defaults.baseURL + "users/userTasks/userId/" + this.$route.params.id + "/task_inProgress"
    // );
    this.all_task = await this.$axios.$get(
      this.$axios.defaults.baseURL + "users/userTasks/userId/" + this.$route.params.id + "/status/task_inProgress"
    );
    
  },
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

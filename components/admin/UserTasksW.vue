<template>
<div>
  <div>
    <b-card class=" mb-3 card_background" title="Card Title" no-body>
      <b-card-body style="text-align:center;">
        <b-row>
          <b-col v-if="all_task_waiting.length != 0" cols="12" class="benefit_name pb-2">משימות שממתינות לאישור</b-col></b-col
          >
          <b-col v-else cols="12" class="benefit_name pb-2">אין משימות שממתינות לאישור</b-col></b-col
          >
        </b-row>
        <b-row>
          
          <b-col v-for="(task,index) in all_task_waiting" v-bind:key="task.taskId" cols="6"  v-on:click="
              task_index = index;
              task_id = task.taskId;
            "
            v-b-modal.modal-center>
                <b-card class="card_custom_task mb-3 card_waiting"  title="Card Title" no-body>
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
  <div>
      <b-modal
        centered
        v-if="task_index != -1"
        ok-title="אישור"
        cancel-title="ביטול"
        id="modal-center"
        title="BootstrapVue"
        @ok="approveTask"
      >
        <b-row class="text_center">
         
          <b-col cols="12">
            {{ all_task_waiting[task_index].name }}
          </b-col>
        </b-row>
        <b-row class="center_custome text_center">
          <b-col cols="12">
            <img
              style="height: 150px;"
              v-if="all_task_waiting[task_index].imgHtml != ''"
             :src="all_task_waiting[task_index].imgHtml"
            />
            <h2 v-else>אין תמונה לתצוגה</h2>
          </b-col>
        </b-row>
      </b-modal>
    </div>
    </div>
</template>

<script>
export default {
  name: "UserTasks",
  props: ['userId', 'all_task_waiting'],

  data() {
    return {
    
      task_index: -1,
      task_id: -1,
    };
  },
  // async fetch() {
  //   console.log(
  //     this.$axios.defaults.baseURL + "users/usertasks/userId/" + this.$route.params.id + "/status/user_task_waitForApprovement"
  //   );
  //   this.all_task_waiting = await this.$axios.$get(
  //     this.$axios.defaults.baseURL + "users/usertasks/userId/" + this.$route.params.id + "/status/user_task_waitForApprovement"
  //   );
    
  // },
  methods: {


     approveTask() {
      this.$parent.approveTask(this.task_id, this.task_index);
      this.$bvModal.hide("modal-center");
      this.task_id = -1;
      this.task_index = -1;


      
      
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

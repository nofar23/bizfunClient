<template>
  <b-container class="bv-example-row">
    <b-row class="pb-4 justify-content-md-center">
      <b-col cols="6" class="text_center"
        ><b-button
          v-bind:class="[is_active == 0 ? 'btn_press' : 'btn_non_press']"
          size="lg"
          v-on:click="is_active = 0"
          >כל המשימות</b-button
        ></b-col
      >
      <b-col cols="6" class="text_center"
        ><b-button
          v-bind:class="[is_active == 1 ? 'btn_press' : 'btn_non_press']"
          size="lg"
          v-on:click="is_active = 1"
          >המשימות שלי</b-button
        ></b-col
      >
    </b-row>

    <b-row v-if="is_active == 1" class="justify-content-md-center">
      <MyTask :myTasks="my_tasks" />
    </b-row>
    <b-row v-if="is_active == 0" class="justify-content-md-center">
      <AllTask :tasks="all_tasks" />
    </b-row>
  </b-container>
</template>

<script>
import MyTask from "~/components/user/MyTask.vue";
import AllTask from "~/components/user/AllTask.vue";

export default {
  components: {
    MyTask,
    AllTask
  },
  props: ["all_tasks", "my_tasks"],
  data() {
    return {
      is_active: 0
    };
  },
  methods: {
    cancelTask(task_id) {
      this.$parent.cancelTask(task_id);
    },

    addTask(task_id) {
      this.$parent.addTask(task_id);
    }
    // cancelTask(task_id){
    //   let task_to_remove = this.my_tasks.filter(obj => {
    //         let obj_add = {};
    //         if(obj.id === task_id){
    //           obj_add.id = task_id;
    //           obj_add.name = obj.name;
    //           return obj_add;
    //         }

    //   })
    //     this.my_tasks = this.my_tasks.filter(function( obj ) {
    //       return obj.id != task_id;
    //   });

    //   this.all_tasks.forEach(function(obj) {
    //     if (obj.id === task_id) {
    //         obj.select = 0;

    //     }
    // });

    //   // this.all_tasks.push({id: task_to_remove[0].id, name: task_to_remove[0].name, amount: task_to_remove[0].amount});
    // },
    // addTask(task_id){

    //     let task_to_add = this.all_tasks.filter(obj => {
    //         let obj_add = {};
    //         if(obj.id === task_id){
    //           obj_add.id = task_id;
    //           obj_add.name = obj.name;
    //           return obj_add;
    //         }

    //   })

    //   this.all_tasks.forEach(function(obj) {
    //     if (obj.id === task_id) {
    //         obj.select = 1;

    //     }
    // });
    //   //   this.all_tasks = this.all_tasks.filter(function( obj ) {
    //   //     return obj.id != task_id;
    //   // });

    //   this.my_tasks.push({id: task_to_add[0].id, name: task_to_add[0].name, amount: task_to_add[0].amount});

    // }
  }
};
</script>

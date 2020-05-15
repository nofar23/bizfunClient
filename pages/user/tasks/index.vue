<template>
  <b-container class="bv-example-row">
    <b-row class="pb-4 justify-content-md-center">
      <b-col cols="6" class="text_center" style="padding-left:5px;"
        ><b-button
          v-bind:class="[is_active == 0 ? 'btn_press' : 'btn_non_press']"
          class="full_width"
          size="lg"
          v-on:click="is_active = 0"
          >כל המשימות</b-button
        ></b-col
      >
      <b-col cols="6" class="text_center" style="padding-right:5px;"
        ><b-button
          v-bind:class="[is_active == 1 ? 'btn_press' : 'btn_non_press']"
          size="lg"
          class="full_width"
          v-on:click="is_active = 1"
          >המשימות שלי</b-button
        ></b-col
      >
    </b-row>

    <AllTask :user="user" v-if="is_active == 0" :tasks="all_tasks" />

    <MyTask
      v-if="is_active == 1"
      :my_tasks="my_tasks"
      :my_tasks_w="my_tasks_w"
    />
  </b-container>
</template>

<script>
import MyTask from "~/components/user/MyTask.vue";
import AllTask from "~/components/user/AllTask.vue";

export default {
  layout: "user",

  components: {
    MyTask,
    AllTask
  },

  data() {
    return {
      is_active: 0,
      bank_sum: 30,
      is_enough_money: -1,
      all_tasks: {},
      my_tasks: {},
      my_tasks_w: {},
      houseId: -1,
      userId: -1
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
    this.all_tasks = await this.$axios.$get(
      this.$axios.defaults.baseURL +
        "houses/tasksWithColors/houseId/" +
        this.houseId
    );
    // console.log(this.all_tasks);

    this.my_tasks = await this.$axios.$get(
      this.$axios.defaults.baseURL +
        "users/userTasks/userId/" +
        this.userId +
        "/status/task_inProgress"
    );

    // console.log(this.my_tasks);

    this.my_tasks_w = await this.$axios.$get(
      this.$axios.defaults.baseURL +
        "users/usertasks/userId/" +
        this.userId +
        "/status/user_task_waitForApprovement"
    );
  },
  fetchOnServer: false,
  methods: {
    async doneTask(task_id, task_index, img) {
      let that = this;
      if (img == null) {
        let data = {
          userId: this.userId,
          taskId: task_id,
          status: "user task waitForApprovement",
          imgKey: img
        };
        let updateTaskWaiting = await this.$axios
          .post(that.$axios.defaults.baseURL + "users/updateTaskWaiting", data)
          .then(() => {
            that.my_tasks_w.push(that.my_tasks[task_index]);
            // console.log(that.my_tasks_w);
            that.my_tasks.splice(task_index, 1);
          });
      } else {
        const formData = new FormData();
        formData.append("file", img);

        let uploadeImg = await this.$axios
          .post(this.$axios.defaults.baseURL + "users/taskImgUpload", formData)
          .then(async imgKey => {
            // console.log(imgKey.data.imageKey);
            let data = {
              userId: this.userId,
              taskId: task_id,
              status: "user task waitForApprovement",
              imgKey: imgKey.data.imageKey
            };
            let updateTaskWaiting = await this.$axios
              .post(
                that.$axios.defaults.baseURL + "users/updateTaskWaiting",
                data
              )
              .then(() => {
                that.my_tasks_w.push(that.my_tasks[task_index]);
                // console.log(that.my_tasks_w);
                that.my_tasks.splice(task_index, 1);
              });

            // that.my_tasks_w.forEach(function(obj) {
            //   if (obj.taskId === task_id) {
            //     obj.userTaskStatus = "user task waitForApprovement";
            //     that.my_tasks.push(obj);
            //     that.my_tasks_w.splice(index, 1);
            //   }
            // });
          });
      }
    },
    async cancelTask(task_id) {
      let data = {
        userId: this.userId,
        taskId: task_id
      };
      console.log("cancel");
      console.log(data);
      let that = this;
      let cancelTask = await this.$axios
        .post(this.$axios.defaults.baseURL + "users/cancelUserTask", data)
        .then(isCancelTask => {
          console.log(that.my_tasks);
          let task_to_remove = that.my_tasks.filter(obj => {
            let obj_add = {};
            if (obj.taskId === task_id) {
              obj_add.taskId = task_id;
              obj_add.name = obj.name;
              return obj_add;
            }
          });

          // this.my_tasks.splice(x, task_index);
          that.my_tasks = that.my_tasks.filter(function(obj) {
            return obj.taskId != task_id;
          });

          that.all_tasks.forEach(function(obj) {
            if (obj.taskId === task_id) {
              obj.userId = -1;
            }
          });
          console.log(this.all_tasks);
        });

      // this.all_tasks.push({id: task_to_remove[0].id, name: task_to_remove[0].name, amount: task_to_remove[0].amount});
    },
    async addTask(task_id) {
      let data = {
        userId: this.userId,
        taskId: task_id,
        status: "task inProgress"
      };
      // console.log(data);
      let that = this;
      let addTaskUser = await this.$axios
        .post(this.$axios.defaults.baseURL + "users/addTask", data)
        .then(isAddTask => {
          console.log(isAddTask);
          let task_to_add = that.all_tasks.filter(obj => {
            let obj_add = {};
            if (obj.taskId === task_id) {
              obj_add.taskId = task_id;
              obj_add.name = obj.name;
              return obj_add;
            }
          });

          that.all_tasks.forEach(function(obj) {
            if (obj.taskId === task_id) {
              obj.userId = that.userId;
              obj.fullname = that.user.fullname;
              obj.color = that.user.color;
            }
          });
          //   this.all_tasks = this.all_tasks.filter(function( obj ) {
          //     return obj.id != task_id;
          // });

          that.my_tasks.push({
            taskId: task_to_add[0].taskId,
            name: task_to_add[0].name,
            givenPoints: task_to_add[0].givenPoints,
            userTaskStatus: "task inProgress"
          });
        });
    }
  }
};
</script>

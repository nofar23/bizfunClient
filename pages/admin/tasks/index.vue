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
          מטלות</b-button
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

    <AllTask v-if="is_active == 0" :tasks_prop="all_tasks" />
    <TasksWaiting v-if="is_active == 1" :tasksWaiting="tasks_waiting" />
  </b-container>
</template>

<script>
import TasksWaiting from "~/components/admin/TasksWaiting.vue";
import AllTask from "~/components/admin/AllTasks.vue";

export default {
  layout: "admin",
  components: {
    AllTask,
    TasksWaiting
  },

  data() {
    return {
      is_active: 0,
      all_tasks: {},
      tasks_waiting: {},
      houseId: -1
    };
  },
  computed: {
    user() {
      return this.$store.state.loadUser;
    }
  },
  async fetch() {
    console.log(this.user);
    this.houseId = this.user.houseId;
    this.all_tasks = await this.$axios.$get(
      this.$axios.defaults.baseURL + "houses/tasks/houseId/" + this.houseId
    );
    // console.log(this.all_tasks);

    let tasksWaitingReq = await this.$axios
      .$get(
        this.$axios.defaults.baseURL +
          "houses/tasksWaiting/houseId/" +
          this.houseId
      )
      .then(async tasks_waiting_res => {
        this.tasks_waiting = tasks_waiting_res;
        console.log(tasks_waiting_res);
        for (let i = 0; i < tasks_waiting_res.length; i++) {
          let imgHtmlQuery = await this.$axios
            .$post(this.$axios.defaults.baseURL + "houses/taskWaitingImg", {
              taskImg: tasks_waiting_res[i].img
            })
            .then(imgUrl => {
              console.log("ssss");
              console.log(imgUrl);
              console.log("ddddd");
              this.tasks_waiting[i]["imgHtml"] = imgUrl;
              console.log(this.tasks_waiting);
            });
        }
      });
    console.log(this.tasks_waiting);
  },
  fetchOnServer: false,
  methods: {
    async approveTask(task_id, user_id) {
      let data = {
        taskId: task_id,
        userId: user_id,
        newStatus: "user_task_completed"
      };

      let approveTaskResult = await this.$axios.put(
        this.$axios.defaults.baseURL + "users/approveUserTask",
        data
      );

      if (approveTaskResult.status == 200) {
        for (let i = 0; i < this.tasks_waiting.length; i++) {
          if (this.tasks_waiting[i].taskId == task_id) {
            this.tasks_waiting.splice(i, 1);
          }
        }
      }
    },
    async hideTask(task_id, index, status, isOnBoard) {
      let data = {
        houseId: this.houseId,
        taskId: task_id,
        status
      };

      let that = this;
      let updateTaskStatus = await this.$axios
        .put(this.$axios.defaults.baseURL + "houses/updateTaskStatus", data)
        .then(() => {
          that.all_tasks[index].status = status;
          that.all_tasks[index].isOnBoard = isOnBoard;
        })
        .catch(error => {
          console.log(status);
          console.log(index);
          that.all_tasks[index].status = status;
          that.all_tasks[index].isOnBoard = isOnBoard;

          let currStatus = that.all_tasks[index].status;
          if (currStatus == "task onBoard") {
            that.all_tasks[index].status = "task offBoard";
            that.all_tasks[index].isOnBoard = false;
          } else {
            that.all_tasks[index].status = "task onBoard";
            that.all_tasks[index].isOnBoard = true;
          }

          console.log(that.all_tasks[index].status);
          console.log(error.response);
        });
    },

    async removeTask(task_id) {
      let data = {
        houseId: this.houseId,
        taskId: task_id
      };
      let removeTaskResult = await this.$axios.post(
        this.$axios.defaults.baseURL + "houses/deleteTask",
        data
      );
      if (removeTaskResult.status == 200) {
        for (let i = 0; i < this.all_tasks.length; i++) {
          if (this.all_tasks[i].taskId == task_id) {
            this.all_tasks.splice(i, 1);
          }
        }
      }
    },
    async addTask(task_id, task_name, task_amount) {
      let data = {
        name: task_name,
        givenPoints: task_amount,
        houseId: this.houseId,
        taskId: task_id
      };
      if (task_id == -1) {
        //create
        let createTaskResult = await this.$axios.post(
          this.$axios.defaults.baseURL + "houses/createTask",
          data
        );
        if (createTaskResult.status == 200) {
          let newTaskId = createTaskResult.data.result.taskId;
          let task = {
            taskId: newTaskId,
            name: task_name,
            givenPoints: task_amount,
            isOnBoard: true
          };
          this.all_tasks.push(task);
        }
      } else {
        //update

        let result = await this.$axios.put(
          this.$axios.defaults.baseURL + "houses/updateTask",
          data
        );
        if (result.status == 200) {
          this.all_tasks.forEach(function(obj) {
            if (obj.taskId === task_id) {
              obj.name = task_name;
              obj.givenPoints = task_amount;
            }
          });
        }
      }
    }
  }
};
</script>

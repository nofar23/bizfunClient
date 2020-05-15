<template>
  <div>
    <div>
      <b-row>
        <b-col v-if="tasks.length != 0" v-for="(task, index) in tasks" cols="6">
          <b-card
            :class="
              'card_custom mb-3 text-center ' +
                (task.userId != -1
                  ? `${task.color}`
                  : 'card_non_selected pointer')
            "
            :disabled="task.userId == -1 ? false : true"
            v-on:click="task.userId == -1 && setPopUp(task, index)"
            title="Card Title"
            no-body
          >
            <template v-if="task.userId != -1" v-slot:header>
              <span class="mb-0">{{ task.fullname.split(" ")[0] }}</span>
            </template>

            <b-card-text
              style="text-align:center;"
              :class="
                task.userId != -1 ? 'padding_with_h_card' : 'padding_non_h_card'
              "
            >
              <b-col cols="12" class="task_name">{{ task.name }}</b-col>
              <b-col cols="12" class="task_amount"
                >{{ task.givenPoints }}
                <b-icon v-if="task.userId == -1" icon="plus"></b-icon
              ></b-col>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row
        v-if="tasks.length == 0"
        class="justify-content-md-center  pb-1"
        style="text-align:center;"
      >
        <b-col cols="12">
          <h6>אין משימות</h6>
        </b-col>
      </b-row>
    </div>
    <div>
      <b-modal
        id="modal-prevent-closing"
        v-model="show"
        ref="modal"
        v-if="task_index != -1 && tasks[task_index].select != 1"
        :ok-title="titleModel"
        cancel-title="ביטול"
        @ok="addTask"
        @hidden="resetModal"
        title="BootstrapVue"
      >
        <b-row v-if="tasksProgressIsOk == 0">
          <b-col cols="12">לא ניתן לקחת יותר מ-3 משימות</b-col>
        </b-row>
        <b-row v-if="tasksProgressIsOk == 1" class="text_center">
          <b-col cols="6">
            {{ tasks[task_index].name }}
          </b-col>
          <b-col cols="6">
            {{ tasks[task_index].givenPoints }}
          </b-col>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllTask",
  props: ["tasks", "user"],

  data() {
    return {
      task_index: -1,
      task_id: -1,
      show: false,
      tasksProgressIsOk: 1,
      titleModel: "לקחת"
    };
  },
  methods: {
    async setPopUp(task, index) {
      //check if have less then 3 tasks in progress
      let countTaskInProgressReq = await this.$axios
        .$post(this.$axios.defaults.baseURL + "users/countTask", {
          userId: this.user.userId
        })
        .then(countTaskInProgress => {
          console.log(countTaskInProgress);
          if (countTaskInProgress.result >= 3) {
            this.titleModel = "אישור";
            this.tasksProgressIsOk = 0;
          } else {
            this.titleModel = "לקחת";
            this.tasksProgressIsOk = 1;
          }
          this.show = true;
          this.task_index = index;
          this.task_id = task.taskId;
        });
      // this.show = true;
      // this.task_index = index;
      // this.task_id = task.taskId;
    },
    resetModal() {
      this.task_id = -1;
      this.task_index = -1;
    },
    addTask() {
      if (this.tasksProgressIsOk == 1) {
        if (this.tasks[this.task_index].select != 1) {
          this.$parent.addTask(this.tasks[this.task_index].taskId);
        }
      }
    }
  }
};
</script>

<style>
.modal-footer {
  display: block;
}

.modal-content {
  background: #fff;
}
</style>

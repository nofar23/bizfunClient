<template>
  <div>
    <div>
      <b-row>
        <b-col
          v-if="tasksWaiting.length != 0"
          v-for="(task_Waiting, index) in tasksWaiting"
          cols="6"
        >
          <b-card
            v-on:click="
              task_index = index;
              task_id = task_Waiting.taskId;
            "
            v-b-modal.modal-center
            class="card_custom card_waiting mb-3 text-center"
            title="Card Title"
            no-body
          >
            <template v-slot:header>
              <span class="mb-0">{{
                task_Waiting.userFullname.split(" ")[0]
              }}</span>
            </template>

            <b-card-text style="text-align:center;padding-top:5%">
              <b-col cols="12" class="task_name">{{ task_Waiting.name }}</b-col>
              <b-col cols="12" class="task_amount"
                >{{ task_Waiting.givenPoints }} <b-icon icon="plus"></b-icon
              ></b-col>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row
        v-if="tasksWaiting.length == 0"
        class="justify-content-md-center  pb-1"
        style="text-align:center;"
      >
        <h6>אין משימות שממתינות לאישור</h6>
      </b-row>
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
          <b-col cols="6">
            {{ tasksWaiting[task_index].userFullname.split(" ")[0] }}
          </b-col>
          <b-col cols="6">
            {{ tasksWaiting[task_index].name }}
          </b-col>
        </b-row>
        <b-row class="center_custome text_center">
          <b-col cols="12">
            <img
              style="height: 150px;"
              v-if="tasksWaiting[task_index].imgHtml != ''"
              v-bind:src="tasksWaiting[task_index].imgHtml"
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
  name: "TasksWaiting",
  props: ["tasksWaiting"],

  data() {
    return {
      task_index: -1,
      task_id: -1,
      is_cancel: 0
    };
  },
  methods: {
    approveTask() {
      this.$parent.approveTask(
        this.task_id,
        this.tasksWaiting[this.task_index].userId
      );
      this.task_index = -1;
      this.task_id = -1;
      this.$bvModal.hide("modal-center");
    }
  }
};
</script>

<style>
.done_btn_modal {
  background: #86c6ce;
  color: #fff;
}
.cancel_btn_modal {
  background: #ff6937;
  color: #fff;
}
</style>

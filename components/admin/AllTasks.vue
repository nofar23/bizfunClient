<template>
  <div>
    <div>
      <b-row class="pb-4 justify-content-md-center">
        <b-col cols="12" class="text_center"
          ><b-button
            v-b-modal.modal-prevent-closing
            v-on:click="
              is_new_task = 1;
              show = true;
            "
            class="new_task_btn"
            size="lg"
          >
            משימה חדשה</b-button
          ></b-col
        >
      </b-row>

      <b-row v-if="tasks.length != 0" class="text-center">
        <b-col cols="6">
          שם המשימה
        </b-col>
        <b-col cols="4">נקודות</b-col>
      </b-row>
      <div v-if="tasks.length != 0">
        <b-row
          v-for="(task, index) in tasks"
          style="background-color: #E4E4E4;"
          class="mb-2"
          v-bind:key="task.id"
        >
          <b-col
            cols="6"
            v-b-modal.modal-prevent-closing
            v-on:click="edit_task(task, index)"
            style="padding-left:0px;"
          >
            <b-card title="Card Title" class="task_card_layout" no-body>
              <b-card-body style="text-align:center;">
                <b-col cols="12" class="task_name">{{ task.name }}</b-col>
              </b-card-body>
            </b-card>
          </b-col>

          <b-col
            v-b-modal.modal-prevent-closing
            v-on:click="edit_task(task, index)"
            cols="4"
            style="padding-left:0px;"
          >
            <b-card title="Card Title" class="task_card_layout" no-body>
              <b-card-body style="text-align:center;">
                <b-col cols="12" class="task_amount"
                  >{{ task.givenPoints }}
                </b-col>
              </b-card-body>
            </b-card>
          </b-col>
          <b-col cols="2" style="padding-right:10px;">
            <b-form-checkbox
              class="pt-3"
              v-model="task.isOnBoard"
              name="check-button"
              switch
              v-on:change="hideTask(task, index)"
            >
            </b-form-checkbox>
          </b-col>
        </b-row>
      </div>

      <b-row v-if="tasks.length == 0" class=" pb-1" style="text-align:center;">
        <b-col cols="12">
          <h6>אין משימות</h6>
        </b-col>
      </b-row>
    </div>

    <b-modal
      id="modal-yes-no"
      ref="modal"
      title=""
      ok-title="אישור"
      cancel-title="ביטול"
      @ok="removeTask"
    >
      <h5>האם אתה בטוח רוצה למחוק את המשימה?</h5>

      <b-row
        v-if="task_index != -1"
        style="background-color: #E4E4E4;"
        class="mb-2"
      >
        <b-col cols="6" style="padding-left:0px;">
          <b-card title="Card Title" class="task_card_layout" no-body>
            <b-card-body style="text-align:center;">
              <b-col cols="12" class="task_name">{{
                tasks[task_index].name
              }}</b-col>
            </b-card-body>
          </b-card>
        </b-col>

        <b-col cols="6">
          <b-card title="Card Title" class="task_card_layout" no-body>
            <b-card-body style="text-align:center;">
              <b-col cols="12" class="task_amount"
                >{{ tasks[task_index].givenPoints }}
              </b-col>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title=""
      ok-title="אישור"
      ok-class="btn-primary_custome"
      v-model="show"
      @show="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="שם משימה"
          label-for="name-input"
          invalid-feedback="הכנס שם משימה"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            ref="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="amountState"
          label="מספר נקודות"
          label-for="amount-input"
          invalid-feedback="הכנס מספר נקודות"
        >
          <b-form-input
            id="amount-input"
            v-model="amount"
            ref="amount"
            type="number"
            :state="amountState"
            required
          ></b-form-input>
        </b-form-group>
      </form>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button size="sm" class="float-right ml-2" @click="show = false">
            ביטול
          </b-button>
          <b-button
            v-if="is_new_task == 0"
            variant="primary"
            size="sm"
            class="float-right ml-2"
            v-b-modal.modal-yes-no
            @click="show = false"
          >
            מחק
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="handleOk()"
          >
            אישור
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AllTask",
  props: ["tasks_prop"],

  data() {
    return {
      show: false,
      name: "",
      amount: "",
      nameState: null,
      amountState: null,
      taskId: -1,
      task_index: -1,
      is_new_task: 0,
      tasks: {}
    };
  },
  watch: {
    tasks_prop: {
      handler: function(val, oldVal) {
        console.log(oldVal, val);
        this.tasks = val;
      },
      deep: true
    }
  },
  methods: {
    edit_task(task, index) {
      this.is_new_task = 0;
      this.task_index = index;
      this.taskId = task.taskId;
      this.name = task.name;
      this.amount = task.givenPoints;
    },
    removeTask() {
      this.$parent.removeTask(this.taskId);
      this.taskId = -1;
      this.task_index = -1;
    },
    hideTask(task, index) {
      let status = task.status;
      let isOnBoard = false;

      let updateStatus = "task onBoard";
      if (status == "task onBoard") {
        updateStatus = "task offBoard";
      } else {
        updateStatus = "task onBoard";

        isOnBoard = true;
      }

      this.$parent.hideTask(task.taskId, index, updateStatus, isOnBoard);
      // this.taskId = -1;
      // this.task_index = -1;
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      const validName = this.$refs.name.checkValidity();
      this.nameState = validName;
      const validAmount = this.$refs.amount.checkValidity();
      this.amountState = validAmount;
      return valid;
    },
    resetModal() {
      if (this.is_new_task == 1) {
        this.benefitId = -1;
        this.name = "";
        this.amount = "";
      }

      this.nameState = null;
      this.amountState = null;
    },
    handleOk(bvModalEvt) {
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names

      this.$parent.addTask(this.taskId, this.name, this.amount);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
};
</script>

<style>
.new_task_btn {
  background-color: #f57c54;
  color: #fff;
  width: 100%;
  border: 1px solid #f57c54;
}
.card-body {
  padding: 0.9rem;
}

.task_name {
  font-size: 0.8rem;
}

.task_amount {
  font-size: 0.8rem;
}

.task_card_layout {
  margin-bottom: 5px;
  margin-top: 5px;
  border-radius: 7px;
}
</style>

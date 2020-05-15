<template>
  <div>
    <div>
      <b-row class="pb-4 justify-content-md-center">
        <b-col cols="12" class="text_center"
          ><b-button
            v-b-modal.modal-prevent-closing
            v-on:click="is_new_benefit = 1"
            show="true;"
            class="new_task_btn"
            size="lg"
          >
            הטבה חדשה</b-button
          ></b-col
        >
      </b-row>

      <b-row v-if="benefits.length != 0" class="text-center">
        <b-col cols="6">
          שם הטבה
        </b-col>
        <b-col cols="6">
          מספר הנקודות
        </b-col>
      </b-row>

      <b-row
        v-if="benefits.length != 0"
        v-for="(benefit, index) in benefits"
        style="background-color: #E4E4E4;"
        class="mb-2"
      >
        <b-col
          cols="6"
          v-b-modal.modal-prevent-closing
          v-on:click="edit_benefit(benefit, index)"
          style="padding-left:0px;"
        >
          <b-card title="Card Title" class="task_card_layout" no-body>
            <b-card-body style="text-align:center;">
              <b-col cols="12" class="task_name">{{ benefit.name }}</b-col>
            </b-card-body>
          </b-card>
        </b-col>

        <b-col
          v-b-modal.modal-prevent-closing
          v-on:click="edit_benefit(benefit, index)"
          style="padding-left:0px;"
        >
          <b-card title="Card Title" class="task_card_layout" no-body>
            <b-card-body style="text-align:center;">
              <b-col cols="12" class="task_amount">{{ benefit.price }} </b-col>
            </b-card-body>
          </b-card>
        </b-col>

        <b-col cols="2" style="padding-right:10px;">
          <b-form-checkbox
            class="pt-3"
            v-model="benefit.isOnBoard"
            name="check-button"
            switch
            v-on:change="hideBenefit(benefit, index)"
          >
          </b-form-checkbox>
        </b-col>
      </b-row>

      <b-row
        v-if="benefits.length == 0"
        class="justify-content-md-center  pb-1"
        style="text-align:center;"
      >
        <b-col cols="12">
          <h6>אין הטבות</h6>
        </b-col>
      </b-row>
    </div>

    <b-modal
      id="modal-yes-no"
      ref="modal"
      title=""
      ok-title="אישור"
      cancel-title="ביטול"
      @ok="removeBenefit"
    >
      <h4>האם אתה בטוח רוצה למחוק את ההטבה?</h4>
      <b-row
        v-if="benefit_index != -1"
        style="background-color: #E4E4E4;"
        class="mb-2"
      >
        <b-col cols="6" style="padding-left:0px;">
          <b-card title="Card Title" class="task_card_layout" no-body>
            <b-card-body style="text-align:center;">
              <b-col cols="12" class="task_name">{{
                benefits[benefit_index].name
              }}</b-col>
            </b-card-body>
          </b-card>
        </b-col>

        <b-col cols="6">
          <b-card title="Card Title" class="task_card_layout" no-body>
            <b-card-body style="text-align:center;">
              <b-col cols="12" class="task_amount"
                >{{ benefits[benefit_index].price }}
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
      cancel-title="ביטול"
      v-model="show"
      @show="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="שם הטבה"
          label-for="name-input"
          invalid-feedback="הכנס שם הטבה"
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
            v-if="is_new_benefit == 0"
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
  name: "AllBenefits",
  props: ["benefits"],

  data() {
    return {
      name: "",
      amount: "",
      nameState: null,
      amountState: null,
      benefitId: -1,
      benefit_index: -1,
      is_new_benefit: 0,
      show: false
    };
  },
  methods: {
    edit_benefit(benefit, index) {
      this.is_new_benefit = 0;
      this.benefitId = benefit.rewardId;
      this.benefit_index = index;
      this.name = benefit.name;
      this.amount = benefit.price;
    },
    removeBenefit() {
      this.$parent.removeBenefit(this.benefitId);
      this.benefitId = -1;
      this.benefit_index = -1;
    },
    hideBenefit(benefit, index) {
      let status = benefit.status;
      let isOnBoard = false;
      console.log();
      let updateStatus = "reward onBoard";
      if (status == "reward onBoard") {
        updateStatus = "reward offBoard";
      } else {
        updateStatus = "reward onBoard";
        isOnBoard = true;
      }

      this.$parent.hideBenefit(
        benefit.rewardId,
        index,
        updateStatus,
        isOnBoard
      );
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
      if (this.is_new_benefit == 1) {
        this.benefitId = -1;
        this.name = "";
        this.amount = "";
      }

      this.nameState = null;
      this.amountState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      // bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names

      this.$parent.addBenefit(this.benefitId, this.name, this.amount);
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

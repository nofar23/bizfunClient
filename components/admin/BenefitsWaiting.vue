<template>
  <div>
    <div>
      <b-row>
        <b-col
          v-if="benefitsWaiting.length != 0"
          v-for="(benefit_Waiting, index) in benefitsWaiting"
          cols="6"
        >
          <b-card
            v-on:click="
              benefit_index = index;
              benefit_id = benefit_Waiting.rewardId;
            "
            v-b-modal.modal-center
            class="card_custom card_waiting mb-3 text-center"
            title="Card Title"
            no-body
          >
            <template v-slot:header>
              <span class="mb-0">{{
                benefit_Waiting.userFullname.split(" ")[0]
              }}</span>
            </template>

            <b-card-text style="text-align:center;padding-top:5%">
              <b-col cols="12" class="task_name">{{
                benefit_Waiting.name
              }}</b-col>
              <b-col cols="12" class="task_amount"
                >{{ benefit_Waiting.price }}
              </b-col>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row
        v-if="benefitsWaiting.length == 0"
        class="justify-content-md-center  pb-1"
        style="text-align:center;"
      >
        <h6>אין הטבות שממתינות לאישור</h6>
      </b-row>
    </div>

    <div>
      <b-modal
        centered
        v-if="benefit_index != -1"
        ok-title="אישור"
        cancel-title="ביטול"
        id="modal-center"
        title="BootstrapVue"
        @ok="approveReward"
      >
        <b-row class="text-center">
          <b-col cols="6">
            {{ benefitsWaiting[benefit_index].userFullname.split(" ")[0] }}
          </b-col>
          <b-col cols="6">
            {{ benefitsWaiting[benefit_index].name }}
          </b-col>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "BenefitsWaiting",
  props: ["benefitsWaiting"],

  data() {
    return {
      benefit_index: -1,
      benefit_id: -1,
      is_cancel: 0
    };
  },
  methods: {
    approveReward() {
      this.$parent.approveReward(
        this.benefit_id,
        this.benefitsWaiting[this.benefit_index].userId
      );
      this.benefit_index = -1;
      this.benefit_id = -1;
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
.modal-header {
  display: none;
}

.modal-footer {
  display: block;
}
</style>

<template>
  <div>
    <b-row>
      <b-col
        v-if="benefits.length != 0"
        v-for="(benefit, index) in benefits"
        cols="6"
      >
        <b-card
          class="card_custom mb-3 card_non_selected"
          v-b-modal.modal-prevent-closing
          v-on:click="setPopUp(benefit, index)"
          title="Card Title"
          no-body
        >
          <b-card-body style="text-align:center;padding-top:30%">
            <b-col cols="12" class="task_name">{{ benefit.name }}</b-col>
            <b-col cols="12" class="task_amount"
              >{{ benefit.price }} <b-icon icon="check"></b-icon
            ></b-col>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row
      v-if="benefits.length == 0"
      class="justify-content-md-center  pb-1"
      style="text-align:center;"
    >
      <h6>אין הטבות</h6>
    </b-row>

    <div>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        v-if="benefit_index != -1"
        ok-title="לקחת"
        cancel-title="ביטול"
        @ok="addBenefit"
        @hidden="resetModal"
        title="BootstrapVue"
      >
        <b-row class="text_center">
          <b-col cols="6">
            {{ benefits[benefit_index].name }}
          </b-col>
          <b-col cols="6">
            {{ benefits[benefit_index].price }}
          </b-col>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllBenefit",
  props: ["benefits"],

  data() {
    return {
      benefit_index: -1,
      benefit_id: -1
    };
  },
  methods: {
    setPopUp(benefit, index) {
      this.benefit_index = index;
      this.benefit_id = benefit.rewardId;
    },
    resetModal() {
      this.benefit_id = -1;
      this.benefit_index = -1;
    },
    addBenefit() {
      this.$parent.addBenefit(this.benefit_id, this.benefit_index);
    }
  }
};
</script>

<style></style>

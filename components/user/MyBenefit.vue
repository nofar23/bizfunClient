<template>
<div>
<div>
    <b-card class=" mb-3 card_background" title="Card Title" no-body>
      <b-card-body style="text-align:center;">
        <b-row>
          <b-col v-if="benefitsW.length != 0" cols="12" class="benefit_name pb-2">הטבות ממתינות לאישור</b-col></b-col
          >
          <b-col v-else cols="12" class="benefit_name pb-2">אין הטבות ממתינות לאישור</b-col></b-col
          >
        </b-row>
        <b-row>
          <b-col v-for="(benefitW,index) in benefitsW" cols="6" 
            >
                <b-card class="card_custom_task card_waiting mb-3"    title="Card Title" no-body>
                    <b-card-body   class="card_body">
                        <b-col cols="12" class="task_name">{{benefitW.name}}</b-col>
                        <b-col cols="12" class="task_amount">{{benefitW.price}}  </b-col>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
 <div>
    <b-card class=" mb-3 card_background" title="Card Title" no-body>
      <b-card-body style="text-align:center;">
        <b-row>
          <b-col v-if="myBenefits.length != 0" cols="12" class="benefit_name pb-2">הטבות שנוצלו</b-col></b-col
          >
          <b-col v-else cols="12" class="benefit_name pb-2">לא נוצלו הטבות</b-col></b-col
          >
        </b-row>
        <b-row>
          <b-col v-for="benefit in myBenefits" cols="12" >
                <b-card class="mb-3 card_benefit"    title="Card Title" no-body>
                    <b-card-body   class="card_body">
                        <b-col cols="12" class="benefit_name">{{benefit.name}} <b-icon font-scale="1"  icon="check"></b-icon></b-col>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
 
  </div>
</template>

<script>
export default {
  name: "MyBenefit",
  props: ["myBenefits", "benefitsW"],

  data() {
    return {};
  },
  methods: {}
};
</script>

<style></style>

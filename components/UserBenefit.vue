<template>
    <b-container class="bv-example-row"> 
        <b-row class="pb-4 justify-content-md-center">
            <b-col cols="6" class="text_center"><b-button v-bind:class="[is_active == 0 ? 'btn_press' : 'btn_non_press']" :disabled="is_enough_money != -1" size="lg" v-on:click="is_active = 0">כל ההטבות</b-button></b-col>
            <b-col cols="6" class="text_center"><b-button v-bind:class="[is_active == 1 ? 'btn_press' : 'btn_non_press']" :disabled="is_enough_money != -1" size="lg" v-on:click="is_active = 1">ההטבות שלי</b-button></b-col>
        </b-row>

        <b-row v-if="is_active == 1 && is_enough_money == -1" class="justify-content-md-center">
            <MyBenefit :myBenefits="my_benefits"/>
        </b-row>
        <b-row v-if="is_active == 0 && is_enough_money == -1" class="justify-content-md-center">
            <AllBenefit :benefits="all_benefit"/>
        </b-row>

        <b-row v-if="is_enough_money == 0" class="justify-content-md-center">
            <b-col  cols="12" >
                <b-card class="card_enough_money mb-3"   title="Card Title" no-body>
                    <b-card-body   style="text-align:center;">
                        <b-col cols="12" class="task_name">אין לך מספיק נקודות כדי לממש את ההטבה הזו </br> לך לבצע מטלה <hr class="hr_custome"/></b-col>
                        <b-col cols="6" style="float: left;"><img src="~/assets/img/Rabbit1.png" class="rabbit_icon"/></b-col>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col  cols="12" >
                <img class="arrow_icon" src="~/assets/img/arrow.png"/>
            </b-col>
        </b-row>

        <b-row v-if="is_enough_money == 1" class="justify-content-md-center">
            <h1>הבקשה נשלחה</h1>
        </b-row>
        
    </b-container>
</template>


<script>
import MyBenefit from '~/components/user/MyBenefit.vue'
import AllBenefit from '~/components/user/AllBenefit.vue'


export default {
  components: {
    MyBenefit,
    AllBenefit
  },
  props: ['bank_sum', 'all_benefit', 'my_benefits', 'is_enough_money'],
  data() {
      return {
          is_active: 0,
          
          
      }
  },
  methods: {
      cancelTask(task_id){
        let benefit_to_remove = this.my_benefits.filter(obj => {
              let obj_add = {};
              if(obj.id === task_id){
                obj_add.id = task_id;
                obj_add.name = obj.name;
                return obj_add;
              }
              
              
        })
          this.my_benefits = this.my_benefits.filter(function( obj ) {
            return obj.id != task_id;
        });

        this.all_benefit.forEach(function(obj) {
          if (obj.id === task_id) {
              obj.select = 0;
             
              
          }
      });
        
        this.all_benefit.push({id: benefit_to_remove[0].id, name: benefit_to_remove[0].name, amount: benefit_to_remove[0].amount});
      },
      addBenefit(benefit_id, benefit_index){
        this.$parent.addBenefit(benefit_id, benefit_index);
          
      }
    //   addBenefit(benefit_id, benefit_index){
    //       if(this.bank_sum < this.all_benefit[benefit_index].amount){
    //           this.is_enough_money = 0;
    //       }else{
    //           this.is_enough_money = 1;
    //         let benefit_to_add = this.all_benefit.filter(obj => {
    //                     let obj_add = {};
    //                     if(obj.id === benefit_id){
    //                         obj_add.id = benefit_id;
    //                         obj_add.name = obj.name;
    //                         return obj_add;
    //                     }
                        
                        
    //                 })

    //                 this.all_benefit.forEach(function(obj) {
    //                 if (obj.id === benefit_id) {
    //                     obj.select = 1;
                        
                        
    //                 }
    //             });
    //                 this.all_benefit = this.all_benefit.filter(function( obj ) {
    //                     return obj.id != benefit_id;
    //                 });
                    
    //                 this.my_benefits.push({id: benefit_to_add[0].id, name: benefit_to_add[0].name, amount: benefit_to_add[0].amount});
                    
    //             }
    //       }
          
          
  },
}
</script>
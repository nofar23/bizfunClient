<template>
  <div>
    <div>
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="auto" class="pt-2 text_center"
          ><h5>ברוך הבא לאפליקצית</h5></b-col
        >
      </b-row>

      <b-row class="justify-content-md-center">
        <b-col cols="12" style="text-align: center;"
          ><img
            style="width:180px;height:100px;"
            src="~/assets/img/logo2.png"
        /></b-col>
      </b-row>

      <b-row  class="justify-content-md-center">
            <b-col  cols="12" >
                <b-card class="card_yellow mb-3"   title="Card Title" no-body>
                    <b-card-body   style="text-align:center;">
                        <b-col cols="12" class="task_name">עושים סדר בבית</br> בצורה מהנה</b-col>
                        <b-col cols="6" style="float: left;"><img src="~/assets/img/Rabbit_close_eye_hand_up.png" class="rabbit_icon pt-4"/></b-col>
                    </b-card-body>
                </b-card>
            </b-col>
           
        </b-row>
    </div>
  </div>
</template>

<script>
export default {
  layout: "user",
  components: {},
  data() {
    return {
      
    };
  },
  methods: {}
};
</script>

<style>
body {
  text-align: right;
  direction: rtl;
  color: #707070;
}
.card_title {
  color: #fff;
  background-color: #484f59;
}

.text_center {
  text-align: center;
}

.center_custome {
  margin: auto;
  width: 60%;
  padding: 10px;
}

.task_name {
  font-weight: 700;
  font-size: 1.2rem;
}

.benefit_name {
  font-weight: 700;
  font-size: 1.2rem;
}
.user_name_card {
  font-weight: 700;
  font-size: 1.2rem;
  color: #6a6967;
}

.task_amount {
  font-weight: 700;
  font-size: 1.2rem;
}

.card_selected {
  background-image: url("~assets/img/selected_card.png");
  text-decoration: line-through;
  background-size: cover;
  border: none;
  background-color: transparent;
}
.card_non_selected_cancel {
  background-image: url("~assets/img/non_selected.png");
  background-size: cover;
  border: none;
  background-color: transparent;
  text-decoration: line-through;
}

.card_non_selected {
  background-image: url("~assets/img/non_selected.png");
  background-size: cover;
  border: none;
  background-color: transparent;
}

.card_benefit {
  background-color: #86c6ce;
  color: #fff;
}

.card_custom {
  height: 160px;
  width: 160px;
  color: #fff;
}

.card_enough_money {
  color: #484f59;
  background-color: #ffd47e;
}

.nav_row {
  width: 100%;
  text-align: center;
  margin-right: 0;
}
.btn_press {
  background: #484f59;
  border: none;
}
.btn_non_press {
  background: #e4e4e4;
  border: none;
}

.btn-secondary.disabled,
.btn-secondary:disabled {
  background: #e4e4e4;
  border: none;
}

.btn.disabled,
.btn:disabled {
  opacity: 1;
}

.nav_press {
  color: #86c6ce !important;
}
.nav_non_press {
  color: #fff;
}

.navbar {
  background-color: #484f59;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.rabbit_icon {
  width: 140px;
}

.arrow_icon {
  position: absolute;
  top: -70px;
  width: 65px;
  right: 28%;
}

.hr_custome {
  border-top: 4px solid #484f59;
  margin-left: 15px;
  margin-right: 15px;
}
</style>

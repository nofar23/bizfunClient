<template>
  <div>
  <div>

  <div>
    <b-card class=" mb-3 card_background" title="Card Title" no-body>
      <b-card-body style="text-align:center;">
        <b-row>
          <b-col v-if="my_tasks.length != 0" cols="12" class="benefit_name pb-2">משימות בביצוע</b-col></b-col
          >
          <b-col v-else cols="12" class="benefit_name pb-2">לא נבחרו משימות</b-col></b-col
          >
        </b-row>
        <b-row>
          <b-col v-for="(task,index) in my_tasks" cols="6" >
                <b-card class="card_custom_task mb-3 card_non_selected"  title="Card Title" v-on:click="
            task_index = index;
            task_id = task.taskId;
          "
          v-b-modal.modal-center no-body>
                    <b-card-body   class="card_body">
                        <b-col cols="12" class="bold overflow_title_card">{{task.name}}</b-col>
                        <b-col cols="12" class="bold">{{task.givenPoints}}  <b-icon v-if="task.status == 2"   icon="plus"></b-icon></b-col>
                       
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>

    <b-card class=" mb-3 card_background" title="Card Title" no-body>
      <b-card-body style="text-align:center;">
        <b-row>
          <b-col v-if="my_tasks_w.length != 0" cols="12" class="benefit_name pb-2">משימות שממתינות לאישור</b-col></b-col
          >
          <b-col v-else cols="12" class="benefit_name pb-2">אין משימות שממתינות לאישור</b-col></b-col
          >
        </b-row>
        <b-row>
          <b-col v-for="(task_w,index) in my_tasks_w" cols="6" 
            >
                <b-card class="card_custom_task mb-3 card_waiting"  title="Card Title" no-body>
                    <b-card-body   class="card_body">
                        <b-col cols="12" class="bold overflow_title_card">{{task_w.name}}</b-col>
                        <b-col cols="12" class="bold">{{task_w.givenPoints}}  <b-icon v-if="task_w.status == 2"   icon="plus"></b-icon></b-col>
                       
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>



    <div>
      <b-modal
        centered
        content-class="modal_no_ontent"
        footer-class="modal_no_footer"
        v-if="task_index != -1"
        id="modal-center"
        title="BootstrapVue"
        @hidden="is_done = 0"
      >
        <b-row >
          <b-card
          style="margin:auto;"
            class="card_custom  mb-3"
            v-bind:class="
              is_cancel == 0 ? 'card_non_selected' : 'card_non_selected_cancel'
            "
            title="Card Title"
            no-body
          >
            <b-card-body style="text-align:center;padding-top:25%">
              <b-col cols="12" class="task_name">{{
                my_tasks[task_index].name
              }}</b-col>
              <b-col cols="12" class="task_amount"
                >{{ my_tasks[task_index].givenPoints }}
                <b-icon icon="plus"></b-icon
              ></b-col>
            </b-card-body>
          </b-card>
        </b-row>

        <b-row v-if="is_done == 1">
          <b-col cols="12">
          <div v-if="imageData"
            class="image-input mb-2"
            :style="{ 'background-image': `url(${imageData})` }"
            
          ></div>
          </b-col>
          <input
              class="file-input"
              ref="fileInput"
              type="file"
              @input="onSelectFile"
            >
        </b-row>

        <b-row class="justify-content-md-center nav_row" v-if="is_done == 1">
          <b-col cols="6"
            ><b-button
              class="done_btn_modal"
              variant="#484F59"
              size="lg"
              v-on:click="chooseImage"
              ><b-icon class="pl-2" icon="camera"></b-icon>צלם</b-button
            ></b-col
          >
          <b-col cols="6"
            ><b-button
              v-on:click="doneTask()"
              class="cancel_btn_modal"
              variant="#484F59"
              size="lg"
              ><b-icon class="pl-2" icon="trash-fill"></b-icon>דלג</b-button
            ></b-col
          >
        </b-row>

        <b-row v-if="imageData">
          
          <b-button
              class="done_btn_modal mt-2"
              style="margin:auto;"
              size="lg"
              v-on:click="doneTask()"
              ><b-icon class="pl-2" icon="check"></b-icon>שלח</b-button
            >
          
        </b-row>

        <b-row class="justify-content-md-center nav_row" v-if="is_cancel == 0 && is_done == 0">
          <b-col cols="6"
            ><b-button
              class="done_btn_modal"
              variant="#484F59"
              size="lg"
              v-on:click="doneBtn()"
              ><b-icon class="pl-2" icon="check"></b-icon>סיימתי</b-button
            ></b-col
          >
          <b-col cols="6"
            ><b-button
              v-on:click="cancelTask($event)"
              class="cancel_btn_modal"
              variant="#484F59"
              size="lg"
              ><b-icon class="pl-2" icon="trash-fill"></b-icon>בטל</b-button
            ></b-col
          >
        </b-row>

        <b-row
          class="justify-content-md-center nav_row text_center"
          v-if="is_cancel == 1"
        >
          <b-col
            cols="12"
            style="color: #fff;text-align: center;font-weight: 700;font-size: 1.2rem;"
            >חבל, פעם הבאה תצליח</b-col
          >
        </b-row>

        <b-row
          class="justify-content-md-center nav_row text_center"
          v-if="is_cancel == 1"
        >
          <b-col cols="12" style="padding-top: 5%;"
            ><img src="~/assets/img/Rabbit_sad.png" class="rabbit_icon"
          /></b-col>
        </b-row>

        <b-row v-if="is_cancel == 0 && is_done == 0">
          <b-col
            cols="6"
            style="color: #fff;padding-top: 20%;text-align: center;font-weight: 700;font-size: 1.2rem;"
            >מקווה שסיימת</b-col
          >
          <b-col cols="6" style="float: left;padding-top: 5%;"
            ><img src="~/assets/img/Rabbit_hand_up.png" class="rabbit_icon"
          /></b-col>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyTask",
  props: ["my_tasks" , "my_tasks_w"],

  data() {
    return {
      task_index: -1,
      task_id: -1,
      is_cancel: 0,
      is_done: 0,
      imageData: null,
      img: null
    };
  },
  methods: {
    cancelTask(event) {
      console.log("cancel");
      this.is_cancel = 1;
      let that = this;
      setTimeout(function() {
        that.$parent.cancelTask(that.task_id);
        that.is_cancel = 0;
        that.task_index = -1;
        that.task_id = -1;
      }, 1800);
    },
    doneBtn(){
      this.is_done =1;
    },
    doneTask() {
      this.$parent.doneTask(this.task_id, this.task_index, this.img);
      this.task_id = -1;
      this.task_index = -1;
      this.$bvModal.hide("modal-center");
    },
    chooseImage () {
      this.$refs.fileInput.click()
    },

    onSelectFile () {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader
        reader.onload = e => {
          this.imageData = e.target.result
          console.log(this.imageData);
        }
        reader.readAsDataURL(files[0])
        this.$emit('input', files[0])
        this.img = files[0];
      }
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

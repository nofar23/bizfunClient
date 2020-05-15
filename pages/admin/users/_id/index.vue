<template>
  <div>
    <b-container class="bv-example-row" style="padding-bottom:50px">
      <b-row>
        <b-col cols="12">
          <b-card class=" mb-3 card_benefit" title="Card Title" no-body>
            <b-card-body style="text-align:center;">
              <b-row>
                <b-col cols="12" class="benefit_name"
                  >{{ user.fullname.split(" ")[0] }}
                  {{ user.points }} נקודות</b-col
                >
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <UserTasksW :userId="userId" :all_task_waiting="all_task_waiting" />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <UserTasks :userId="userId" :user="user" />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <UserBenefitsW :userId="userId" :benefitsW="benefitsW" />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <UserBenefits :userId="userId" :benefits="benefits" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserTasks from "~/components/admin/UserTasks";
import UserTasksW from "~/components/admin/UserTasksW";
import UserBenefits from "~/components/admin/UserBenefits";
import UserBenefitsW from "~/components/admin/UserBenefitsW";

export default {
  components: {
    UserTasks,
    UserTasksW,
    UserBenefits,
    UserBenefitsW
  },
  props: [],
  layout: "admin",

  data() {
    return {
      user: {},
      userId: -1,
      houseId: 1,
      all_task_waiting: {},
      benefitsW: {},
      benefits: {}
    };
  },

  async fetch() {
    this.userId = this.$route.params.id;
    console.log(
      this.$axios.defaults.baseURL + "users/userId/" + this.$route.params.id
    );
    this.user = await this.$axios.$get(
      this.$axios.defaults.baseURL + "users/userId/" + this.$route.params.id
    );
    this.user = this.user[0];

    this.benefitsW = await this.$axios.$post(
      this.$axios.defaults.baseURL + "users/userRewards",
      {
        userId: this.userId,
        houseId: this.houseId,
        status: "user reward waitForApprovement"
      }
    );

    this.benefits = await this.$axios.$post(
      this.$axios.defaults.baseURL + "users/userRewards",
      {
        userId: this.userId,
        houseId: this.houseId,
        status: "user reward completed"
      }
    );

    let tasksWaitingReq = await this.$axios
      .$get(
        this.$axios.defaults.baseURL +
          "users/usertasks/userId/" +
          this.$route.params.id +
          "/status/user_task_waitForApprovement"
      )
      .then(async tasks_waiting_res => {
        this.all_task_waiting = tasks_waiting_res;

        for (let i = 0; i < tasks_waiting_res.length; i++) {
          let imgHtmlQuery = await this.$axios
            .$post(this.$axios.defaults.baseURL + "houses/taskWaitingImg", {
              taskImg: tasks_waiting_res[i].img
            })
            .then(imgUrl => {
              this.all_task_waiting[i]["imgHtml"] = imgUrl;
              console.log(this.all_task_waiting);
            });
        }
      });

    // this.all_task_waiting = await this.$axios.$get(
    //   this.$axios.defaults.baseURL +
    //     "users/usertasks/userId/" +
    //     this.$route.params.id +
    //     "/status/user_task_waitForApprovement"
    // );
  },

  methods: {
    async approveTask(task_id, task_index) {
      let data = {
        taskId: task_id,
        userId: this.userId,
        newStatus: "user_task_completed"
      };

      let approveTaskResult = await this.$axios.put(
        this.$axios.defaults.baseURL + "users/approveUserTask",
        data
      );

      if (approveTaskResult.status == 200) {
        this.user.points =
          this.user.points + this.all_task_waiting[task_index].givenPoints;

        this.all_task_waiting.splice(task_index, 1);
      }
    },
    async approveReward(reward_id, reward_index) {
      let data = {
        rewardId: reward_id,
        userId: this.userId,
        newStatus: "user_reward_completed"
      };

      let approveRewardResult = await this.$axios.put(
        this.$axios.defaults.baseURL + "users/approveUserReward",
        data
      );

      if (approveRewardResult.status == 200) {
        this.user.points =
          this.user.points - this.benefitsW[reward_index].price;
        this.benefits.push(this.benefitsW[reward_index]);
        this.benefitsW.splice(reward_index, 1);
      }
    }
  }
};
</script>

<style></style>

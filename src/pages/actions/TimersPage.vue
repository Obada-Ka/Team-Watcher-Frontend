<template>
  <base-dialog :show="isLoading" title="Processing..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>
  <base-dialog
    :show="error.length > 0"
    title="An error occurred"
    @close="handleError"
    ><p>
      {{ error }}
    </p>
  </base-dialog>
  <div class="title">
    <p>one App to watch you All</p>
  </div>
  <div class="row custom-row">
    <div class="col-sm-4">
      <div class="box">
        <base-clock
          :timer="startTimer"
          :currentStateTimer="stateTimer"
          :defaultClock="false"
        />
      </div>
    </div>
    <div class="col-sm-4">
      <div class="box">
        <h4 class="text-style-no-shadow">
          Your Timers for today
          <svg
            @click="getTimers()"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="35px"
            height="35px"
            viewBox="0 0 53 53"
            style="enable-background: new 0 0 53 53; cursor: pointer"
            xml:space="preserve"
          >
            <g>
              <path
                d="M37.467,46.633c-0.591,0.226-1.2,0.427-1.811,0.597c-0.531,0.147-0.843,0.699-0.694,1.231
		c0.123,0.442,0.524,0.731,0.962,0.731c0.089,0,0.18-0.012,0.27-0.037c0.669-0.186,1.338-0.406,1.986-0.653
		c0.517-0.197,0.774-0.775,0.578-1.291C38.561,46.695,37.979,46.437,37.467,46.633z"
              />
              <path
                d="M42.475,43.894c-0.508,0.376-1.04,0.734-1.583,1.064c-0.472,0.287-0.622,0.902-0.335,1.374
		c0.188,0.31,0.518,0.48,0.855,0.48c0.177,0,0.356-0.047,0.519-0.146c0.595-0.361,1.179-0.754,1.735-1.166
		c0.443-0.329,0.536-0.955,0.208-1.399C43.545,43.658,42.921,43.564,42.475,43.894z"
              />
              <path
                d="M31.906,47.914C31.278,47.971,30.637,48,30,48c-0.553,0-1,0.447-1,1s0.447,1,1,1c0.697,0,1.398-0.031,2.086-0.094
		c0.551-0.05,0.956-0.536,0.906-1.086S32.448,47.855,31.906,47.914z"
              />
              <path
                d="M50.738,34.43c-0.509-0.211-1.095,0.033-1.305,0.545c-0.241,0.587-0.512,1.169-0.805,1.729
		c-0.255,0.489-0.065,1.094,0.424,1.35c0.147,0.077,0.306,0.113,0.462,0.113c0.36,0,0.709-0.195,0.888-0.537
		c0.32-0.613,0.617-1.251,0.881-1.895C51.493,35.224,51.249,34.64,50.738,34.43z"
              />
              <path
                d="M51.969,28.572c-0.539-0.069-1.045,0.329-1.109,0.877c-0.074,0.632-0.178,1.266-0.307,1.884
		c-0.113,0.54,0.232,1.07,0.773,1.184c0.069,0.015,0.138,0.021,0.206,0.021c0.463,0,0.879-0.323,0.978-0.795
		c0.142-0.677,0.255-1.37,0.336-2.062C52.91,29.133,52.518,28.637,51.969,28.572z"
              />
              <path
                d="M46.565,39.909c-0.392,0.501-0.809,0.988-1.241,1.45c-0.378,0.402-0.357,1.035,0.046,1.413
		c0.192,0.181,0.438,0.271,0.684,0.271c0.267,0,0.532-0.106,0.729-0.316c0.474-0.504,0.931-1.038,1.358-1.587
		c0.34-0.436,0.263-1.063-0.173-1.403C47.532,39.396,46.904,39.474,46.565,39.909z"
              />
              <path
                d="M52,27c0.553,0,1-0.447,1-1C53,13.317,42.683,3,30,3C18.093,3,8.272,12.094,7.115,23.701l-5.408-5.408
		c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l6.999,6.999c0.092,0.093,0.203,0.166,0.326,0.217
		C7.74,26.974,7.87,27,8,27s0.26-0.026,0.382-0.077c0.123-0.051,0.234-0.124,0.326-0.217l6.999-6.999
		c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0l-5.116,5.116C10.46,13.05,19.3,5,30,5c11.579,0,21,9.421,21,21
		C51,26.553,51.447,27,52,27z"
              />
            </g>
          </svg>
        </h4>
        <ul class="timers-list">
          <li v-for="tim in timers" :key="tim">
            <span class="text-style-no-shadow">{{
              tim.day + " - " + tim.hour + " - " + getRealTime(tim.value)
            }}</span>
          </li>
        </ul>
        <h5 class="text-style-no-shadow">
          {{ "Your total time is " + getTotalTime }}
        </h5>
      </div>
    </div>
    <div class="col-sm-3 offset-sm-1">
      <base-button @click="checkStatus()">
        {{ statusLabel }}
      </base-button>
    </div>
  </div>

  <div class="clock">
    <base-clock :showClock="true" :defaultClock="true" />
  </div>
</template>

<script lang="ts">
import BaseClock from "@/components/UI/BaseClock.vue";
import { defineComponent, isProxy, toRaw } from "vue";
import TimerService from "../../services/timer.service";
const timerService = new TimerService();
export default defineComponent({
  components: { BaseClock },
  data() {
    return {
      checked: false,
      startTimer: false,
      error: "",
      isLoading: false,
      timers: [],
    };
  },
  computed: {
    statusLabel() {
      if (this.$store.getters["user/timerId"] && this.checked) {
        return "Check out";
      }
      return "Check in";
    },
    stateTimer() {
      return this.$store.getters["user/timer"];
    },
    getTotalTime() {
      let secondsHolder = 0;
      let rawObject: any;
      if (isProxy(this.timers)) {
        //this If() block is not really necessary
        rawObject = toRaw(this.timers);
        Object.keys(rawObject).forEach((key: any) => {
          secondsHolder += rawObject[key].value;
        });
      }

      return timerService.convertToTimer(secondsHolder);
    },
  },
  methods: {
    async checkStatus() {
      this.isLoading = true;
      try {
        this.checked = !this.checked;
        if (this.checked) {
          await this.$store.dispatch("user/setTimer");
          this.isLoading = false;
          this.startTimer = true;
          return;
        }
        await this.$store.dispatch(
          "user/stopTimer",
          this.$store.getters["user/timerId"]
        );
        this.isLoading = false;
        this.getTimers();
        this.startTimer = false;
      } catch (err: any) {
        this.isLoading = false;
        if (
          err.event === "setTimer" &&
          err.error.data.message != "Unauthenticated."
        ) {
          this.checked = true;
          this.$store.commit("user/setTimer", {
            timerId: err.error.data.data.id,
            value: err.error.data.data.value,
          });
          this.startTimer = true;
        }
        this.error = err.error.data.message || "Failed to process, try later.";
      }
    },
    async getTimers() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("user/getTimers");
        this.timers = this.$store.getters["user/timersData"];
        this.isLoading = false;
      } catch (err: any) {
        this.isLoading = false;
        this.error = err.error.data.message || "Failed to process, try later.";
      }
    },
    getRealTime(value: any) {
      return timerService.convertToTimer(value);
    },
    handleError() {
      this.error = "";
    },
  },
  mounted() {
    this.getTimers();
  },
});
</script>
<style>
#timer-button {
  width: 150px;
  height: 150px;
  border-radius: 84px;
  border: 2px #135c86 solid;
}

#timer-button:hover {
  transition: background 400ms;
  background: #3e90d7;
  fill: #fff;
}

#timer-button svg {
  width: 90px;
  height: 90px;
}
.timer-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.clock {
  position: absolute;
  bottom: 0;
  right: 20px;
}
.clock #Baseclock {
  color: black;
}
.clocks {
  display: flex;
  place-items: flex-start;
  justify-content: space-around;
}
.text-style {
  text-align: center;
  color: #000;
  /* text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0); */
}
.text-style-no-shadow {
  color: #000;
  text-align: center;
}
.timers-list {
  list-style: none;
  padding: 0px;
  height: 130px;
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.timers-list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.timers-list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.title {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10%;
  border-radius: 10px;
  font-size: 40px;
  text-shadow: 0 0 20px #5092cb, 0 0 20px #5092cb;
}
</style>

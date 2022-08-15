<template>
  <div style="display:flex, flex-direction: column">
    <div id="Baseclock" v-if="defaultClock">
      <p class="date">{{ date }}</p>
      <p class="time">{{ clock }}</p>
    </div>
    <div v-else id="Baseclock">
      <p class="date">Your Current Timer</p>
      <p v-if="timer" class="time">{{ displayTimer }}</p>
      <p v-else>No Timer is Running</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import TimerService from "../../services/timer.service";
const timerService = new TimerService();
var week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default defineComponent({
  name: "base-clock",
  props: {
    timer: {
      default: false,
    },
    currentStateTimer: {
      default: 0,
    },
    defaultClock: {
      default: true,
    },
  },
  watch: {
    timer() {
      if (this.timer) {
        this.timerInterval = setInterval(this.updateTimer, 1000);
      } else {
        clearInterval(this.timerInterval);
      }
    },
    currentStateTimer() {
      this.runningTimerValue = this.currentStateTimer;
    },
  },
  data() {
    return {
      clock: "",
      currentTimer: "",
      runningTimerValue: this.currentStateTimer,
      timerInterval: 0,
      date: "",
    };
  },
  computed: {
    displayTimer() {
      return this.currentTimer;
    },
  },
  methods: {
    updateClock() {
      var cd = new Date();
      this.clock =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    },
    updateTimer() {
      this.runningTimerValue += 1;
      this.currentTimer = timerService.convertToTimer(this.runningTimerValue);
    },
    zeroPadding(num: any, digit: any) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },
  beforeMount() {
    let timerID = setInterval(this.updateClock, 1000);
    this.updateClock();
  },
});
</script>
<style scoped>
#Baseclock {
  font-family: "Share Tech Mono", monospace;
  color: #000;
  text-align: center;
  /* text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0); */
}
#Baseclock .time {
  letter-spacing: 0.05em;
  font-size: 26px;
  padding: 5px 0;
}
#Baseclock .date {
  letter-spacing: 0.1em;
  font-size: 24px;
}
#Baseclock .text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}
</style>

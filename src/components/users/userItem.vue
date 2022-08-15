<template>
  <div class="box">
    <li v-if="!none">
      <div class="row">
        <div class="col-sm-3">
          <h3>{{ name }}</h3>
        </div>
        <div class="col-sm-3">
          <span>Status:</span>
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 16 16"
            :class="userStatus"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
            />
          </svg>
        </div>
      </div>
    </li>
    <li v-else>
      <div class="row">
        <h3>No Results</h3>
      </div>
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "user-item",
  props: ["id", "name", "userStatus", "none"],
  data() {
    return {
      color: "red",
    };
  },
  /* computed: {
    userStatus() {
      if (this.id === 2) {
        return "green";
      }
      return "red";
    },
  }, */
});
</script>

<style scoped>
li {
  border-radius: 12px;
  padding: 1rem;
}

li h3 {
  font-size: 1.25rem;
}

li .team-members {
  margin: 0.5rem 0;
}

.online {
  fill: #2dde98;
}

.offline {
  fill: #de2d2d;
}

.await {
  fill: #dec42d;
}

a {
  text-decoration: none;
  color: white;
  display: inline-block;
  background-color: #11005c;
}

a:hover,
a:active {
  background-color: #220a8d;
}
</style>

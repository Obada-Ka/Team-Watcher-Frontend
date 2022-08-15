<template>
  <button class="btn effect" v-if="!link" :class="mode">
    <slot></slot>
    <slot name="svg"></slot>
  </button>
  <router-link class="effect" v-else :to="to" :class="mode">
    <slot></slot>
    <slot name="svg"></slot>
  </router-link>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: Boolean,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
});
</script>

<style scoped>
.btn,
.link {
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: 2px solid #e74c3c;
  border-radius: 0.6em;
  color: #e74c3c;
  cursor: pointer;
  display: flex;
  align-self: center;
  font-size: 0.98rem;
  font-weight: 400;
  line-height: 0.2;
  margin: 20px;
  padding: 1.8em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}
.svg-icon {
  padding: 10px;
  border-radius: 30px !important;
}
.btn:hover,
.btn:focus {
  color: #fff;
  outline: 0;
}
.svg-icon:hover svg {
  fill: #fff !important;
}
.link:hover,
.link:active,
.btn:hover,
.btn:active {
  background-color: #270041;
  border-color: #270041;
}

.effect {
  border-color: #2f3c7e;
  border-radius: 20px;
  color: #2f3c7e;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 150ms ease-in-out;
}
.effect:after {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 100%;
  background: #2f3c7e;
  z-index: -1;
  transition: width 150ms ease-in-out;
}
.effect:hover {
  fill: #fff;
}
.effect:hover:after {
  width: 110%;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>

/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FontAwesomeIcon from "@/utilities/fontawesome/fontawesome-icons";
import "vue-select/src/scss/vue-select.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import setupInterceptors from "./config/setupInterceptors";
// @ts-ignore
import BaseSpinner from "./components/UI/BaseSpinner.vue";
// @ts-ignore
import BaseDialog from "./components/UI/BaseDialog.vue";
// @ts-ignore
import BaseButton from "./components/UI/BaseButton.vue";
// @ts-ignore
import BaseSideBar from "./components/UI/BaseSideBar.vue";
// @ts-ignore
import hasPermission from "./directives/based-role.ts";
import Vue from "vue";
// @ts-ignore
import vSelect from "vue-select";

setupInterceptors(store);

const app = createApp(App);
app.use(store).use(router)
app.directive("can-user", hasPermission);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);
app.component("base-button", BaseButton);
app.component("side-bar", BaseSideBar);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("v-select", vSelect);
app.mount("#app");

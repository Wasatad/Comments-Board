import { createApp } from "vue";
import { createStore } from "vuex";

import App from "./App.vue";

const app = createApp(App);
const store = createStore({
  modules: { users, comments },
});

app.use(store);

import users from "./users.js";
import comments from "./comments.js";

app.mount("#app");

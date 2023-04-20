import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import home from "./modules/home";
import orders from "./modules/orders";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    server: "http://164.92.249.184:8009",
    user_name: localStorage.getItem("user_name"),
    phone_number: localStorage.getItem("phone_number"),
    user_type: localStorage.getItem("user_type"),
    // active: localStorage.getItem("active"),
    loading_login: false,
    snack_message: {},
    snack_bar: false,
  },
  mutations: {
    LOGIN_USER(state, data) {
      state.user_name = data.result[0].user_name;
      state.phone_number = data.result[0].phone_number;
      state.user_type = data.result[0].user_type;
      // state.active = data.result[0].active;
    },
    CLEAR_USER() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("phone_number");
      localStorage.removeItem("user_type");
      localStorage.removeItem("active");

      location.reload();
    },
    SNACK_MESSAGE(state, snack_message) {
      state.snack_message = snack_message;
      state.snack_bar = true;
    },
    TIME_OUT(state) {
      state.snack_bar = false;
      state.snack_message = null;
    },
  },
  actions: {
    login({ commit, state }, data) {
      state.loading_login = true;
      return new Promise((resolve) => {
        state.loading_button_login = true;
        axios({
          url: `${state.server}` + "/api/login",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
        })
          .then((response) => {
            const token = response.data.token;
            const data = response.data;
            commit("LOGIN_USER", data);
            state.loading_login = false;
            Vue.prototype.$http.defaults.headers.common["Authorization"] =
              "Bearer " + token;
            localStorage.setItem("token", token);
            localStorage.setItem("user_name", data.result[0].user_name);
            localStorage.setItem("phone_number", data.result[0].phone_number);
            localStorage.setItem("user_type", data.result[0].user_type);
            // localStorage.setItem("active", data.result[0].active);

            resolve(response);
          })
          .catch((e) => {
            console.log(e);
            state.loading_login = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "ادخلت اسم مستخدم او كلمة مرور غير صحيحه";
            commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              commit("TIME_OUT", snack_message);
            }, 4000);
          });
      });
    },
    logout({ commit }) {
      commit("CLEAR_USER");
    },
  },
  getters: {
    snack_bar(state) {
      return !!state.snack_bar;
    },
  },
  modules: {
    home,
    orders,
  },
});

import axios from "axios";
const settings = {
  namespaced: true,
  state: {
    lodding_username: false,
    lodding_password: false,
    lodding_number: false,
  },
  mutations: {
    UPDATE_USERNAME(state, user_name) {
      localStorage.setItem("user_name", user_name);
    },
    UPDATE_NUMBER(state, phone_number) {
      localStorage.setItem("phone_number", phone_number);
    },
  },
  actions: {
    update_number({ commit, state, rootState }, data) {
      state.lodding_number = true;
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/update_phone_number",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "put",
        })
          .then((response) => {
            commit("UPDATE_NUMBER", response.data.result[0].phone_number);
            state.lodding_number = false;
            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "تم تغيير رقم الهاتف بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            resolve(response);
          })
          .catch(() => {
            state.lodding_number = false;
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
    update_username({ commit, state, rootState }, data) {
      state.lodding_username = true;
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/get_products",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "put",
        })
          .then((response) => {
            commit("UPDATE_USERNAME", response.data.result[0].user_name);
            state.lodding_username = false;
            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "تم تغيير اسم المستخدم بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            resolve(response);
          })
          .catch(() => {
            state.lodding_username = false;
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
    update_passwoerd({ commit, state, rootState }, data) {
      state.lodding_password = true;
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/update_passwoerd",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "put",
        })
          .then((response) => {
            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "تم تغيير كلمة المرور بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);

            state.lodding_password = false;
            resolve(response);
          })
          .catch(() => {
            state.lodding_password = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "فشلة العملية";
            commit("SNACK_MESSAGE", snack_message, {
              root: true,
            });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, {
                root: true,
              });
            }, 4000);
          });
      });
    },
  },
  getters: {},
  modules: {},
};
export default settings;

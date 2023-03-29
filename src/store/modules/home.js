// import axios from "axios";
const home = {
  namespaced: true,
  state: {
    shopping_basket: JSON.parse(localStorage.getItem("cart")),
    totle_price: JSON.parse(localStorage.getItem("totle_price")) || 0,
  },
  mutations: {
    Add_TO_CART(state) {
      state.shopping_basket = JSON.parse(localStorage.getItem("cart"));
      state.totle_price = JSON.parse(localStorage.getItem("totle_price"));
    },
    EDIT_TO_CART(state, cart) {
      state.shopping_basket = cart;
      // console.log("totle_price", totle_price);
      state.totle_price = JSON.parse(localStorage.getItem("totle_price"));
    },
    REMOVE_TO_CART(state) {
      let cart = [];
      let totle_price = 0;
      state.shopping_basket = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      state.totle_price = localStorage.setItem(
        "totle_price",
        JSON.stringify(totle_price)
      );
    },
  },
  actions: {
    add_item({ commit }, data) {
      commit("ADD_ITEM", data);
    },
  },
  getters: {},
  modules: {},
};
export default home;

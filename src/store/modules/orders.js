import axios from "axios";
import moment from "moment";

const orders = {
  namespaced: true,
  state: {
    total_price: 0,
    cart_products: [],
    orders: [],
    type_invoice: localStorage.getItem("invoice") || 1,
    type_cash: localStorage.getItem("type_cash") || 1,
    advance_details: null,
    products_query: "",
    order_query: "",
    pageCount: 1,
    params: {
      sortBy: [],
      sortDesc: [],
      page: 1,
      itemsPerPage: 10,
    },
    loading_product: false,
    lodding_table: false,
    loading_add_orders: false,
    lodding_table_order: false,
  },
  mutations: {
    GET_PRODUCTS(state, product) {
      let chack_goods = false;
      if (product.length == 1) {
        state.cart_products.forEach((e) => {
          if (e.id == product[0].id) {
            chack_goods = true;
          }
        });
        if (chack_goods == false) {
          let ProductData = {};
          product.forEach((element) => {
            if (element.quantity != 0) {
              ProductData["id"] = element.id;
              ProductData["quantity"] = 1;
              ProductData["offer"] = element.offer;
              ProductData["details"] = element.advance_details;
              ProductData["offer_expired"] = element.offer_expired;
              ProductData["name"] = element.name;
              ProductData["company"] = element.brand.name;
              if (
                element.offer != null &&
                moment().format("YYYY-MM-DD") <= element.offer_expired
              ) {
                ProductData["sale_price"] =
                  element.price - (element.price / 100) * element.offer;
                state.total_price =
                  state.total_price +
                  (element.price - (element.price / 100) * element.offer);
              } else {
                ProductData["sale_price"] = element.price;
                state.total_price += element.price;
              }
              ProductData["availableQuantity"] = element.quantity - 1;
              state.cart_products.push(ProductData);
            } else {
              let snack_message = {};
              snack_message["color"] = "orange darken-1";
              snack_message["icon"] = "alert";
              snack_message["text"] = "نفذت الكميه";
              this.commit("SNACK_MESSAGE", snack_message);
              setTimeout(() => {
                this.commit("TIME_OUT", snack_message);
              }, 4000);
            }
          });
        }
      } else {
        let snack_message = {};
        snack_message["color"] = "orange darken-2";
        snack_message["icon"] = "alert-circle";
        snack_message["text"] = "ادخلت اسم منتج او باركود غير متوفر";
        this.commit("SNACK_MESSAGE", snack_message, { root: true });
        setTimeout(() => {
          this.commit("TIME_OUT", snack_message, { root: true });
        }, 4000);
      }
      state.lodding_table = false;
    },

    GET_ORDERS(state, orders) {
      state.orders.splice(0, state.orders.length);
      orders.forEach((element) => {
        state.orders.push(element);
      });
    },
    ADD_ORDERS(state, orders) {
      state.orders.unshift(orders);
    },
  },
  actions: {
    add_item({ commit }, data) {
      commit("ADD_ITEM", data);
    },
    get_products({ commit, state, rootState }) {
      state.lodding_table = true;
      return new Promise((resolve) => {
        let query = "";
        if (
          state.products_query != undefined &&
          state.products_query != null &&
          state.products_query.length > 0
        )
          query = `?query=${state.products_query}`;
        axios({
          url: `${rootState.server}` + "/api/get_products" + query,
          method: "get",
        })
          .then((response) => {
            if (response.data.result) {
              commit("GET_PRODUCTS", response.data.result);
            }

            resolve(response);
          })
          .catch(() => {
            state.lodding_table = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
          });
      });
    },
    add_orders({ commit, state, rootState }, data) {
      state.loading_add_orders = true;
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/add_order",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
        })
          .then((response) => {
            commit("ADD_ORDERS", response.data.result[0]);
            let snack_message = {};
            snack_message["color"] = "green darken-1";
            snack_message["icon"] = "checkbox-marked-circle";
            snack_message["text"] = "تمت عمليه شراء بنجاح";
            commit("SNACK_MESSAGE", snack_message, { root: true });
            setTimeout(() => {
              commit("TIME_OUT", snack_message, { root: true });
            }, 4000);
            state.loading_add_orders = false;

            state.advance_details = null;
            resolve(response);
          })
          .catch(() => {
            state.loading_add_orders = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              commit("TIME_OUT", snack_message);
            }, 4000);
          });
      });
    },
    get_orders({ commit, state, rootState }) {
      state.lodding_table_order = true;
      let data = state.params;
      return new Promise((resolve) => {
        let skip = (data.page - 1) * data.itemsPerPage;
        let limit = data.itemsPerPage;
        let query = "";
        if (
          state.order_query != undefined &&
          state.order_query != null &&
          state.order_query.length > 0
        )
          query = `&query=${state.order_query}`;
        axios({
          url:
            `${rootState.server}` +
            "/api/get_auth_order" +
            "?skip=" +
            skip +
            "&limit=" +
            limit +
            query,
          method: "get",
        })
          .then((response) => {
            state.pageCount = response.data.count;
            commit("GET_ORDERS", response.data.result);
            state.lodding_table_order = false;
            resolve(response);
          })
          .catch(() => {
            state.lodding_table_order = false;
            let snack_message = {};
            snack_message["color"] = "red darken-1";
            snack_message["icon"] = "alert";
            snack_message["text"] = "حدث مشكلة في الاتصال بالخادم";
            commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              commit("TIME_OUT", snack_message);
            }, 4000);
          });
      });
    },
  },
  getters: {},
  modules: {},
};
export default orders;

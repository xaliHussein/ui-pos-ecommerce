import axios from "axios";
import moment from "moment";

const orders = {
  namespaced: true,
  state: {
    total_price: 0,
    cart_products: [],
    products_query: "",
    pageCount: 1,
    params: {
      sortBy: [],
      sortDesc: [],
      page: 1,
      itemsPerPage: 12,
    },
    loading_product: false,
    lodding_table: false,
  },
  mutations: {
    GET_PRODUCTS(state, product) {
      let chack_goods = false;
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
            // ProductData["availableQuantity"] = element.quantity - 1;
            ProductData["availableQuantity"] = 2;
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
        state.lodding_table = false;
      }
    },
  },
  actions: {
    add_item({ commit }, data) {
      commit("ADD_ITEM", data);
    },
    // احضار البضائع عن طريق باركود
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

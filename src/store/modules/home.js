import axios from "axios";
const home = {
  namespaced: true,
  state: {
    products: [],
    categories: [],
    products_query: "",
    pageCount: 1,
    params: {
      sortBy: [],
      sortDesc: [],
      page: 1,
      itemsPerPage: 12,
    },
    loading_product: false,
    loading_categories: false,
    category_id: "",
  },
  mutations: {
    GET_PRODUCTS(state, products) {
      state.products.splice(0, state.products.length);
      products.forEach((element) => {
        state.products.push(element);
      });
    },
    GET_CATEGORIES(state, categories) {
      state.categories.splice(0, state.categories.length);
      categories.forEach((element) => {
        state.categories.push(element);
      });
    },
  },
  actions: {
    get_products({ commit, state, rootState }) {
      state.loading_product = true;
      let data = state.params;
      return new Promise((resolve) => {
        let skip = (data.page - 1) * data.itemsPerPage;
        let limit = data.itemsPerPage;

        let query = "";
        if (
          state.products_query != undefined &&
          state.products_query != null &&
          state.products_query.length > 0
        )
          query = `&query=${state.products_query}`;
        let category_id = "";
        if (
          state.category_id != undefined &&
          state.category_id != null &&
          state.category_id.length > 0
        )
          category_id = `&category_id=${state.category_id}`;
        axios({
          url:
            `${rootState.server}` +
            "/api/get_products" +
            "?skip=" +
            skip +
            "&limit=" +
            limit +
            query +
            category_id,
          method: "get",
        })
          .then((response) => {
            state.pageCount = response.data.count;
            commit("GET_PRODUCTS", response.data.result);
            state.loading_product = false;
            resolve(response);
          })
          .catch(() => {
            state.loading_product = false;
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
    get_categories({ commit, state, rootState }) {
      state.loading_categories = true;
      return new Promise((resolve) => {
        axios({
          url: `${rootState.server}` + "/api/get_categories",
          method: "get",
        })
          .then((response) => {
            commit("GET_CATEGORIES", response.data.result);
            state.loading_categories = false;
            resolve(response);
          })
          .catch(() => {
            state.loading_categories = false;
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
  },
  getters: {},
  modules: {},
};
export default home;

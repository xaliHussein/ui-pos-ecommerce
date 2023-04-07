<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="3"
      lg="3"
      v-for="(n, index) in 8"
      :key="'A' + index"
      class="skeleton">
      <v-card
        class="card-skeleton"
        v-if="loading_product == true"
        max-width="250">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="card"></v-skeleton-loader>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="3"
      lg="3"
      v-for="(product, index) in products"
      :key="index">
      <v-card
        v-if="loading_product == false"
        color="#ECE9F8"
        class="mx-auto mt-3 card"
        max-width="250">
        <v-img
          :src="server + product.images[0].image"
          height="160px"
          width="250"></v-img>
        <div
          v-if="
            product.offer != null &&
            moment().format('YYYY-MM-DD') <= product.offer_expired
          "
          class="ribbon2 ribbon-top-left">
          <span>{{ product.offer }}%</span>
        </div>
        <v-card-title class="pb-0">
          <h5
            :class="
              product.offer != null &&
              moment().format('YYYY-MM-DD') <= product.offer_expired
                ? 'offer'
                : ''
            ">
            {{ product.price | formatNumber }} IQD
          </h5>

          <v-spacer></v-spacer>
          <h5 style="direction: rtl">{{ product.name | str_limit(13) }}</h5>
        </v-card-title>

        <v-card-actions class="offer_price">
          <h3
            v-if="
              product.offer != null &&
              moment().format('YYYY-MM-DD') <= product.offer_expired
            ">
            {{
              (product.price - (product.price / 100) * product.offer)
                | formatNumber
            }}
            IQD
          </h3>
          <v-spacer></v-spacer>
          <h3 class="mr-3">{{ product.brand.name }}</h3>
        </v-card-actions>
      </v-card>
      <!-- v-if="products.length < 0" -->
    </v-col>

    <v-col v-if="products.length <= 0" class="d-flex justify-center">
      <v-card class="empty">
        <v-img width="300" height="300" src="@/assets/empty-box.gif"> </v-img>
        <v-card-title>
          <h3>لم يتم اضافة اي منتجات بعد</h3>
        </v-card-title></v-card
      >
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: {
      loading_product: {
        type: Boolean,
        default: false,
      },
      products: {
        type: Array,
        require: true,
      },
    },
    computed: {
      server() {
        return this.$store.state.server;
      },
    },
    methods: {
      // اضافة بضائع الى سلة
      // add_item(item) {
      //   var totle_price = this.$store.state.home.totle_price;
      //   var products = {};
      //   products["id"] = item.id;
      //   products["price"] = item.price;
      //   products["title"] = item.title;
      //   products["quantity"] = 1;
      //   products["img"] = item.img;
      //   // انشاء خزن في متصفح اذا لم يتم انشاء اي سلة
      //   if (!JSON.parse(localStorage.getItem("cart"))) {
      //     totle_price += item.price;
      //     localStorage.setItem("totle_price", JSON.stringify(totle_price));
      //     let cart = [];
      //     cart.push(products);
      //     localStorage.setItem("cart", JSON.stringify(cart));
      //     this.$store;
      //     this.$store.commit("home/Add_TO_CART");
      //   } else {
      //     // في حال وجود سلة مسبقاا
      //     var chack_product = false;
      //     let cart = JSON.parse(localStorage.getItem("cart"));
      //     // اضافة شرط حتى لا تتكر البضائع في السلة
      //     cart.forEach((e) => {
      //       if (e.id == item.id) {
      //         chack_product = true;
      //       }
      //     });
      //     if (chack_product == false) {
      //       totle_price += item.price;
      //       localStorage.setItem("totle_price", JSON.stringify(totle_price));
      //       cart.push(products);
      //       localStorage.setItem("cart", JSON.stringify(cart));
      //       this.$store.commit("home/Add_TO_CART");
      //     }
      //   }
      // },
    },
  };
</script>
<style scoped>
  .empty {
    box-shadow: 0px 0px 0px 0px !important;
  }
  .card {
    cursor: pointer;
    box-shadow: 0 5px 15px rgb(0 0 0 / 7%) !important;
    border-radius: 20px;
    transition: all ease 0.2s;
  }
  .card:hover {
    transition: all ease 0.2s;
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgb(0 0 0 / 20%) !important;
  }

  .skeleton {
    padding-bottom: 0px;
  }
  .card-skeleton {
    direction: ltr;
    padding-top: 10px;
    border-radius: 25px;
    box-shadow: 0px 0px 0px 0px !important;
  }
  .ribbon2 {
    width: 170px;
    height: 124px;
    overflow: hidden;
    position: absolute;
  }
  .ribbon2::before,
  .ribbon2::after {
    position: absolute;
    content: "";
    display: block;
    border: 5px solid #624fc6;
  }
  .ribbon2 span {
    position: absolute;
    display: block;
    width: 226px;
    padding: 15px 0;
    background-color: #624fc6;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    color: #fff;
    font: 700 19px/1 "Cairo", sans-serif;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    text-align: center;
  }
  .ribbon-top-left {
    top: -12px;
    left: -10px;
  }
  .ribbon-top-left::before,
  .ribbon-top-left::after {
    border-top-color: transparent;
    border-left-color: transparent;
  }
  .ribbon-top-left::before {
    top: 0;
    right: 44px;
  }
  .ribbon-top-left::after {
    bottom: -1px;
    left: 1px;
  }
  .ribbon-top-left span {
    right: 4px;
    top: 15px;
    transform: rotate(-45deg);
  }
  .offer {
    text-decoration: line-through;
    text-decoration-color: #624fc6;
    text-decoration-thickness: 3px;
  }
  .offer_price {
    margin-top: 0;
    margin-left: 6px;
  }
</style>

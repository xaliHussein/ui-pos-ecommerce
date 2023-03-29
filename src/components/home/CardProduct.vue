<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="4"
      v-for="(item, index) in items"
      :key="index">
      <v-card
        v-if="loading == false"
        color="#D8E6E9"
        class="mx-auto mt-2 card"
        max-width="250"
        @click="add_item(item)">
        <v-img :src="item.img" height="160px" width="250"></v-img>
        <v-card-actions>
          <v-list-item>
            <h4>{{ item.title }}</h4>
          </v-list-item>
          <v-list-item-action class="mr-5">
            <v-list-item-action-text
              ><h2>{{ item.price }}$</h2></v-list-item-action-text
            >
          </v-list-item-action>
        </v-card-actions>
      </v-card>
      <v-card class="card-skeleton" v-if="loading == true" max-width="250">
        <v-skeleton-loader
          class="mx-auto skeleton"
          max-width="300"
          type="card"></v-skeleton-loader>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      items: {
        type: Array,
        require: true,
      },
    },
    methods: {
      // اضافة بضائع الى سلة
      add_item(item) {
        var totle_price = this.$store.state.home.totle_price;
        var products = {};
        products["id"] = item.id;
        products["price"] = item.price;
        products["title"] = item.title;
        products["quantity"] = 1;
        products["img"] = item.img;

        // انشاء خزن في متصفح اذا لم يتم انشاء اي سلة
        if (!JSON.parse(localStorage.getItem("cart"))) {
          totle_price += item.price;
          localStorage.setItem("totle_price", JSON.stringify(totle_price));
          let cart = [];
          cart.push(products);
          localStorage.setItem("cart", JSON.stringify(cart));
          this.$store;
          this.$store.commit("home/Add_TO_CART");
        } else {
          // في حال وجود سلة مسبقاا
          var chack_product = false;
          let cart = JSON.parse(localStorage.getItem("cart"));
          // اضافة شرط حتى لا تتكر البضائع في السلة
          cart.forEach((e) => {
            if (e.id == item.id) {
              chack_product = true;
            }
          });
          if (chack_product == false) {
            totle_price += item.price;
            localStorage.setItem("totle_price", JSON.stringify(totle_price));
            cart.push(products);
            localStorage.setItem("cart", JSON.stringify(cart));
            this.$store.commit("home/Add_TO_CART");
          }
        }
      },
    },
  };
</script>
<style scoped>
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

  .card-skeleton {
    direction: ltr;
    padding-top: 25px;
    padding-bottom: 25px;
    border-radius: 25px;
    box-shadow: 0px 0px 0px 0px !important;
  }
</style>

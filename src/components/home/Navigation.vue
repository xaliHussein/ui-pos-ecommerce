<template>
  <v-navigation-drawer app clipped right width="350px">
    <v-toolbar class="toolbar">
      <v-toolbar-title><h4>Order #</h4></v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>

    <v-virtual-scroll
      :items="products"
      :item-height="120"
      :height="280"
      class="scroll"
      v-if="products.length > 0">
      <template v-slot:default="{ item }">
        <v-list-item
          class="item-basket d-flex justify-center"
          v-on:dblclick="remove(item)">
          <v-list-item-avatar tile size="90">
            <v-img :src="item.img" class="img"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="d-flex justify-center"
              ><h4>{{ item.title }}</h4>
              <v-spacer></v-spacer>
              <h4>Quantity</h4></v-list-item-title
            >
            <v-list-item-subtitle class="mt-2 d-flex justify-center"
              ><h3>{{ item.price }}$</h3>
              <v-spacer></v-spacer>
              <v-btn icon x-small style="background-color: #0f2125"
                ><v-icon color="white">mdi-plus</v-icon></v-btn
              >
              <h3 class="px-1 black--text">{{ item.quantity }}</h3>
              <v-btn icon x-small style="background-color: #0f2125"
                ><v-icon color="white">mdi-minus</v-icon></v-btn
              >
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-virtual-scroll>
    <v-card class="card-totle mx-auto" v-if="products.length > 0">
      <v-card-title class="d-flex justify-center pb-0"
        ><h5>Subtotal</h5>
        <v-spacer></v-spacer>
        <h5>{{ totle_price }}$</h5></v-card-title
      >
      <v-card-title class="d-flex justify-center pt-0"
        ><h5>Coupon</h5>
        <v-spacer></v-spacer>
        <h5>10.00$</h5></v-card-title
      >
      <v-divider class="divider"></v-divider>
      <v-card-title class="d-flex justify-center pt-0 pb-0"
        ><h5>Total</h5>
        <v-spacer></v-spacer>
        <h5>{{ totle_price }}$</h5></v-card-title
      >
      <v-card-actions class="pt-0 d-flex justify-center">
        <v-btn color="#EC5A5A" class="btn" @click="remove_all">Cancel</v-btn>
        <v-btn color="#B1CED4" class="btn">Buy</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="card-basket mx-auto" v-else>
      <v-card-title class="d-flex justify-center">
        <font-awesome
          :icon="['fas', 'cart-shopping']"
          color="#1F424A"
          size="3x"
      /></v-card-title>
      <v-card-text class="text-center">
        <h2>Add Your Products To</h2>
        <h2>This Basket</h2></v-card-text
      >
    </v-card>
  </v-navigation-drawer>
</template>
<script>
  export default {
    props: {
      products: {
        type: Array,
        require: true,
      },
    },
    computed: {
      totle_price() {
        return this.$store.state.home.totle_price;
      },
      // eslint-disable-next-line vue/return-in-computed-property
      height() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return 1150;
          case "sm":
            return 630;
          case "md":
            return 630;
          case "lg":
            return 643;
          case "xl":
            return 643;
        }
      },
    },
    methods: {
      remove(items) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let totle_price = JSON.parse(localStorage.getItem("totle_price"));
        let index = cart.findIndex(
          (item) => item.id == items.id && item.price == items.price
        );
        totle_price = totle_price - items.price * items.quantity;

        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("totle_price", JSON.stringify(totle_price));
        console.log("totle_price1", totle_price);
        this.$store.commit("home/EDIT_TO_CART", cart, totle_price);
      },
      remove_all() {
        this.$store.commit("home/REMOVE_TO_CART");
      },
    },
  };
</script>
<style scoped>
  .toolbar {
    color: rgba(0, 0, 0, 0.6);
    box-shadow: 0px 0px 0px 0px !important;
  }
  .card {
    border-radius: 15px;
    height: 100px !important;
  }
  .card-basket {
    box-shadow: 0px 0px 0px 0px !important;
    margin-top: 100px;
  }
  .card-totle {
    box-shadow: 0px 0px 0px 0px !important;
    border: 2px dashed #3d8493;
    border-radius: 15px;
    width: 330px;
    margin-top: 10px;
  }
  .divider {
    border: 1px dashed #3d8493 !important;
  }
  .item-basket {
    cursor: pointer;
    box-shadow: 0px 0px 0px 0px !important;
    background-color: #d8e6e9;
    border-radius: 15px;
    width: 330px;
    margin: auto;
  }
  .img {
    border-radius: 10px;
  }
  .scroll {
    margin-top: 10px;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #e6e6e6;
    border-left: 1px solid #dadada;
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb {
    background-image: linear-gradient(180deg, #0f2125 0%, #1f424a 99%);
    border: solid 1px #e6e6e6;
    border-radius: 100px;
  }
  .btn {
    border-radius: 7px;
  }
</style>

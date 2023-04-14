<template>
  <v-container fluid>
    <v-row class="justify-center">
      <Inovice :dialog="dialog" :products_inovice="products_inovice" />
      <Navigation
        v-on:displayInovice="displayInovice"
        v-on:createOrder="create_order" />
      <Table />

      <!-- <v-btn
        v-print="printObj"
        color="#ad519c"
        large
        rounded
        class="px-16 mx-auto"
        elevation="4"
        ><h4 style="color: white">print</h4></v-btn
      > @click="dialog = true"-->
      <!-- <v-btn @click="push">push </v-btn> -->
    </v-row>
  </v-container>
</template>
<script>
  import Navigation from "../components/orders/Navigation";
  import Inovice from "../components/orders/Inovice";
  import Table from "../components/orders/Table";
  export default {
    components: { Navigation, Inovice, Table },
    data() {
      return {
        dialog: false,
        products_inovice: [],
      };
    },
    computed: {
      loading_order() {
        return this.$store.state.orders.loading_order;
      },
    },
    methods: {
      displayInovice() {
        this.products_inovice = this.$store.state.orders.cart_products;
        this.dialog = true;
      },
      create_order() {
        let data = {};

        let cart_products = this.$store.state.orders.cart_products;
        let advance_details = this.$store.state.orders.advance_details;
        console.log("cart_products", cart_products);
        console.log("advance_details", advance_details);
      },
    },
  };
</script>
<style scoped>
  .data_table {
    direction: rtl;
  }
</style>
<style lang="scss">
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > th {
    background-color: #624fc6 !important;
    color: #ffffff !important;
    font-family: "Cairo", sans-serif !important;
  }
  .theme--light.v-data-table > .v-data-table__wrapper {
    border-radius: 14px !important;
  }
</style>

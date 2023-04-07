<template>
  <v-container fluid>
    <v-row class="justify-center">
      <Inovice :dialog="dialog" :products="products_shopping" />
      <Navigation :products="products_shopping" />
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
        products_shopping: [],
      };
    },
    computed: {
      loading_order() {
        return this.$store.state.orders.loading_order;
      },
    },
    methods: {},
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
    background-color: #ad519c !important;
    color: #ffffff !important;
    font-family: "Cairo", sans-serif !important;
  }
  .theme--light.v-data-table > .v-data-table__wrapper {
    border-radius: 14px !important;
  }
</style>

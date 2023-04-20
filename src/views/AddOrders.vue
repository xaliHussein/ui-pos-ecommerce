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
  import { jsPDF } from "jspdf";
  import autoTable from "jspdf-autotable";
  import moment from "moment";
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
        let array = [];
        let cart_products = this.$store.state.orders.cart_products;
        let advance_details = this.$store.state.orders.advance_details;
        cart_products.forEach((e) => {
          var data = {};
          var array2 = [];
          data["id"] = e.id;
          data["quantity"] = e.quantity;

          advance_details.forEach((element) => {
            let adv = {};

            if (element.id == e.id) {
              adv[element.key] = element.value;

              array2.push(adv);
            }
          });
          data["advance_details"] = array2;
          array.push(data);
        });
        let orders = {};
        orders["products"] = array;
        this.$store.dispatch("orders/add_orders", orders).then((response) => {
          this.print_invoice(response.data.result[0]);
        });
      },
      print_invoice(order) {
        var type_invoice = this.$store.state.orders.type_invoice;
        if (type_invoice == 2) {
          const pdf = new jsPDF("p", "pt", "A4");
          var font = this.$store.state.font.font;

          pdf.addFileToVFS("Amiri-Regular-normal.ttf", font);
          pdf.addFont(
            "Amiri-Regular-normal.ttf",
            "Amiri-Regular-normal",
            "normal"
          );

          pdf.setFont("Amiri-Regular-normal");
          let data = this.$store.state.orders.cart_products;
          var image = require("../assets/logo.png");
          var imgLogo = new Image();
          imgLogo.src = image;
          pdf.addImage(imgLogo, 250, 40, 70, 70);
          pdf.text(262, 135, "اسم الشركة");
          var body = [
            ["رقم الطلب", "مجموع", "تاريخ الشراء"],
            [
              order.serial_number,
              order.total_cost + " د.ع",
              moment(order.created_at).format("YYYY-MM-DD"),
            ],
          ];
          autoTable(pdf, {
            body: body,
            bodyStyles: { halign: "center" },
            margin: { top: 160 },
            styles: { font: "Amiri-Regular-normal" },
          });

          autoTable(pdf, {
            body: data,
            columns: [
              { header: "الكميه", dataKey: "quantity" },
              { header: "السعر", dataKey: "sale_price" },
              { header: "خصم", dataKey: "offer" },
              { header: "اسم الشركه", dataKey: "company" },
              { header: "المنتج", dataKey: "name" },
            ],
            headStyles: { fillColor: [98, 79, 198], halign: "center" },
            bodyStyles: { halign: "center" },
            margin: { top: 173 },
            theme: "grid",
            styles: { font: "Amiri-Regular-normal" },
          });
          pdf.save(order.serial_number + ".pdf");
          this.$store.state.orders.total_price = 0;
          this.$store.state.orders.cart_products = [];
        }
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

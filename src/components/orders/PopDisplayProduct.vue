<template>
  <v-container fluid id="exportToPDF">
    <v-row justify="center">
      <v-dialog
        class="d-flex justify-center"
        :value="dialog"
        persistent
        max-width="650"
        hight="600">
        <v-card class="mx-auto">
          <v-card-title class="mx-auto">
            <h1 class="mx-auto">اسم الشركة</h1>
          </v-card-title>

          <v-card-title class="d-flex justify-center" style="direction: ltr">
            <h5>{{ total_cost | formatNumber }} د.ع</h5>
            <h5>: مجموع</h5>
            <v-spacer></v-spacer>

            <h5 class="text-right">
              {{ moment(created_at).format("YYYY/MM/DD") }}
            </h5>
          </v-card-title>

          <v-card-title class="d-flex justify-center pt-1">
            <v-simple-table style="direction: rtl" height="280px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center font-weight-black">
                      <h3>المنتج</h3>
                    </th>
                    <th class="text-center font-weight-black">
                      <h3>الشركة</h3>
                    </th>

                    <th class="text-center font-weight-black">
                      <h3>السعر</h3>
                    </th>
                    <th class="text-center font-weight-black">
                      <h3>الكمية</h3>
                    </th>
                    <th class="text-center font-weight-black">
                      <h3>خصم</h3>
                    </th>
                    <th class="text-center font-weight-black">
                      <h3>تفاصيل المنتج</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in product_order" :key="index">
                    <td class="text-center font-weight-black">
                      {{ order.name }}
                    </td>
                    <td class="text-center font-weight-black">
                      {{ order.brand.name }}
                    </td>
                    <td
                      class="text-center font-weight-black"
                      dir="ltr"
                      v-if="order.pivot.offer > 0">
                      {{
                        (order.pivot.price -
                          (order.pivot.price / 100) * order.pivot.offer)
                          | formatNumber
                      }}
                    </td>
                    <td class="text-center font-weight-black" v-else>
                      {{ order.pivot.price | formatNumber }}
                    </td>
                    <td class="text-center font-weight-black">
                      {{ order.pivot.quantity }}
                    </td>
                    <td
                      class="text-center font-weight-black"
                      v-if="order.pivot.offer != null && order.pivot.offer > 0">
                      <h4 style="color: green; direction: ltr">
                        {{ order.pivot.offer }} %
                      </h4>
                    </td>
                    <td class="text-center font-weight-black" v-else>
                      <h4>لايوجد</h4>
                    </td>
                    <td class="text-center font-weight-black">
                      <h4
                        v-for="(data, index) in Object.assign(
                          JSON.parse(order.pivot.advance_details)
                        )"
                        :key="index">
                        <span
                          v-for="(objKey, indexkey) in Object.keys(data)"
                          :key="indexkey"
                          >{{ objKey }} : {{ data[objKey] }}</span
                        >
                      </h4>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-title>

          <v-card-actions dir="rtl">
            <v-btn
              @click="exportToPDF(product_order)"
              class="px-10 ml-3"
              color="#624fc6">
              <h4 style="color: white">طباعة</h4>
            </v-btn>
            <v-btn outlined color="#C62828" v-on:click="$emit('popClose')">
              <h4>اغلاق</h4>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
  import { jsPDF } from "jspdf";
  import autoTable from "jspdf-autotable";
  import moment from "moment";
  export default {
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      product_order: {
        type: Array,
      },
      created_at: {
        type: String,
      },
      total_cost: {
        type: Number,
      },
      serial_number: {
        type: String,
      },
    },
    data() {
      return {};
    },
    computed: {
      total_price() {
        return this.$store.state.orders.total_price;
      },
    },
    methods: {
      exportToPDF(order) {
        const pdf = new jsPDF("p", "pt", "A4");
        var font = this.$store.state.font.font;
        pdf.addFileToVFS("Amiri-Regular-normal.ttf", font);
        pdf.addFont(
          "Amiri-Regular-normal.ttf",
          "Amiri-Regular-normal",
          "normal"
        );

        pdf.setFont("Amiri-Regular-normal");

        var image = require("@/assets/logo.png");
        var imgLogo = new Image();
        imgLogo.src = image;
        pdf.addImage(imgLogo, 250, 40, 70, 70);
        pdf.text(262, 135, "اسم الشركة");
        let data = [];

        // احضار الطلب و وضع تفاصيله في مصفوفه وعرضه في جدول
        order.forEach((element) => {
          let object = {};
          object["name"] = element.name;
          object["company"] = element.brand.name;
          object["quantity"] = element.pivot.quantity;

          if (element.pivot.offer > 0) {
            object["offer"] = element.pivot.offer;
            object["price"] =
              element.pivot.price -
              (element.pivot.price / 100) * element.pivot.offer;
          } else {
            object["offer"] = "لايوجد";
            object["price"] = element.pivot.price;
          }
          data.push(object);
        });

        var body = [
          ["رقم الطلب", "مجموع", "تاريخ الشراء"],
          [
            this.serial_number,
            this.total_cost + " د.ع",
            moment(this.created_at).format("YYYY-MM-DD"),
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
            { header: "السعر", dataKey: "price" },
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
        pdf.save(this.serial_number + ".pdf");
      },
    },
  };
</script>
<style lang="scss">
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > th {
    font-family: "Cairo", sans-serif !important;
  }
</style>

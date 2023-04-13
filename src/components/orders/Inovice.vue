<template>
  <v-row justify="center">
    <v-dialog
      class="d-flex justify-center"
      :value="dialog"
      persistent
      max-width="400"
      hight="600">
      <v-card id="printMe">
        <v-card-title class="d-flex justify-center">
          <h1>اسم الشركة</h1>
        </v-card-title>

        <v-card-title class="d-flex justify-center" style="direction: ltr">
          <h5>{{ total_price | formatNumber }} IQD</h5>
          <h5>: مجموع</h5>
          <v-spacer></v-spacer>

          <h5 class="text-right">{{ moment().format("YYYY/MM/DD hh:mm") }}</h5>
        </v-card-title>

        <v-card-title class="d-flex justify-center pt-1">
          <v-simple-table style="direction: rtl" height="280px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center font-weight-black"><h3>المنتج</h3></th>
                  <th class="text-center font-weight-black"><h3>الكمية</h3></th>
                  <th class="text-center font-weight-black"><h3>السعر</h3></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center font-weight-black">
                    {{ products_inovice[0].name }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{ products_inovice[0].quantity }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{
                      (products_inovice[0].sale_price *
                        products_inovice[0].quantity)
                        | formatNumber
                    }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-title>
        <v-card-actions dir="rtl">
          <v-btn v-print="printObj" class="px-10" color="#624fc6">
            <h4 style="color: white">طباعة</h4>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      products_inovice: {
        type: Array,
      },
    },
    data() {
      return {
        printObj: {
          id: "printMe",
          popTitle: "good print",
          extraCss:
            "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
          extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
          beforeOpenCallback(vue) {
            vue.printLoading = true;
            console.log("打开之前");
          },
          openCallback(vue) {
            vue.printLoading = false;
            console.log("执行了打印");
          },
          closeCallback(vue) {
            console.log("关闭了打印工具");
          },
        },
      };
    },
    computed: {
      total_price() {
        return this.$store.state.orders.total_price;
      },
    },
    methods: {
      print() {},
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

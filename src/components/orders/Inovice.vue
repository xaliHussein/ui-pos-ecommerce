<template>
  <v-row justify="center">
    <v-dialog
      class="d-flex justify-center"
      :value="dialog"
      persistent
      max-width="400"
      hight="600">
      <v-card id="printMe">
        <v-card-title class="d-flex justify-center pa-0">
          <v-avatar class="mt-1" size="128">
            <v-img src="@/assets/logo.png"></v-img>
          </v-avatar>
        </v-card-title>
        <v-card-title class="d-flex justify-center mb-0 pb-0">
          <h5>مجموع : 200.000</h5>
          <v-spacer></v-spacer>

          <h5>اسم الزبون: علي حسين علي</h5>

          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-title class="py-0">
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
                <tr v-for="item in products" :key="item.name">
                  <td class="text-center font-weight-black">{{ item.name }}</td>
                  <td class="text-center font-weight-black">
                    {{ item.quantity }}
                  </td>
                  <td class="text-center font-weight-black">
                    {{ (item.price * item.quantity) | formatNumber }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-title>
        <v-card-actions>
          <v-btn v-print="printObj" color="blue darken-1 px-16" text>
            طباعة
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
      products: {
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

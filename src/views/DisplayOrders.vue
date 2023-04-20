<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-data-table
          class="data_table"
          :headers="headers"
          :items="orders"
          :loading="lodding_table || false"
          :options.sync="pagination"
          :page.sync="pagination.page"
          :items-per-page="pagination.itemsPerPage"
          hide-default-footer
          loading-text="جاري التحميل يرجى الأنتظار">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>جدول الطلبات</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                ref="barcode"
                v-model="order_query"
                @input="queryChange"
                append-icon="mdi-magnify"
                label="ادخل رقم الطلب"
                class="font-weight-black text-field"
                reverse
                outlined
                rounded
                clearable
                single-line
                hide-details />
            </v-toolbar>
          </template>
          <th v-for="header in headers" :key="header.text">
            <v-icon small>mdi-arrow_upward</v-icon>
            {{ header.text }}
          </th>

          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center font-weight-black">
                {{ item.serial_number }}
              </td>

              <td class="text-center font-weight-black" v-if="item.status == 0">
                لايوجد
              </td>

              <td class="text-center font-weight-black">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="getProduct(item)"
                      fab
                      icon
                      x-small
                      v-bind="attrs"
                      v-on="on">
                      <Icon
                        icon="material-symbols:display-settings-rounded"
                        color="#311B92"
                        width="30" />
                    </v-btn>
                  </template>
                  <span>عرض المنتجات</span>
                </v-tooltip>
              </td>

              <td class="text-center font-weight-black" dir="ltr">
                {{ item.total_cost | formatNumber }} د.ع
              </td>
              <td class="text-center font-weight-black">
                <span>
                  {{ moment(item.created_at).format("YYYY-MM-DD hh:mm A") }}
                </span>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="text-center py-5">
          <v-row>
            <v-spacer></v-spacer>
            <v-col align-self="center" cols="5" sm="5" md="3" lg="3">
              <v-select
                v-model="pagination.itemsPerPage"
                :items="items"
                outlined
                rounded
                single-line
                hide-details
                reverse
                label="عدد العناصر"></v-select>
            </v-col>
            <v-col align-self="center" cols="5" sm="5" md="3" lg="3">
              <v-pagination
                v-model="pagination.page"
                :length="pageCount"
                circle
                color="#624fc6"></v-pagination>
            </v-col>
          </v-row>
        </div>
        <PopDisplayProduct
          :dialog="dialog"
          :product_order="product_order"
          :total_cost="total_cost"
          :created_at="created_at"
          :serial_number="serial_number"
          v-on:popClose="dialog = !dialog" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import PopDisplayProduct from "../components/orders/PopDisplayProduct.vue";
  export default {
    components: { PopDisplayProduct },
    data() {
      return {
        items: [5, 10, 25, 50, 100],
        pagination: {},
        search: "",
        dialog: false,
        product_order: null,
        created_at: null,
        serial_number: null,
        total_cost: 0,
        headers: [
          {
            text: "رقم الطلب",
            align: "center",
            value: "name",
            class: "white--text title ",
          },

          {
            text: "تفاصيل الطلب",
            value: "sale_price",
            align: "center",
            class: "white--text title",
          },
          {
            text: "مجموع الطلب",
            value: "sale_price",
            align: "center",
            class: "white--text title",
          },

          {
            text: "تاريخ الشراء",
            value: "price5",
            align: "center",
            class: "white--text title",
          },
        ],
      };
    },
    computed: {
      lodding_table() {
        return this.$store.state.orders.lodding_table_order;
      },
      orders() {
        return this.$store.state.orders.orders;
      },
      pageCount() {
        return this.$store.state.orders.pageCount;
      },
      order_query: {
        set(val) {
          this.$store.state.orders.order_query = val;
        },
        get() {
          return this.$store.state.orders.order_query;
        },
      },
      params: {
        set(val) {
          this.$store.state.orders.params = val;
        },
        get() {
          return this.$store.state.orders.params;
        },
      },
    },
    methods: {
      get_orders() {
        let pagination = this.pagination;
        let par = {
          ...pagination,
        };
        this.params = par;
        this.$store.dispatch("orders/get_orders");
      },

      queryChange() {
        let order_query = this.$store.state.orders.order_query;
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          this.params.page = 1;
          //   this.get_products();

          this.$store.dispatch("orders/get_orders");
        }, 500);
      },
      getProduct(item) {
        this.product_order = item.products;
        this.total_cost = item.total_cost;
        this.created_at = item.created_at;
        this.serial_number = item.serial_number;
        this.dialog = true;
      },
    },
    watch: {
      pagination: {
        handler() {
          this.get_orders();
        },
        deep: true,
      },
    },
  };
</script>
<style scoped>
  .data_table {
    direction: rtl;
  }
  /* .theme--light.v-data-table >>> .v-data-table__wrapper {
    height: 450px !important;
  } */
  .text-field {
    direction: ltr;
  }
</style>

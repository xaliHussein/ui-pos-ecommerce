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
            <v-toolbar flat width="450">
              <v-toolbar-title>جدول الطلبات</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>

              <v-text-field
                ref="barcode"
                v-model="products_query"
                @input="queryChange"
                color="#624FC6"
                class="font-weight-black"
                reverse
                outlined
                rounded
                single-line
                hide-details
                label="ادخل باركود المنتج ..." />
            </v-toolbar>
          </template>
          <th v-for="header in headers" :key="header.text">
            <v-icon small>mdi-arrow_upward</v-icon>
            {{ header.text }}
          </th>

          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center font-weight-black">{{ item.name }}</td>

              <td class="text-center font-weight-black">
                {{ item.sale_price | formatNumber }}
              </td>
              <td
                class="text-center font-weight-black"
                v-if="
                  item.offer != null &&
                  moment().format('YYYY-MM-DD') <= item.offer_expired
                ">
                <h3 style="color: green; direction: ltr">{{ item.offer }} %</h3>
              </td>
              <td class="text-center font-weight-black" v-else>
                <h4>لايوجد</h4>
              </td>

              <td
                class="text-center font-weight-black"
                style="display: flex; flex-diractions: row">
                <h4>{{ item.advance_details }}</h4>
              </td>

              <td
                class="text-center font-weight-black"
                v-if="item.company == null">
                <h5 style="color: red">لايوجد</h5>
              </td>
              <td class="text-center font-weight-black" v-else>
                {{ item.company }}
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
              <td class="text-center font-weight-black" style="direction: ltr">
                {{ item.total_cost | formatNumber }} IQD
              </td>
              <td class="text-center font-weight-black">
                <span>
                  {{ moment(item.created_at).format("YYYY-MM-DD") }}
                </span>
              </td>

              <td class="text-center font-weight-black" style="cursor: pointer">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="delete_item(item)"
                      fab
                      icon
                      x-small
                      v-bind="attrs"
                      v-on="on">
                      <Icon
                        icon="ic:round-delete-forever"
                        color="#ec5a5a"
                        width="37" />
                    </v-btn>
                  </template>
                  <span>حذف</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="text-center pt-2 mt-3">
          <v-row>
            <v-col
              align-self="center"
              cols="5"
              sm="5"
              md="2"
              lg="2"
              class="mr-4">
              <v-select
                v-model="pagination.itemsPerPage"
                :items="items"
                label="Items per page"></v-select>
            </v-col>
            <v-col align-self="center" cols="5" sm="5" md="3" lg="3">
              <v-pagination
                v-model="pagination.page"
                :length="pageCount"
                circle
                color="#ba181b"></v-pagination>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        items: [5, 10, 25, 50, 100],
        pagination: {},
        search: "",
        headers: [
          {
            text: "رقم الطلب",
            align: "center",
            value: "name",
            class: "white--text title ",
            width: 140,
          },
          {
            text: "حالة الطلب",
            value: "company",
            align: "center",
            class: "white--text title",
            width: 140,
          },

          {
            text: "الخصم",
            value: "price",
            align: "center",
            class: "white--text title",
            width: 155,
          },
          {
            text: "المنتجات",
            value: "sale_price",
            align: "center",
            width: 155,
            class: "white--text title",
          },
          {
            text: "مجموع الطلب",
            value: "sale_price",
            align: "center",
            width: 155,
            class: "white--text title",
          },

          {
            text: "تاريخ الشراء",
            value: "price5",
            align: "center",
            width: 155,
            class: "white--text title",
          },
          {
            text: "اجرائات",
            value: "price5",
            align: "center",
            width: 155,
            class: "white--text title",
          },
        ],
      };
    },
    computed: {
      lodding_table() {
        return this.$store.state.orders.lodding_table;
      },
      orders() {
        return this.$store.state.orders.orders;
      },
      products_query: {
        set(val) {
          this.$store.state.orders.products_query = val;
        },
        get() {
          return this.$store.state.orders.products_query;
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
        let products_query = this.$store.state.orders.products_query;
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          //   this.params.page = 1;
          //   this.get_products();

          this.$store.dispatch("orders/get_products").then(() => {
            this.$refs.barcode.reset();
          });
        }, 500);
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
  .theme--light.v-data-table >>> .v-data-table__wrapper {
    height: 450px !important;
  }
</style>

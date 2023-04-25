<template>
  <v-col cols="12" sm="12" md="12" lg="12">
    <v-data-table
      class="data_table"
      height="450px"
      :headers="headers"
      :items="cart_products"
      :loading="lodding_table"
      hide-default-footer
      loading-text="جاري التحميل يرجى الأنتظار">
      <template v-slot:top>
        <v-toolbar flat width="450">
          <v-text-field
            ref="barcode"
            v-model="products_query"
            @input="queryChange"
            class="font-weight-black text-field"
            reverse
            outlined
            rounded
            single-line
            hide-details
            clearable
            label="ادخل باركود او اسم المنتج "
            append-icon="mdi-magnify" />
        </v-toolbar>
      </template>
      <th v-for="header in headers" :key="header.text">
        <v-icon small>mdi-arrow_upward</v-icon>
        {{ header.text }}
      </th>

      <template v-slot:item="{ item }">
        <tr>
          <td class="text-center font-weight-black">{{ item.name }}</td>

          <td class="text-center font-weight-black" dir="ltr">
            {{ item.sale_price | formatNumber }} د.ع
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

          <td class="text-center font-weight-black">
            <h4
              v-for="(data, index) in Object.assign(JSON.parse(item.details))"
              :key="index">
              <v-checkbox
                hide-details
                class="py-0 mt-0"
                v-model="valueDetails"
                v-for="(objKey, indexkey) in Object.keys(data)"
                :key="indexkey"
                :id="index + data[objKey]"
                multiple
                :label="objKey + ' : ' + data[objKey]"
                :value="item.id + data[objKey] + objKey"
                @change="
                  add_advance_details($event, data[objKey], objKey, item.id)
                "></v-checkbox>
            </h4>
          </td>
          <td class="text-center font-weight-black">
            <span>
              <v-btn
                icon
                small
                @click="plus(item)"
                style="background-color: #624fc6"
                ><v-icon color="white">mdi-plus</v-icon></v-btn
              >
              <span class="px-3 black--text">{{ item.quantity }}</span>
              <v-btn
                icon
                small
                @click="minus(item)"
                style="background-color: #624fc6"
                ><v-icon color="white">mdi-minus</v-icon></v-btn
              >
            </span>
          </td>
          <td class="text-center font-weight-black" v-if="item.company == null">
            <h5 style="color: red">لايوجد</h5>
          </td>
          <td class="text-center font-weight-black" v-else>
            {{ item.company }}
          </td>
          <td class="text-center font-weight-black">
            {{ item.availableQuantity }}
          </td>
          <td class="text-center font-weight-black" dir="ltr">
            {{ (item.sale_price * item.quantity) | formatNumber }} د.ع
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
                    color="#C62828"
                    width="37" />
                </v-btn>
              </template>
              <span>حذف</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-col>
</template>
<script>
  export default {
    data() {
      return {
        items: [5, 10, 25, 50, 100],
        pagination: {},
        search: "",
        column: null,
        valueDetails: [],
        keys: [],
        k_v_details: [],
        length_details: 0,
        headers: [
          {
            text: "المنتج",
            align: "center",
            sortable: false,
            value: "name",
            class: "white--text title ",
            width: 140,
          },

          {
            text: "السعر",
            value: "price",
            align: "center",
            class: "white--text title",
            width: 155,
            sortable: false,
          },
          {
            text: "خصم",
            value: "offer",
            align: "center",
            class: "white--text title",
            width: 155,
            sortable: false,
          },
          {
            text: "تفاصيل المنتج",
            value: "advance_details",
            align: "center",
            class: "white--text title",
            width: 165,
            sortable: false,
          },
          {
            text: "الكمية",
            value: "quantity",
            align: "center",
            class: "white--text title",
            width: 155,
            sortable: false,
          },
          {
            text: "الشركة",
            value: "company",
            align: "center",
            class: "white--text title",
            width: 140,
            sortable: false,
          },
          {
            text: "الكمية المتاحة",
            value: "quantity",
            align: "center",
            width: 155,
            sortable: false,
            class: "white--text title",
          },
          {
            text: "المجموع",
            value: "sale_price",
            align: "center",
            width: 155,
            sortable: false,
            class: "white--text title",
          },

          {
            text: "اجرائات",
            value: "price5",
            align: "center",
            width: 155,
            sortable: false,
            class: "white--text title",
          },
        ],
      };
    },
    computed: {
      cart_products() {
        return this.$store.state.orders.cart_products;
      },
      lodding_table() {
        return this.$store.state.orders.lodding_table;
      },
      products_query: {
        set(val) {
          this.$store.state.orders.products_query = val;
        },
        get() {
          return this.$store.state.orders.products_query;
        },
      },
    },
    methods: {
      add_advance_details(event, value, key, id) {
        if (this.length_details > event.length || event.length === 0) {
          // if
          console.log("event", event, value, key);
          let index = this.k_v_details.findIndex(
            (e) => e.key === key && e.value === value && e.id === id
          );
          this.k_v_details.splice(index, 1);
          this.length_details--;
        } else {
          // else
          var check = false;
          this.k_v_details.forEach((e) => {
            if (e.key === key && e.id === id) {
              check = true;
            }
          });

          if (check == true) {
            let index = this.k_v_details.findIndex(
              (e) => e.key === key && e.id === id
            );
            this.valueDetails.splice(index, 1);
            this.k_v_details.splice(index, 1);
            let data = {};
            data["id"] = id;
            data["key"] = key;
            data["value"] = value;
            this.k_v_details.push(data);
          } else {
            let data = {};
            data["id"] = id;
            data["key"] = key;
            data["value"] = value;
            this.k_v_details.push(data);
            this.length_details++;
          }
        }
        console.log("this.k_v_details", this.k_v_details);
        this.$store.state.orders.advance_details = this.k_v_details;
      },

      queryChange() {
        let products_query = this.$store.state.orders.products_query;
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          if (
            products_query != null &&
            products_query != undefined &&
            products_query.length > 0
          ) {
            this.$store.dispatch("orders/get_products").then(() => {
              this.$refs.barcode.reset();
            });
          }
        }, 500);
      },

      // حذف عنصر من جدول
      delete_item(item) {
        let index = this.$store.state.orders.cart_products.findIndex(
          (element) => {
            // يبحث عن المنتج المراد حذفه من الجدول يطابق ال id و الكميه
            if (element.id == item.id && element.quantity == item.quantity) {
              return element.id == item.id;
            }
          }
        );
        this.$store.state.orders.total_price -= item.sale_price * item.quantity;
        this.$store.state.orders.cart_products.splice(index, 1);
      },
      // اضفة في عدد كميه منتج
      plus(item) {
        if (item.availableQuantity != 0) {
          let index = this.$store.state.orders.cart_products.findIndex(
            (element) => {
              if (element.id == item.id && element.quantity == item.quantity) {
                return element.id == item.id;
              }
            }
          );
          item.quantity += 1;
          item.availableQuantity -= 1;
          this.$store.state.orders.total_price += item.sale_price;
          this.$store.state.orders.cart_products.splice(index, 1, item);
        } else {
          let snack_message = {};
          snack_message["color"] = "orange darken-1";
          snack_message["icon"] = "alert";
          snack_message["text"] = "نفذت الكميه";
          this.$store.commit("SNACK_MESSAGE", snack_message);
          setTimeout(() => {
            this.$store.commit("TIME_OUT", snack_message);
          }, 4000);
        }
      },
      // نقصان في عدد كميه منتج
      minus(item) {
        if (item.quantity > 1) {
          let index = this.$store.state.orders.cart_products.findIndex(
            (element) => {
              if (element.id == item.id && element.quantity == item.quantity) {
                return element.id == item.id;
              }
            }
          );
          item.quantity -= 1;
          item.availableQuantity += 1;
          this.$store.state.orders.total_price -= item.sale_price;
          this.$store.state.orders.cart_products.splice(index, 1, item);
        }
      },
    },
  };
</script>
<style scoped>
  .data_table {
    direction: rtl;
  }
  .text-field {
    direction: ltr;
  }
</style>

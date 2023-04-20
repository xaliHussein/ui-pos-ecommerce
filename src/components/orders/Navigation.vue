<template>
  <v-navigation-drawer
    app
    clipped
    left
    width="350px"
    class="bacground-navigation">
    <v-card
      class="card-totle mx-auto bacground-navigation"
      height="300"
      v-if="total_price > 0">
      <v-toolbar flat class="d-flex justify-center bacground-navigation">
        <v-toolbar-title class="d-flex justify-center"
          ><h3 style="color: #420660">الدفع</h3></v-toolbar-title
        >
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-title class="d-flex justify-center mt-4 pt-0 pb-0">
        <v-bottom-navigation
          class="bottom bacground-navigation"
          v-model="type_cash"
          group>
          <v-btn
            class="mr-3"
            :class="type_cash == 2 ? 'btn-outline2' : 'btn-outline '"
            :value="2"
            @click="type_cash = 2"
            ><h3 :class="type_cash == 2 ? 'color2-TI' : 'color-TI '">كاش</h3>
            <Icon
              icon="mdi:cash-multiple"
              :class="type_cash == 2 ? 'color2-TI' : 'color-TI '"
              width="30" />
          </v-btn>
          <v-btn
            :class="type_cash == 1 ? 'btn-outline2' : 'btn-outline '"
            :value="1"
            @click="type_cash = 1"
            ><h3 :class="type_cash == 1 ? 'color2-TI' : 'color-TI '">بطاقة</h3>
            <Icon
              icon="ic:outline-credit-card"
              :class="type_cash == 1 ? 'color2-TI' : 'color-TI '"
              width="30" />
          </v-btn>
        </v-bottom-navigation>

        <v-bottom-navigation
          class="bottom bacground-navigation mt-4"
          v-model="invoice"
          grow>
          <v-btn
            class="mr-3"
            :class="invoice == 2 ? 'btn-outline2' : 'btn-outline '"
            :value="2"
            @click="set_invoice(2)"
            ><h3 :class="invoice == 2 ? 'color2-TI' : 'color-TI '">
              سحب فاتورة
            </h3>
            <Icon
              icon="mdi:invoice"
              :class="invoice == 2 ? 'color2-TI' : 'color-TI '"
              width="30" />
          </v-btn>
          <v-btn
            :class="invoice == 1 ? 'btn-outline2' : 'btn-outline '"
            :value="1"
            @click="set_invoice(1)"
            ><h3 :class="invoice == 1 ? 'color2-TI' : 'color-TI '">
              بدون فاتورة
            </h3>
            <Icon
              icon="mdi:invoice-remove"
              :class="invoice == 1 ? 'color2-TI' : 'color-TI '"
              width="30" />
          </v-btn>
        </v-bottom-navigation>
      </v-card-title>
      <v-card-text>
        <v-img
          :height="170"
          :width="200"
          class="mx-auto mt-7 img-pay"
          src="@/assets/pay3.png"></v-img>
      </v-card-text>

      <v-card-title class="d-flex justify-center pt-1 pb-0"
        ><h4 style="color: #420660">{{ total_price | formatNumber }} IQD</h4>
        <v-spacer></v-spacer>
        <h4 style="color: #420660">المجموع</h4></v-card-title
      >

      <v-card-actions class="pt-0 d-flex justify-center mt-6">
        <v-btn
          @click="chack_order"
          :loading="loading"
          color="#624fc6"
          large
          rounded
          class="btn"
          elevation="4">
          <h3 style="color: white">تاكيد</h3>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon color="white">mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="card-basket mx-auto" v-else>
      <v-card-title class="d-flex justify-center">
        <Icon icon="ic:round-shopping-cart" width="150" class="icon" />
      </v-card-title>
      <v-card-text class="text-center">
        <h2>اضف منتجاتك في السلة</h2>
      </v-card-text>
    </v-card>

    <!-- <Icon icon="mdi-light:home" /> -->
  </v-navigation-drawer>
</template>
<script>
  export default {
    data() {
      return {
        type_cash: 1,
      };
    },
    computed: {
      total_price() {
        return this.$store.state.orders.total_price;
      },
      loading() {
        return this.$store.state.orders.loading_add_orders;
      },
      invoice: {
        get() {
          return this.$store.state.orders.type_invoice;
        },
        set(val) {
          this.$store.state.orders.type_invoice = val;
        },
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
      chack_order() {
        if (this.type_cash == 2) {
          this.$emit("createOrder");
        }
      },
      set_invoice(val) {
        localStorage.setItem("invoice", val);
        this.invoice = val;
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
    /* border: 2px dashed #624fc6; */
    border-radius: 15px;
    width: 330px;
    margin-top: 15px;
  }
  .divider {
    border: 20px #624fc6 !important;
  }
  .bottom {
    box-shadow: 0px 0px 0px 0px !important;
  }
  .item-basket {
    cursor: pointer;
    box-shadow: 0px 0px 0px 0px !important;
    background-color: #ece9f8;
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
    background-image: linear-gradient(180deg, #ad519c 0%, #624fc6 99%);
    border: solid 1px #e6e6e6;
    border-radius: 100px;
  }
  .btn {
    border-radius: 7px;
    padding-left: 130px !important;
    padding-right: 130px !important;
  }
  .icon {
    color: #624fc6;
    display: block;
    background: -webkit-linear-gradient(#624fc6 99%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .bacground-navigation {
    background: rgba(252, 250, 250) !important;
  }
  .btn-bg {
    background: #624fc6 !important;
  }
  .btn-outline2 {
    border-radius: 10px !important;
    background: #624fc6 !important;
  }
  .btn-outline {
    border-radius: 10px !important;
    background: rgba(249, 243, 246) !important;
    border: 1px solid #624fc6;
  }
  .color-TI {
    color: #624fc6;
  }
  .color2-TI {
    color: #ffffff;
  }
</style>

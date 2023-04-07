<template>
  <v-navigation-drawer app clipped left width="350px">
    <v-card class="card-totle mx-auto" height="300" v-if="total_price > 0">
      <v-card-title class="d-flex justify-center mt-4 pt-0 pb-0">
        <v-btn-toggle
          v-model="type_cash"
          tile
          color="deep-purple accent-3"
          group>
          <v-btn :value="2"
            ><h4>كاش</h4>
            <Icon icon="mdi:cash-multiple" width="30" />
          </v-btn>
          <v-btn :value="1"
            ><h4>بطاقة</h4>
            <Icon icon="ic:outline-credit-card" width="30" />
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle v-model="invoice" tile color="deep-purple accent-3" group>
          <v-btn :value="2"
            ><h4>سحب فاتورة</h4>
            <Icon icon="mdi:invoice" width="30" />
          </v-btn>
          <v-btn :value="1">
            <h4>بدون فاتورة</h4>
            <Icon icon="mdi:invoice-remove" width="30"
          /></v-btn>
        </v-btn-toggle>
      </v-card-title>
      <v-divider class="divider mt-2"></v-divider>
      <v-card-title class="d-flex justify-center pt-2 pb-0"
        ><h5>{{ total_price | formatNumber }} IQD</h5>
        <v-spacer></v-spacer>
        <h5>المجموع</h5></v-card-title
      >

      <v-card-actions class="pt-0 d-flex justify-center mt-10">
        <v-btn color="#624fc6" class="btn px-7" outlined @click="remove_all"
          ><h3 style="color: #624fc6">الغاء</h3></v-btn
        >
        <v-btn @click="bay" color="#ad519c" class="btn px-7"
          ><h3 style="color: white">تاكيد</h3></v-btn
        >
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
    props: {
      products: {
        type: Array,
        require: true,
      },
    },
    data() {
      return {
        type_cash: 1,
        invoice: 2,
      };
    },
    computed: {
      total_price() {
        return this.$store.state.orders.total_price;
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
      bay() {
        this.chack_payment = true;
      },
      remove(items) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let total_price = JSON.parse(localStorage.getItem("total_price"));
        let index = cart.findIndex(
          (item) => item.id == items.id && item.price == items.price
        );
        total_price = total_price - items.price * items.quantity;

        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("total_price", JSON.stringify(total_price));
        this.$store.commit("home/EDIT_TO_CART", cart);
      },
      remove_all() {
        this.$store.commit("home/REMOVE_TO_CART");
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
    border: 2px dashed #624fc6;
    border-radius: 15px;
    width: 330px;
    margin-top: 15px;
  }
  .divider {
    border: 1px dashed #624fc6 !important;
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
  }
  .icon {
    color: #9c47fc;
    display: block;
    background: -webkit-linear-gradient(#ad519c 50%, #624fc6 99%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>

<template>
  <v-toolbar class="mb-5 toolbar">
    <v-row>
      <v-col align-self="center" cols="5" sm="5" md="3" lg="3" class="mr-4">
        <v-select
          v-model="params.itemsPerPage"
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
          v-model="params.page"
          :length="pageCount"
          circle
          color="#624fc6"></v-pagination>
      </v-col>
      <v-col align-self="center" cols="5" sm="5" md="5" lg="5" class="mr-4">
        <!-- <v-spacer></v-spacer> -->
        <v-text-field
          v-model="products_query"
          @input="queryChange"
          color="#624FC6"
          class="font-weight-black"
          reverse
          outlined
          rounded
          single-line
          hide-details
          label=".. ادخل اسم المنتج " />
      </v-col>
    </v-row>
  </v-toolbar>
</template>
<script>
  export default {
    data() {
      return {
        items: [1, 5, 10, 25, 50, 100],
        pagination: {},
      };
    },
    computed: {
      pageCount() {
        return this.$store.state.home.pageCount;
      },
      params: {
        set(val) {
          this.$store.state.home.params = val;
        },
        get() {
          return this.$store.state.home.params;
        },
      },
      products_query: {
        set(val) {
          this.$store.state.home.products_query = val;
        },
        get() {
          return this.$store.state.home.products_query;
        },
      },
    },
    methods: {
      get_products() {
        this.$store.dispatch("home/get_products");
      },
      queryChange() {
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          this.params.page = 1;
          this.get_products();
        }, 500);
      },

      // احضار البضائع من خلال الباركود
      //   barcode() {
      //     clearTimeout(this._timerId);
      //     this._timerId = setTimeout(() => {
      //       this.$store.dispatch("sale/get_goods_barcode").then(() => {
      //         this.$refs.barcode.reset();
      //       });
      //     }, 500);
      //   },
    },
    watch: {
      params: {
        handler() {
          this.get_products();
        },
        deep: true,
      },
    },
  };
</script>
<style scoped>
  .toolbar {
    box-shadow: 0px 0px 0px !important;
  }
</style>

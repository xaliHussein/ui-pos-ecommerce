<template>
  <v-container fluid>
    <ToolbarSearch />
    <Categories
      :categories="categories"
      :loading_categories="loading_categories" />
    <v-row class="justify-center"> </v-row>
    <Card :products="products" :loading_product="loading_product" />
  </v-container>
</template>

<script>
  import Card from "../components/home/CardProduct";
  import Categories from "../components/home/Categories";
  import ToolbarSearch from "../components/home/ToolbarSearch";

  export default {
    components: { Card, Categories, ToolbarSearch },
    data() {
      return {};
    },
    mounted() {
      this.$store.dispatch("home/get_categories");
    },
    computed: {
      categories() {
        return this.$store.state.home.categories;
      },
      products() {
        return this.$store.state.home.products;
      },
      loading_product() {
        return this.$store.state.home.loading_product;
      },
      loading_categories() {
        return this.$store.state.home.loading_categories;
      },
    },
  };
</script>
